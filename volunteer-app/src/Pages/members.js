// JavaScript source code
import React, { useState, useEffect } from "react";
import "./members.css";
import NavBarAdmin from "./navBarAdmin";
import { db, collection, getDocs } from "../index.js"
import { writeMemberToSheet } from '../sheets.js';

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



    /*
    const handleSave = () => {
        console.log("Saving members to sheet...");
        // Call writeMemberToSheet with the members data
        members.forEach(member => {
            writeMemberToSheet(member);
        });
    };
    */

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
                    <button className="save-button" >Save</button> 
                </div>
            </div>
        </>
    );
}

export default MemberTable;
