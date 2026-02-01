import React, { useState, useEffect, useRef, useId } from "react";
import NavBarAdmin from "../Pages/navBarAdmin";
import "./Ticketing.css"
import { db, collection, getDocs, addDoc, doc, writeBatch, setDoc } from "../index.js"

const statusLabels = {
    0: "Awaiting Triaging",
    1: "Assigned",
    2: "User Update Needed",
    3: "Closed"
};

async function loadTicket() {
    try {
        const colTickets = collection(db, 'Tickets');
        const snapshot = await getDocs(colTickets);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
}

async function loadUsers() {
    try {
        const colUsers = collection(db, 'User');
        const snapshot = await getDocs(colUsers);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
}

async function getName(userData, id) {
    const res = await Promise.all(userData
        .filter(user => user.id === id) 
        .map(async (user) => {
            return [user.id,user.name];
        })
    );
    return res;
}

function CheckboxElement({ label, onChange }) {
    const id = useId();
    return (
        <span>
            <input type="checkbox" id={id} onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </span>
    );
}
function FilterTable({ filters, setFilters }) {
    const handleCheckboxChange = (category, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [value]: !prevFilters[category][value]
            }
        }));
    };

    return (
        <div className="ticket-dropdown">
            <span className="drop">Filter By</span>
            <div className="ticket-dropdown-content">
                <div className="Section">
                    <h4>Status</h4>
                    <br />
                    <div className="ticket-dropdowndiv">
                        {[0, 1, 2, 3].map((status) => (
                            <CheckboxElement label={statusLabels[status]} onChange={() => handleCheckboxChange('status', status)} />
                        ))}
                    </div>
                </div>
                <div className="Section">
                    <h4>Priority</h4>
                    <br />
                    <div className="ticket-dropdowndiv">
                        {[1, 2, 3, 4, 5].map((priority) => (
                            <CheckboxElement label={priority} onChange={() => handleCheckboxChange('priority', priority)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
function pagination(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    return {
        totalPages,
        pages,
        hasNext,
        hasPrevious,
        nextPage: hasNext ? currentPage + 1 : currentPage,
        previousPage: hasPrevious ? currentPage - 1 : currentPage,
    };
}
function Ticketing(props) {
    //table loading
    const itemsPerPage = 10;
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [clientNames, setClientNames] = useState([]);
    const [filters, setFilters] = useState({
        status: {},
        priority: {},
    });
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const loadedTicket = await loadTicket();
                setData(loadedTicket);
            } catch (error) {
                console.error("Error fetching ticket data:", error);
                setData([]);
            }
        };

        fetchTicket();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const loaded = await loadUsers();
                setUsers(loaded);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUsers([]);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const promises = data.map(async (row) => {
                const output = await getName(users, row.sender);
                return output;  
            });

            const names = await Promise.all(promises);
            setClientNames(names);
            console.log(clientNames);
        };
        fetchData();
    }, [data, users]);

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    //ticket adding
    const isSubmitted = useRef(false);
    const defaultData = { priority: 1, date: new Date().toISOString(), recipient: "", description: "", status: 1, sender: "HPBGTeV2wpIAUMxJKYC4", title: "" }; //default client
    const [formData, setFormData] = useState({ ...defaultData });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const handleChange = (event) => {
        setMessage('');
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (value === "") {
            setErrors({ ...errors, [name]: true })
        } else {
            setErrors({ ...errors, [name]: false })
        }
    }
    const handleSubmit = async () => {
        let num = 0;
        const errorCopy = { ...errors };
        Object.keys({ ...formData }).forEach(element => {
            if (formData[element] === "") {
                errorCopy[element] = true;
                num++;
            } else {
                errorCopy[element] = false;
            }
        })
        if (num > 0) {
            setErrors(errorCopy);
            return;
        }
        setMessage("Please wait we are submitting your ticket");
        setTimeout(function () {
            isSubmitted.current = true;
            setMessage("Your ticket submitted successfully");
        }, 1000)
    }
    useEffect(() => {
        if (isSubmitted.current) {
            const updateDatabase = async () => {
                try {
                    await addDoc(collection(db, "Tickets"), formData);
                    alert("Ticket added successfully!");
                } catch (err) {
                    console.error("Error adding ticket:", err);
                }
            };
            updateDatabase();
            isSubmitted.current = false;
        }
    }, [isSubmitted.current]);

    const filteredRows = data.filter(row => {
        const statusMatch = Object.keys(filters.status).every(key => !filters.status[key] || row.status == key) || !Object.values(filters.status).includes(true);
        const priorityMatch = Object.keys(filters.priority).every(key => !filters.priority[key] || row.priority == key) || !Object.values(filters.priority).includes(true);
        return statusMatch && priorityMatch;
    });

    const pageData = pagination(filteredRows.length, itemsPerPage, page);

    const paginatedRows = filteredRows.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    
    return(
        <>
        <NavBarAdmin/>
 <div className="main-content">
        <div className="full-page">
           <div className="ticket-div">
      <div className="top-bar">
        <FilterTable filters={filters} setFilters={setFilters} />
        <div className="button-group">
          <button className="button">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png"
              alt="Edit Icon"
            />
            Edit Ticket
          </button>
          <button className="button" onClick={() => (showForm) ? setShowForm(false) : setShowForm(true)}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png"
              alt="Edit Icon"
            />
            New Ticket
          </button>
        </div>
      </div>
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
            <col />
            <col  />
            <col  />
            <col />
            <col />
          </colgroup>
          <tr>
            <th>Title</th>
            <th>Client</th>
            <th>Request</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
           {paginatedRows.map((row, index) => {
              const realIndex = (page - 1) * itemsPerPage + index;
              return (
                <tr key={realIndex}>
                  <td>{row.title}</td>
                  <td>{clientNames[realIndex]?.[0]?.[1] || "loading"}</td>
                  <td>{row.description}</td>
                  <td>{row.status}</td>
                  <td>{row.priority}</td>
                </tr>
              )
            })}
        </table>
        <div className="table-append">
          <p id="entryText">
            Showing {filteredRows.length === 0 ? 0 : (page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredRows.length)} of {filteredRows.length} entries
          </p>
          <span className="pagination">
            <button disabled={!pageData.hasPrevious} onClick={() => setPage(pageData.previousPage)}>
              Previous
            </button>

            <span className="page-number" id="pageNumber">
              Page {page} of {pageData.totalPages}
            </span>

            <button disabled={!pageData.hasNext} onClick={() => setPage(pageData.nextPage)}>
              Next
            </button>

          </span>
        </div>
      </div>
    </div>
        </div>
        {showForm && (
            <div className="container">
            <h1>Ticket Submission Form</h1>
            <form action="#" method="post">
                <div className="form-group">
                    <label for="title">Title of Ticket</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={formData?.title}
                        onChange={handleChange}
                    />
                    {errors?.title && <p className="error">Please fill required field</p>}
                </div>

                <div className="form-group">
                    <label for="recipient">Recipient</label>
                    <select id="recipient" name="recipient" value={formData?.recipient} onChange={handleChange}>
                        <option value="toTriage">Await Triaging</option>
                        {clientNames.length > 0 ? (
                            clientNames.map((client, index) => {
                                const isClientValid = client[0].length > 0;
                                return (
                                    <option key={index} value={isClientValid ? client[0][0] : "0"}>
                                        {isClientValid ? client[0][1] : "loading"}
                                    </option>
                                );
                            })
                        ) : (
                            <option value="0">loading...</option>
                        )}
                    </select>
                    {errors?.recipient && <p className="error">Please fill required field</p>}
                </div>

                <div className="form-group">
                    <label for="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Enter description"
                        value={formData?.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors?.description && <p className="error">Please fill required field</p>}
                </div>

                <div className="form-group">
                    <label for="priority">Priority</label>
                    <select id="priority" name="priority" value={formData?.priority}
                        onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors?.priority && <p className="error">Please fill required field</p>}
                </div>

                <button type="button" onClick={handleSubmit}>Submit</button>
                {message !== "" && <p className="success-message">{message}</p>}
            </form>
        </div>
        )}
            </div>
        </>
    )
}
export default Ticketing;
