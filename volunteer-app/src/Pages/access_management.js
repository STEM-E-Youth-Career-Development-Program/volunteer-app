import React, { useState } from 'react';
import './access_management.css';
import NavBarAdmin from './navBarAdmin';

const initialData = [
  { firstName: 'Intern 1', lastName: 'L1', email: 'intern1@gmail.com', discordID: 'intern1', isCoordinator: true, isAdmin: false },
  { firstName: 'Intern 2', lastName: 'L2', email: 'intern2@gmail.com', discordID: 'intern2', isCoordinator: true, isAdmin: true },
  { firstName: 'Intern 3', lastName: 'L3', email: 'intern3@gmail.com', discordID: 'intern3', isCoordinator: false, isAdmin: false },
  // Add the rest of the interns here...
];

const AccessManagement = () => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);

  const handleCheckboxChange = (index, field) => {
    const updatedData = data.map((row, i) => 
      i === index ? { ...row, [field]: !row[field] } : row
    );
    setData(updatedData);
  };

  const handleSave = () => {
    console.log('Data saved:', data);
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
              <th>Email</th>
              <th>Discord ID</th>
              <th>Volunteer Coordinator</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.email}</td>
                <td>{row.discordID}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.isCoordinator}
                    onChange={() => handleCheckboxChange(index, 'isCoordinator')}
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
