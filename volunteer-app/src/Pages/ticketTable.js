import React from 'react';
import './ticketTable.css';

const TicketTable = () => {
    return (
        <div className="ticket-table">
            <div className="table-append">
                <span>
                    Show entries:
                    <select className="input">
                        <option value="50" selected disabled>50</option>
                    </select>
                </span>
                <span>
                    Search:
                    <input type="text" className="input" />
                </span>
            </div>
            <table>
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '50%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>Due Date</th>
                        <th>Client</th>
                        <th>Request</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12/31/2020</td>
                        <td>Jeff Smith</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.</td>
                        <td><span className="status open">Open</span></td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>12/28/2020</td>
                        <td>Maria Jones</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.</td>
                        <td><span className="status closed">Closed</span></td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>12/23/2020</td>
                        <td>John Cobaine</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.</td>
                        <td><span className="status paused">Paused</span></td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>11/27/2020</td>
                        <td>Steve Buffet</td>
                        <td>Test OK</td>
                        <td><span className="status deleted">Deleted</span></td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
            <div className="table-append">
                <p id="entryText">Showing 1 to 4 of 4 entries</p>
                <span className="pagination">
                    <button style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>Previous</button>
                    <span className="page-number" id="pageNumber">Page 1</span>
                    <button style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Next</button>
                </span>
            </div>
        </div>
    );
};

export default TicketTable;