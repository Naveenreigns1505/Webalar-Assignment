// import React from 'react';
// import './App.css';
// import Navigation from './components/Navigation';
// import ContactList from './components/ContactList';
// import AddContactForm from './components/AddContactForm';
// import EditContactForm from './components/EditContactForm';

// function App() {
//   return (
//     <div className="app">
//       <Navigation />
//       <div className="container">
//         <ContactList />
//         <AddContactForm />
//         <EditContactForm />
//       </div>
//     </div>
//   );
// }

// export default App;


// ... (previous imports)
import React, { useState, useEffect } from 'react';
import NavigationBar from './components/Navigation';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

import "./App.css"

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  

  const handleAddContact = newContact => {
    setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
  };


const handleEditContact = contact => {
  setEditingContact(contact);
};


  const handleUpdateContact = updatedContact => {
    const updatedContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setEditingContact(null);
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };



  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    
      <div className="app">
        <NavigationBar />
        <div className="main-content">
          <ContactForm
            onSubmit={editingContact ? handleUpdateContact : handleAddContact}
            contactToEdit={editingContact}
          />
          <ContactList
            contacts={contacts}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </div>
      </div>
  );
};

export default App;


