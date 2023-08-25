import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';
import ContactItem from '../ContactItem';

const ContactList = ({ contacts, onDelete, onEdit }) => {
  const itemsPerPage = 5; 
  const pageCount = Math.ceil(contacts.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortType, setSortType] = useState('name'); 
  // const [editingContactId, setEditingContactId] = useState(null);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // const handleEditClick = (contactId) => {
  //   setEditingContactId(contactId);
  // };

  // const handleEditSave = (editedContact) => {
  //   onEdit(editedContact);
  //   setEditingContactId(null);
  // };

  const startIndex = currentPage * itemsPerPage;
  const displayedContacts = contacts
    .slice()
    .sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortType === 'email') {
        return a.email.localeCompare(b.email);
      }
      return 0;
    })
    .slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="contact-list-container">
      <div className="sort-options">
        <label>Sort by:</label>
        <select value={sortType} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>
      <ul className="contact-list">
        {displayedContacts.map((contact) => (
          <li key={contact.id}>
            <div className="contact-details">
               <ContactItem
                  key={contact.id}
                  contact={contact}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  
                />
            </div>
            <div className="contact-image">
              <img src={contact.image} alt={`${contact.name}'s profile`} />
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ContactList;


