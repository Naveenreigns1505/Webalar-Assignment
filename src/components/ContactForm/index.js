import React, { useState, useEffect } from 'react';

const ContactForm = ({ onSubmit, contactToEdit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

 
  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhoneNumber(contactToEdit.phoneNumber);
      setEmail(contactToEdit.email);
    }
  }, [contactToEdit]);

  const handleSubmit = e => {
    e.preventDefault();

    
    const editedContact = {
      name,
      phoneNumber,
      email,
    };

    onSubmit(editedContact);


    setName('');
    setPhoneNumber('');
    setEmail('');
    setFeedbackMessage('Contact added successfully!');
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        pattern="[A-Za-z ]+"
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        pattern="[0-9]{10}"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button type="submit">{contactToEdit ? 'Update Contact' : 'Add Contact'}</button>
      <div className="feedback">{feedbackMessage}</div> 
    </form>
  );
};

export default ContactForm;
