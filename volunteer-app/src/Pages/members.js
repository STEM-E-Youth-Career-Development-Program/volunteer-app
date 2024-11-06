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
            const membersCollection = collection(db, "members"); // Get reference to 'members' collection
            const membersSnapshot = await getDocs(membersCollection); // Get the documents
            const membersData = membersSnapshot.docs.map((doc) => doc.data()); // Map through docs to extract data
            setMembers(membersData);
        };

        fetchMembers();
    }, []);

    const handleSave = () => {
        console.log("Saving members to sheet...");
        // Call writeMemberToSheet with the members data
        members.forEach(member => {
            writeMemberToSheet(member);
        });
    };

    return (
        <>
            <NavBarAdmin />
            <div class="access-table">
                <table>
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
                    <tr>
                        <td>Intern 1</td>
                        <td>L1</td>
                        <td>intern1@gmail.com</td>
                        <td>intern1</td>
                        <td>No</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 2</td>
                        <td>L2</td>
                        <td>intern2@gmail.com</td>
                        <td>intern2</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>07-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 3</td>
                        <td>L3</td>
                        <td>intern3@gmail.com</td>
                        <td>intern3</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>No</td>
                        <td>03-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 4</td>
                        <td>L4</td>
                        <td>intern4@gmail.com</td>
                        <td>intern4</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 5</td>
                        <td>L5</td>
                        <td>intern5@gmail.com</td>
                        <td>intern5</td>
                        <td>No</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>01-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 6</td>
                        <td>L6</td>
                        <td>intern6@gmail.com</td>
                        <td>intern6</td>
                        <td>No</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>12-23-2023</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 7</td>
                        <td>L7</td>
                        <td>intern7@gmail.com</td>
                        <td>intern7</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>04-08-2022</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 8</td>
                        <td>L8</td>
                        <td>intern8@gmail.com</td>
                        <td>intern8</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>06-12-2024</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 9</td>
                        <td>L9</td>
                        <td>intern9@gmail.com</td>
                        <td>intern9</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>01-05-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 10</td>
                        <td>L1</td>
                        <td>intern10@gmail.com</td>
                        <td>intern10</td>
                        <td>No</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 11</td>
                        <td>L1</td>
                        <td>intern11@gmail.com</td>
                        <td>intern11</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 12</td>
                        <td>L1</td>
                        <td>intern12@gmail.com</td>
                        <td>intern12</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 13</td>
                        <td>L1</td>
                        <td>intern13@gmail.com</td>
                        <td>intern13</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 14</td>
                        <td>L1</td>
                        <td>intern14@gmail.com</td>
                        <td>intern14</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>08-16-2024</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 15</td>
                        <td>L1</td>
                        <td>intern15@gmail.com</td>
                        <td>intern15</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 16</td>
                        <td>L1</td>
                        <td>intern16@gmail.com</td>
                        <td>intern16</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 17</td>
                        <td>L1</td>
                        <td>intern17@gmail.com</td>
                        <td>intern17</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>No</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 18</td>
                        <td>L1</td>
                        <td>intern18@gmail.com</td>
                        <td>intern18</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>Yes</td>
                        <td>08-16-2024</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Intern 19</td>
                        <td>L1</td>
                        <td>intern19@gmail.com</td>
                        <td>intern19</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>08-16-2024</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Intern 20</td>
                        <td>L1</td>
                        <td>intern20@gmail.com</td>
                        <td>intern20</td>
                        <td>No</td>
                        <td>Yes</td>
                        <td>No</td>
                        <td>08-16-2024</td>
                        <td>Yes</td>
                    </tr>
                    { /* 
                    REPLACE WITH ACTUAL VALUES WITHIN THE FIRESTORE
                    {members.map((member, index) => (
                        <td key={index}>{member.firstName} {member.lastName}</td>
                    ))}
                    */}
                </table>
                <div class="table-footer">
                    <div class="pagination">
                        <button>Previous</button>
                        <span class="page-number" id="pageNumber">Page 1</span>
                        <button>Next</button>
                    </div>
                    <button class="save-button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </>
    );
}

export default MemberTable;
