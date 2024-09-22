import React, { useState } from 'react';
import "./AccPageOthers.css"
import './static/slimes2.jpg'

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div ClassName="userpage">
      <h4 style={{ fontFamily: 'sans-serif' }} id="toggle" onClick={showModal}>
        User1234
      </h4>

      {isOpen && (
        <dialog id="modal" open>
          <div className="container">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="content">
              <img alt="profile pic" src="./static/slimes2.jpg" />
              <ul>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Role</li>
                <li>Discord ID</li>
              </ul>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UserProfile;