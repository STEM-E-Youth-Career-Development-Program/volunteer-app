import React, { useState, useEffect } from "react";
import "./members.css";
import NavBarAdmin from "./navBarAdmin";
import { db, collection, getDocs, doc, writeBatch, setDoc } from "../index.js"
import writeToGoogleSheet from '../sheets.js';
import retrieveWaiver from "../Waiver";
import checkDiscord from "../checkDiscord";


function MemberTable() {
   const [members, setMembers] = useState([]);


   // Fetch data from Firestore when the component mounts
   useEffect(() => {
       const fetchMembers = async () => {
           const membersCollection = collection(db, "Interns");
           const membersSnapshot = await getDocs(membersCollection); // Get the documents
           const membersData = membersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Map through docs and docs id to get data
           setMembers(membersData);
       };

       fetchMembers();
   }, []);


   const createTimesheet = async () => {
       console.log("Saving members to sheet...");
       // Filter members who need a timesheet
       const membersToCreateTimesheets = members.filter(member => !member.inTimeSheet);
       console.log(membersToCreateTimesheets)
       
       // Prepare data for Google Sheets
       const data = membersToCreateTimesheets.map(member => [
           member.name || "",
       ]);
       console.log("Formatted data for Google Sheets:", data);

       const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;

       try {
           // Write data to Google Sheets
           const message = await writeToGoogleSheet(SPREADSHEET_ID, data);
           alert(message);

           // Update inTimeSheet Firestore with batch process
           const batch = writeBatch(db);

           membersToCreateTimesheets.forEach(member => {
               const memberRef = doc(db, "Interns", member.id);
               batch.update(memberRef, { inTimeSheet: true });
           });

           // Commit the batch update
           await batch.commit();
           alert("Timesheet status updated successfully!");
       } catch (error) {
           alert("Error writing to sheet or updating Firestore: " + error.message);
       }
   };

    const updateWaiver = async () => {
        const checkList = retrieveWaiver();
        console.log(checkList);
        const updatedData = members.map((row, i) => {
            let contains = false;
            checkList.forEach(k => {
                if (k[3] == row.email) {
                    updatedData[i] = { ...row, "signedWaiver": k[15] };
                    contains = true;
                }
            });
            if (!contains) {
                updatedData[i] = row;
            }
        });
        setMembers(updatedData);
    };

    const updateDiscord = () => {
        const discIdList = [];
        members.forEach(member => {
            discIdList.push(member.discordID);
        });

        checkDiscord(discIdList)
            .then(verifiedList => {
                let updatedData = [...members]; 
                for (let i = 0; i < discIdList.length; i++) {
                    updatedData[i].inServer = verifiedList[i]; 
                }
                setMembers(updatedData);
                handleSave("inServer", "inServer")
            })
            .catch(error => {
                console.error("Error updating Discord status:", error); 
            });
    };


    const unsignedWaivers = members.filter(member => !member.signedWaiver);

    const handleSave = async (colname, field) => {
        try {
            const updatePromises = members.map((row) => {
                const internRef = doc(db, 'Interns', row.id);
                return setDoc(internRef, {
                    [colname]: (row[`${field}`]===1),
                }, { merge: true });
            });

            await Promise.all(updatePromises);
            console.log('All rows saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <>
            <NavBarAdmin />
            <div className="access-table">
                {unsignedWaivers.length > 0 && (
                    <div className="warning">
                        <strong>{unsignedWaivers.length}</strong> intern(s) have not signed the waiver!
                    </div>
                )}
               <table>
                   <thead>
                       <tr>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Email</th>
                           <th>Discord ID</th>
                           <th>In Discord Server?</th>
                           <th>Waiver Signed?</th>
                           <th>Time Sheet Created?</th>
                           <th>Internship Start Date</th>
                           <th>Paused Internship?</th>
                       </tr>
                   </thead>
                   <tbody>
                       {members.map((member, index) => (
                           <tr key={index}>
                               <td>{member.name?.split(" ")[0]}</td>
                               <td>{member.name?.split(" ")[1]}</td>
                               <td>{member.email}</td>
                               <td>{member.discordID}</td>
                               <td>{member.inServer ? "Yes" : "No"}</td>
                               <td>{member.signedWaiver ? "Yes" : "No"}</td>
                               <td>{member.inTimeSheet ? "Yes" : "No"}</td>
                               <td>{member.startDate || "N/A"}</td>
                               <td>{member.paused ? "Yes" : "No"}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
               <div className="table-footer">
                   <div className="pagination">
                       <button>Previous</button>
                       <span className="page-number" id="pageNumber">Page 1</span>
                       <button>Next</button>
                   </div>
                    <button className="save-button" onClick={createTimesheet}>Create Timesheets</button>
                    <button className="save-button" onClick={updateWaiver}>Update Waiver status</button>
                    <button className="save-button" onClick={updateDiscord}>Update Discord status</button>
               </div>
           </div>
       </>
   );
}


export default MemberTable;
