import React, { useEffect, useState } from "react";
import NavBarAdmin from "../Pages/navBarAdmin";
import "./Ticketing.css";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const Ticketing = () => {
  const defaultData = {
    priority: "",
    due_date: "",
    recipient: "",
    description: "",
    type: "",
    team: "",
    title: "",
  };

  const [formData, setFormData] = useState({ ...defaultData });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Table rows come from Firestore in real time
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => {
          const v = d.data();
          return {
            id: d.id,
            due_date: v.due_date || "",
            client: v.recipient || v.team || "—",
            request: v.description || v.title || "",
            statusClass: v.statusClass || "open",
            statusLabel: v.statusLabel || "Open",
            priority: v.priority || "—",
          };
        });
        setRows(data);
      },
      (err) => {
        console.error("Firestore listen error:", err);
        setMessage("Cannot read from Firebase (permission or config issue).");
      }
    );
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: value === "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple required validation
    let hasErrors = false;
    const copy = { ...errors };
    Object.keys(formData).forEach((k) => {
      if (formData[k] === "") {
        copy[k] = true;
        hasErrors = true;
      }
    });
    if (hasErrors) {
      setErrors(copy);
      return;
    }

    setSaving(true);
    setMessage("Please wait we are submitting your ticket");

    try {
      await addDoc(collection(db, "tickets"), {
        title: formData.title,
        team: formData.team,
        type: formData.type,
        description: formData.description,
        recipient: formData.recipient,
        due_date: formData.due_date,
        priority: formData.priority,
        statusClass: "open",
        statusLabel: "Open",
        createdAt: serverTimestamp(),
      });

      setMessage("Your ticket submitted successfully.");
      setFormData(defaultData);
    } catch (err) {
      console.error("Firestore write error:", err);
      setMessage("There was a problem saving to Firebase (permission/config).");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <NavBarAdmin />
      <div className="main-content">
        <div className="full-page">
          <div className="ticket-div">
            <div className="top-bar">
              <div className="ticket-filter">
                <select name="filter" id="filter" defaultValue="">
                  <option value="">Filter By: (Dropdown)</option>
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
                <button className="button">
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
                  <select className="input" defaultValue="50">
                    <option value="50" disabled>
                      50
                    </option>
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
                  <col />
                  <col />
                  <col />
                  <col />
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
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td>{r.due_date}</td>
                      <td>{r.client}</td>
                      <td>{r.request}</td>
                      <td>
                        <span className={`status ${r.statusClass}`}>
                          {r.statusLabel}
                        </span>
                      </td>
                      <td>{r.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-append">
                <p id="entryText">
                  Showing {rows.length > 0 ? 1 : 0} to {rows.length} of {rows.length} {rows.length === 1 ? "entry" : "entries"}
                </p>
                <span className="pagination">
                  <button>Previous</button>
                  <span className="page-number" id="pageNumber">
                    Page 1
                  </span>
                  <button>Next</button>
                </span>
              </div>
            </div>
          </div>

          <div className="container">
            <h1>Ticket Submission Form</h1>
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group">
                <label htmlFor="title">Title of Ticket</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="team">Team Name</label>
                <select
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                >
                  <option value="">Select team</option>
                  <option value="team-a">Volunteer App</option>
                </select>
                {errors.team && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  id="type"
                  name="type"
                  placeholder="Enter type of ticket"
                  value={formData.type}
                  onChange={handleChange}
                />
                {errors.type && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="recipient">
                  Recipient Information (Email/DiscordID/Username)
                </label>
                <input
                  id="recipient"
                  name="recipient"
                  placeholder="Enter recipient information"
                  value={formData.recipient}
                  onChange={handleChange}
                />
                {errors.recipient && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="due-date">Due Date</label>
                <input
                  type="date"
                  id="due-date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
                {errors.due_date && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                {errors.priority && (
                  <p className="error">Please fill required field</p>
                )}
              </div>

              <button type="submit" disabled={saving}>
                {saving ? "Submitting..." : "Submit"}
              </button>
              {message && <p className="success-message">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticketing;
