import React from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import DashboardCard from "../DashboardCard";
import { eventsData } from "../../data/mockData";

const Events = () => {
  // Format date for display
  const formatDate = (date) => {
    const eventDate = new Date(date);

    if (eventDate.toDateString() === new Date().toDateString()) {
      return "Today";
    } else if (
      eventDate.toDateString() ===
      new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
    ) {
      return "Tomorrow";
    } else {
      return eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Sort events by date
  const sortedEvents = eventsData.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="fade-in p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">All Events</h2>
      </div>

      <DashboardCard title="Upcoming Events" icon={<FiCalendar />}>
        <div className="p-3">
          <div className="list-group">
            {sortedEvents.map((event) => {
              // Set appropriate color based on event type
              const typeColor =
                event.type === "meeting"
                  ? "info"
                  : event.type === "deadline"
                  ? "warning"
                  : event.type === "presentation"
                  ? "danger"
                  : "success";

              const eventTypeLabel =
                event.type === "meeting"
                  ? "Meeting"
                  : event.type === "deadline"
                  ? "Deadline"
                  : event.type === "presentation"
                  ? "Presentation"
                  : "Training";

              return (
                <div
                  key={event.id}
                  className="list-group-item border-0 px-3 py-3 event-item mb-2"
                >
                  <div className="d-flex">
                    <div className="me-3">
                      <div
                        className={`event-icon bg-${typeColor} bg-opacity-10`}
                      >
                        <FiCalendar size={18} className={`text-${typeColor}`} />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1">{event.title}</h5>
                          <span
                            className={`badge bg-${typeColor} bg-opacity-10 text-${typeColor} me-2`}
                          >
                            {eventTypeLabel}
                          </span>
                          <small className="text-muted d-inline-flex align-items-center">
                            <FiClock size={12} className="me-1" />
                            {formatDate(event.date)}, {event.time}
                          </small>
                        </div>
                        <span className="badge bg-light text-dark">
                          {new Date(event.date).toDateString() ===
                          new Date().toDateString()
                            ? "Today"
                            : formatDate(event.date)}
                        </span>
                      </div>
                      <p className="mt-2 mb-0 text-muted">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Events;
