// JavaScript source code
import React, { useState, useEffect } from "react";
import "./members.css";
import NavBarAdmin from "./navBarAdmin";
import { db, collection, getDocs } from "../index.js"
import writeToGoogleSheet from '../sheets.js';


function MemberTable() {
    const [members, setMembers] = useState([]);

    // Fetch data from Firestore when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            const membersCollection = collection(db, "Interns"); 
            const membersSnapshot = await getDocs(membersCollection); // Get the documents
            const membersData = membersSnapshot.docs.map((doc) => doc.data()); // Map through docs to extract data (i.e. timesheet)
            setMembers(membersData);
        };

        fetchMembers();
    }, []);

    const createTimesheet = async () => {
        console.log("Saving members to sheet...");
        // Call writeMemberToSheet with the members data
        const data = members.map(member => [
            member.name?.split(" ")[0],       // First Name
            member.name?.split(" ")[1],       // Last Name
            member.email,                     // Email
            member.discordID,                 // Discord ID
            member.inServer ? "Yes" : "No",   // Orientation Attended?
            member.signedWaiver ? "Yes" : "No", // Waiver Signed?
            member.inTimeSheet ? "Yes" : "No", // Time Sheet Created?
            member.startDate || "N/A",        // Internship Start Date
            member.paused ? "Yes" : "No"      // Paused Internship?
        ]);

        const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
        const range = "Sheet1!A1"

        try {
            const message = await writeToGoogleSheet(SPREADSHEET_ID, range, data);
            alert(message);
        } catch (error) {
            alert("Error writing to sheet: " + error.message);
        }
    };


    return (
        <>
            <NavBarAdmin />
            <div className="access-table">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Discord ID</th>
                            <th>Orientation Attended?</th>
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
                </div>
            </div>
        </>
    );
}

export default MemberTable;
