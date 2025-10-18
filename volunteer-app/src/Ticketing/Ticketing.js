import React, { useState, useEffect, useRef } from "react";
import NavBarAdmin from "../Pages/navBarAdmin";
import "./Ticketing.css"
import { db, collection, getDocs, addDoc, doc, writeBatch, setDoc } from "../index.js"

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


function Ticketing(props) {
    //table loading
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [clientNames, setClientNames] = useState([]);
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
    const defaultData = { priority: "", date: new Date().toISOString(), recipient: "", description: "", status: 1, client: "HPBGTeV2wpIAUMxJKYC4", title: "" }; //default client
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
    
    return(
        <>
        <NavBarAdmin/>
 <div className="main-content">
        <div className="full-page">
           <div className="ticket-div">
      <div className="top-bar">
        <div className="ticket-filter">
          <select name="filter" id="filter">
            <option selected>Filter By: (Dropdown)</option>
            <option value="due date">Due Date</option>
            <option value="client">Client</option>
            <option value="request">Request</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>
        </div>
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
            <th>Due Date</th>
            <th>Client</th>
            <th>Request</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
           {data.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{(clientNames.length > 0 && clientNames[index][0].length > 0) ? clientNames[index][0][1] : "loading"}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>{row.priority}</td>
              </tr>
            ))}
        </table>
        <div className="table-append">
          <p id="entryText">
               Showing {data.length > 0 ? 1 : 0} to {data.length} of {data.length} {data.length === 1 ? "entry" : "entries"}
          </p>
          <span className="pagination">
            <button
              
            >
              Previous
            </button>
            <span className="page-number" id="pageNumber">Page 1</span>
            <button
              
            >
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
