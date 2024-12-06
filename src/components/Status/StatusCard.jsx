import React from 'react';
import './statusCard.css';

const StatusCard = ({ id, setActiveCard, title, priority, removeTicket }) => {
  const handleRemoveClick = (event) => {
    event.stopPropagation(); // Prevent the drag event from being triggered
    removeTicket(id);
  };

  return (
    <div
      id={id}
      className="card"
      draggable
      onDragStart={() => setActiveCard(id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="card-content">
        <p>Title: {title}</p>
        <div className="detail">
          <p>Priority: {priority}</p>
          <p>ID: {id}</p>
          <button
            className="remove-button"
            onClick={handleRemoveClick} // Ensure it doesn’t interfere with drag
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
