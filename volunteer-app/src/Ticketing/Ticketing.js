import React, { useState, useEffect } from "react";
import NavBarAdmin from "../Pages/navBarAdmin";
import "./Ticketing.css"

const statusLabels = {
    0: "Awaiting Triaging",
    1: "Assigned",
    2: "User Update Needed",
    3: "Closed"
};

// Mock ticket data for development
const mockTickets = [
    { id: "1", title: "Login Issue", description: "User cannot login", sender: "user1", recipient: "admin1", status: 0, priority: 2, date: "2024-01-10" },
    { id: "2", title: "Database Error", description: "Database connection failed", sender: "user2", recipient: "admin2", status: 1, priority: 4, date: "2024-01-11" },
    { id: "3", title: "UI Bug", description: "Button not responsive", sender: "user3", recipient: "admin1", status: 2, priority: 1, date: "2024-01-12" },
];

const mockUsers = [
    { id: "user1", name: "John Smith" },
    { id: "user2", name: "Jane Doe" },
    { id: "user3", name: "Mike Johnson" },
    { id: "admin1", name: "Admin User 1" },
    { id: "admin2", name: "Admin User 2" },
];

function Ticketing() {
    const [showForm, setShowForm] = useState(false);
    const [editingTicketId, setEditingTicketId] = useState(null);
    const [tickets, setTickets] = useState(() => {
        // Load from localStorage, fallback to mock data
        try {
            const saved = localStorage.getItem('tickets');
            return saved ? JSON.parse(saved) : mockTickets;
        } catch (error) {
            console.error("Error loading tickets from localStorage:", error);
            return mockTickets;
        }
    });
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [activeStatusFilters, setActiveStatusFilters] = useState({});
    const [activePriorityFilters, setActivePriorityFilters] = useState({});
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        recipient: "",
        priority: "1",
        status: 0
    });
    
    const [formErrors, setFormErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState("");

    // Save tickets to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('tickets', JSON.stringify(tickets));
        } catch (error) {
            console.error("Error saving tickets to localStorage:", error);
        }
    }, [tickets]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setFormErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.description.trim()) errors.description = "Description is required";
        if (!formData.recipient) errors.recipient = "Recipient is required";
        if (!formData.priority) errors.priority = "Priority is required";
        return errors;
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

    const handleSubmitTicket = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const newTicket = {
                ...formData,
                id: Date.now().toString(),
                date: new Date().toISOString().split('T')[0],
                sender: "currentUser",
                status: 0
            };
            
            setTickets(prev => [newTicket, ...prev]);
            
            setFormData({
                title: "",
                description: "",
                recipient: "",
                priority: "1",
                status: 0
            });
            setShowForm(false);
            setSubmitMessage("Ticket submitted successfully!");
            setTimeout(() => setSubmitMessage(""), 3000);
        } catch (error) {
            console.error("Error submitting ticket:", error);
            setSubmitMessage("Error submitting ticket");
        }
    };

    const toggleStatusFilter = (status) => {
        setActiveStatusFilters(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
        setCurrentPage(1);
    };

    const togglePriorityFilter = (priority) => {
        setActivePriorityFilters(prev => ({
            ...prev,
            [priority]: !prev[priority]
        }));
        setCurrentPage(1);
    };

    const filterTickets = () => {
        return tickets.filter(ticket => {
            const activeStatuses = Object.keys(activeStatusFilters).filter(k => activeStatusFilters[k]);
            const statusMatch = activeStatuses.length === 0 || activeStatuses.includes(String(ticket.status));
            
            const activePriorities = Object.keys(activePriorityFilters).filter(k => activePriorityFilters[k]);
            const priorityMatch = activePriorities.length === 0 || activePriorities.includes(String(ticket.priority));
            
            const searchLower = searchTerm.toLowerCase();
            const searchMatch = ticket.title.toLowerCase().includes(searchLower) || 
                               ticket.description.toLowerCase().includes(searchLower);
            
            return statusMatch && priorityMatch && searchMatch;
        });
    };

    const filteredTickets = filterTickets();
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : "Unknown";
    };

    const handleEditTicket = (ticketId) => {
        const ticket = tickets.find(t => t.id === ticketId);
        if (ticket) {
            setEditingTicketId(ticketId);
            setFormData({
                title: ticket.title,
                description: ticket.description,
                recipient: ticket.recipient,
                priority: String(ticket.priority),
                status: ticket.status
            });
            setShowForm(true);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            setTickets(prev => prev.map(t => 
                t.id === editingTicketId 
                    ? { ...t, ...formData }
                    : t
            ));
            
            setShowForm(false);
            setEditingTicketId(null);
            setFormData({
                title: "",
                description: "",
                recipient: "",
                priority: "1",
                status: 0
            });
            setSubmitMessage("Ticket updated successfully!");
            setTimeout(() => setSubmitMessage(""), 3000);
        } catch (error) {
            console.error("Error updating ticket:", error);
            setSubmitMessage("Error updating ticket");
        }
    };

    return (
        <>
            <NavBarAdmin />
            <div className="main-content">
                <div className="full-page">
                    <div className="ticket-div">
                        {/* Top Bar with Filters and Buttons */}
                        <div className="top-bar">
                            {/* Filter Dropdown */}
                            <div className="dropdown">
                                <button className="drop">Filter By (Dropdown)</button>
                                <div className="dropdown-content">
                                    <div className="Section">
                                        <h4>Status</h4>
                                        <div className="Dropdowndiv">
                                            {[0, 1, 2, 3].map((status) => (
                                                <label key={status}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={activeStatusFilters[status] || false}
                                                        onChange={() => toggleStatusFilter(status)}
                                                    />
                                                    {statusLabels[status]}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="Section">
                                        <h4>Priority</h4>
                                        <div className="Dropdowndiv">
                                            {[1, 2, 3, 4, 5].map((priority) => (
                                                <label key={priority}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={activePriorityFilters[priority] || false}
                                                        onChange={() => togglePriorityFilter(priority)}
                                                    />
                                                    Priority {priority}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="button-group">
                                <button 
                                    className="button" 
                                    onClick={() => {
                                        setEditingTicketId(null);
                                        setFormData({
                                            title: "",
                                            description: "",
                                            recipient: "",
                                            priority: "1",
                                            status: 0
                                        });
                                        setFormErrors({});
                                        setShowForm(!showForm);
                                    }}
                                >
                                    <img src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png" alt="New" />
                                    {showForm && !editingTicketId ? "Cancel" : "New Ticket"}
                                </button>
                                <button 
                                    className="button" 
                                    onClick={() => setShowForm(!showForm)}
                                >
                                    <img src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png" alt="Edit" />
                                    {showForm ? "Back to Table" : "Edit Ticket"}
                                </button>
                            </div>
                        </div>

                        {/* Ticket Table */}
                        <div className="ticket-table">
                            {/* Search and Entries */}
                            <div className="table-append">
                                <span>
                                    Show entries:
                                    <select 
                                        className="input"
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </span>
                                <span>
                                    Search:
                                    <input 
                                        type="text" 
                                        className="input"
                                        placeholder="Search title or description"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </span>
                            </div>

                            {/* Table */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Client</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedTickets.length > 0 ? (
                                        paginatedTickets.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td>{ticket.title}</td>
                                                <td>{getUserName(ticket.sender)}</td>
                                                <td>{ticket.description}</td>
                                                <td>{statusLabels[ticket.status] || "Unknown"}</td>
                                                <td>{ticket.priority}</td>
                                                <td>
                                                    <button 
                                                        className="action-btn"
                                                        onClick={() => handleEditTicket(ticket.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                                                No tickets found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="table-append">
                                <p id="entryText">
                                    Showing {filteredTickets.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length} entries
                                </p>
                                <span className="pagination">
                                    <button 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        Previous
                                    </button>
                                    <span className="page-number">
                                        Page {currentPage} of {totalPages || 1}
                                    </span>
                                    <button 
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Next
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ticket Submission/Edit Form */}
                {showForm && (
                    <div className="container">
                        <h1>{editingTicketId ? "Edit Ticket" : "New Ticket Submission"}</h1>
                        <form onSubmit={editingTicketId ? handleSaveEdit : handleSubmitTicket}>
                            <div className="form-group">
                                <label htmlFor="title">Title of Ticket *</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                />
                                {formErrors.title && <p className="error">{formErrors.title}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                ></textarea>
                                {formErrors.description && <p className="error">{formErrors.description}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="recipient">Assign To *</label>
                                <select 
                                    id="recipient" 
                                    name="recipient" 
                                    value={formData.recipient}
                                    onChange={handleFormChange}
                                >
                                    <option value="">Select a recipient</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                {formErrors.recipient && <p className="error">{formErrors.recipient}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority *</label>
                                <select 
                                    id="priority" 
                                    name="priority" 
                                    value={formData.priority}
                                    onChange={handleFormChange}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="1">1 - Low</option>
                                    <option value="2">2</option>
                                    <option value="3">3 - Medium</option>
                                    <option value="4">4</option>
                                    <option value="5">5 - High</option>
                                </select>
                                {formErrors.priority && <p className="error">{formErrors.priority}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select 
                                    id="status" 
                                    name="status" 
                                    value={formData.status}
                                    onChange={handleFormChange}
                                >
                                    {Object.entries(statusLabels).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit">
                                {editingTicketId ? "Update Ticket" : "Submit Ticket"}
                            </button>
                            {submitMessage && <p className="success-message">{submitMessage}</p>}
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Ticketing;
