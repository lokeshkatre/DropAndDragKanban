import React, { useState } from 'react';

const AddCard = ({ tickets, addTicket }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !priority) {
      alert('Please fill out all required fields.');
      return;
    }

    // Get last ticket ID and increment for new ticket
    const lastId = tickets.length ? tickets[tickets.length - 1].id : 'CAM-0';
    const lastIdNumber = parseInt(lastId.split('-')[1]);
    const newId = `CAM-${lastIdNumber + 1}`;

    // New ticket object
    const newTicket = {
      id: newId,
      title,
      tag: tag ? [tag] : [],
      userId: null, // Set null or default value
      status: 'Backlog', // Default to "Backlog"
      priority: parseInt(priority),
    };

    addTicket(newTicket);

    // Clear the form
    setTitle('');
    setPriority('');
    setTag('');
  };

  return (
    <form onSubmit={handleSubmit} >
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter title"
        />
      </div>
      <div>
        <label>Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select priority</option>
          <option value="1">1 - High</option>
          <option value="2">2 - Medium</option>
          <option value="3">3 - Low</option>
          <option value="4">4 - Very Low</option>
          
        </select>
      </div>
      <div>
        <label>Tag (optional):</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag"
        />
      </div>
      <button type="submit">Add Ticket</button>
    </form>
  );
};

export default AddCard;
