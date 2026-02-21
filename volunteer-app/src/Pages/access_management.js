import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './access_management.css';
import NavBarAdmin from './navBarAdmin';
import { db, collection, getDocs, doc, setDoc } from "../index.js"

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

const AccessManagement = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem('session'));

  useEffect(() => {
      if (!session || !session.isAdmin) {
          navigate('/permission-denied');
          return;
      }

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
  }, [navigate, session]);

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
    setPage(page + 1);
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
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name.substring(0, row.name.lastIndexOf(" "))}</td>
                <td>{row.name.split(" ").slice(-1)}</td>
                <td>TBD</td>
                <td>{row.discordID}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.isCoord}
                    onChange={() => handleCheckboxChange(index, 'isCoord')}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.isAdmin}
                    onChange={() => handleCheckboxChange(index, 'isAdmin')}
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
