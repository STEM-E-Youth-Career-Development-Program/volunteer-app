import React, { useState, useEffect } from 'react';
import './access_management.css';
import NavBarAdmin from './navBarAdmin';
import { db, collection, getDocs, addDoc, doc, writeBatch, setDoc } from "../index.js"
//import { auth } from "./index.js";

//db = getFirestore(), pre-defined in index.js

async function loadData() {
    try {
        const colUser = collection(db, 'User');
        const snapshot = await getDocs(colUser);
        return snapshot.docs.map(doc => ({...doc.data(), id:doc.id})); 
    } catch (error) {
        console.error("Error loading data:", error);
        return []; 
    }
}

/*const initialData = [
  { firstName: 'Intern 1', lastName: 'L1', email: 'intern1@gmail.com', discordID: 'intern1', isCoordinator: true, isAdmin: false },
  { firstName: 'Intern 2', lastName: 'L2', email: 'intern2@gmail.com', discordID: 'intern2', isCoordinator: true, isAdmin: true },
  { firstName: 'Intern 3', lastName: 'L3', email: 'intern3@gmail.com', discordID: 'intern3', isCoordinator: false, isAdmin: false },
];*/

const AccessManagement = () => {
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const loadedData = await loadData();
              setData(loadedData);
          } catch (error) {
              console.error("Error fetching data:", error);
              setData([]);
          }
      };

      fetchData();
  }, []);

  useEffect(() => {
      const updatePageData = async () => {
        let subsetData = data.slice((page - 1) * 10, Math.min(data.length, (page * 10)));
        setPageData(subsetData);
      };

      updatePageData();
  }, [data, page]);

  const handleCheckboxChange = (index, field) => {
    const updatedData = data.map((row, i) => 
      i === index ? { ...row, [field]: !row[field] } : row
    );
    setData(updatedData);
  };

    const handleSave = async () => {
        try {
            const updatePromises = data.map((row) => {
                const userRef = doc(db, 'User', row.id);
                return setDoc(userRef, {
                    isAdmin: row.isAdmin,
                    isCoord: row.isCoord
                }, { merge: true }); 
            });

            await Promise.all(updatePromises); 
            console.log('All rows saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

  const handleNextPage = () => {
    if (data.length > page * 10) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

    return (
     <div>
     <NavBarAdmin />

      <div className="access-table">
        <table>
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '12.5%' }} />
            <col style={{ width: '12.5%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>STEM-E ID</th>
              <th>Discord ID</th>
              <th>Volunteer Coordinator</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, index) => (
              <tr key={index + ((page-1) * 10)}>
                <td>{row.name.substring(0, row.name.lastIndexOf(" "))}</td>
                <td>{row.name.split(" ").slice(-1)}</td>
                <td>TBD</td>
                <td>{row.discordID}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.isCoord}
                    onChange={() => handleCheckboxChange(index + ((page-1) * 10), 'isCoord')}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.isAdmin}
                    onChange={() => handleCheckboxChange(index + ((page-1) * 10), 'isAdmin')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="table-footer">
          <div className="pagination">
            <button onClick={handlePreviousPage}>Previous</button>
            <span className="page-number" id="pageNumber">Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;
