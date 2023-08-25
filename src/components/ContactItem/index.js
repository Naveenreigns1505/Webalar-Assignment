

import React, { useState } from 'react';
import './index.css';

const ContactItem = ({ contact, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContact(contact);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleUpdateContact = () => {
    onEdit(editedContact);
    setIsEditing(false);
  };

  return (
    <div className="contact-item">
      {isEditing ? (
        <div className="contact-details">
          <input
            type="text"
            name="name"
            value={editedContact.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            value={editedContact.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={editedContact.email}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdateContact}>Update</button>
        </div>
      ) : (
        <div className="contact-details">
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Email:</strong> {contact.email}</p>
        </div>
      )}
      <div className="contact-actions">
        {isEditing ? (
          <button onClick={handleEditToggle}>Cancel</button>
        ) : (
          <>
            <button onClick={handleEditToggle}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
