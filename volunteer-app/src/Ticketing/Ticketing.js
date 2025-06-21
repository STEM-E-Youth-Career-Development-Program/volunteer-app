import React, { useState } from "react";
import NavBarAdmin from "../Pages/navBarAdmin";
import "./Ticketing.css"


const Ticketing = (props)=>{
    const defaultData = {priority:"",due_date:"",recipient:"",description:"",type:"",team:"",title:""};
    const[formData,setFormData]=useState({...defaultData});
    const[ticketNumber,setTicketNumber]=useState(1);
    const[errors,setErrors]=useState({});
    const[message,setMessage]=useState("");
    const handleChange = (event)=>{
        setMessage('');
        const {name, value} = event.target;
        setFormData({...formData,[name]:value});
        if(value === ""){
            setErrors({...errors,[name]:true})
        }else{
           setErrors({...errors,[name]:false}) 
        }
    }
    const handleSubmit = ()=>{
        let num = 0;
        const errorCopy = {...errors};
        Object.keys({...formData}).forEach(element=>{
            if(formData[element] === ""){
                errorCopy[element]= true;
                num++;
            }else{
                errorCopy[element] = false;
            }
        })
        if(num > 0){
            setErrors(errorCopy);
            return;
        }
        setMessage("Please wait we are submitting your ticket");
        setTimeout(function(){
            setMessage("Your ticket submitted successfully and, ticket number:#"+(ticketNumber));
            setFormData(defaultData);
            setTicketNumber(ticketNumber+1);
        },4000)

    }
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
          <tr>
            <td>12/31/2020</td>
            <td>Jeff Smith</td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
              Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex
              sapien vitae pellentesque sem placerat in id. Placerat in id
              cursus mi pretium tellus duis. Pretium tellus duis convallis
              tempus leo eu aenean.
            </td>
            <td><span className="status open">Open</span></td>
            <td>4</td>
          </tr>
          <tr>
            <td>12/28/2020</td>
            <td>Maria Jones</td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet
              consectetur adipiscing elit quisque faucibus ex. Adipiscing elit
              quisque faucibus ex sapien vitae pellentesque.
            </td>
            <td><span className="status closed">Closed</span></td>
            <td>2</td>
          </tr>
          <tr>
            <td>12/23/2020</td>
            <td>John Cobaine</td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipiscing elit quisque
              faucibus ex sapien vitae pellentesque sem placerat in id cursus mi
              pretium tellus duis convallis tempus leo eu aenean sed diam.
            </td>
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
        </table>
        <div className="table-append">
          <p id="entryText">Showing 1 to 4 of 4 entries</p>
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
          <label for="team">Team Name</label>
          <select id="team" name="team" value={formData?.team} onChange={handleChange}>
            <option value="">Select team</option>
            <option value="team-a">Volunteer App</option>
          </select>
          {errors?.team && <p className="error">Please fill required field</p>}
        </div>

        <div className="form-group">
          <label for="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter type of ticket"
            value={formData?.type}
            onChange={handleChange}
          />
           {errors?.type && <p className="error">Please fill required field</p>}
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
          <label for="recipient"
            >Recipient Information (Email/DiscordID/Username)</label
          >
          <input
            type="text"
            id="recipient"
            name="recipient"
            placeholder="Enter recipient information"
            value={formData?.recipient}
            onChange={handleChange}
          />
          {errors?.recipient && <p className="error">Please fill required field</p>}
        </div>

        <div className="form-group">
          <label for="due-date">Due Date</label>
          <input type="date" id="due-date" name="due_date"   value={formData?.due_date}
            onChange={handleChange}/>
          {errors?.due_date && <p className="error">Please fill required field</p>}
        </div>

        <div className="form-group">
          <label for="priority">Priority</label>
          <select id="priority" name="priority" value={formData?.priority}
            onChange={handleChange}>
                <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors?.priority && <p className="error">Please fill required field</p>}
        </div>

        <button type="button" onClick={handleSubmit}>Submit</button>
        {message !== "" && <p className="success-message">{message}</p>}
      </form>
    </div>
        </div>
        </div>
        </>
    )
}
export default Ticketing;