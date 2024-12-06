import React, { useContext, useEffect, useState } from 'react';
import './Status.css';
import { DataContext } from '../../DataContext/DataContext';
import StatusCard from './StatusCard';
import AddCard from '../AddCard/AddCard';

const Status = () => {
  const { data, ordering} = useContext(DataContext);
  const status = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const [sortedTickets, setSortedTickets] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [addActive, setAddActive] = useState(null);

  useEffect(() => {
    if (data && data.tickets) {
      const ticketsCopy = [...data.tickets];

      ticketsCopy.sort((a, b) => {
        if (ordering === 'priority') {
          return a.priority - b.priority || a.title.localeCompare(b.title);
        }
        if (ordering === 'title') {
          return a.title.localeCompare(b.title) || a.priority - b.priority;
        }
        return 0;
      });

      setSortedTickets(ticketsCopy);
    }
  }, [ordering, data]);

  if (!data || !data.tickets) {
    return <div>Loading....</div>;
  }

  const handleDrop = (event, statusItem) => {
    event.preventDefault();
    if (!activeCard) return;

    const updateTicket = sortedTickets.map(ticket =>
      ticket.id === activeCard ? { ...ticket, status: statusItem } : ticket
    );
    setSortedTickets(updateTicket);
    setActiveCard(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const addTicket = (newTicket) => {
    setSortedTickets([...sortedTickets, newTicket]);
    setAddActive(null);
  };

  const removeTicket = (id) => {
    const updatedTickets = sortedTickets.filter(ticket => ticket.id !== id);
    setSortedTickets(updatedTickets);
  };

  return (
    <div className="heading">
      {status.map((statusItem) => (
        <div
          key={statusItem}
          className="status-column"
          onDrop={(event) => handleDrop(event, statusItem)}
          onDragOver={handleDragOver}
        >
          <span>{statusItem}</span>
          <button onClick={() => setAddActive(addActive === statusItem ? null : statusItem)}>
            Add
          </button>
          <div className="cards">
            {addActive === statusItem && (
              <AddCard
                tickets={sortedTickets}
                addTicket={(newTicket) => addTicket({ ...newTicket, status: statusItem })}
              />
            )}
            {sortedTickets
              .filter(ticket => ticket.status === statusItem)
              .map((item) => (
                <StatusCard
                  key={item.id}
                  id={item.id}
                  setActiveCard={setActiveCard}
                  title={item.title}
                  priority={item.priority}
                  removeTicket={removeTicket} // Pass remove function to StatusCard
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Status;
