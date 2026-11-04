import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export function TicketProvider({ children }) {
    const [tickets, setTickets] = useState([]);

    const addTicket = (ticket) => {
        const newTicket = {
            ...ticket,
            id: Date.now(),
            status: "Open",
            createdAt: new Date().toLocaleString()
        };

        setTickets((prev) => [...prev, newTicket]);
    };

    const updateTicketStatus = (id, status) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === id
                    ? { ...ticket, status }
                    : ticket
            )
        );
    };

    const deleteTicket = (id) => {
        setTickets((prev) =>
            prev.filter((ticket) => ticket.id !== id)
        );
    };

    const clearTickets = () => {
        setTickets([]);
    };

    return (
        <TicketContext.Provider
            value={{
                tickets,
                addTicket,
                updateTicketStatus,
                deleteTicket,
                clearTickets
            }}
        >
            {children}
        </TicketContext.Provider>
    );
}

export function useTicket() {
    return useContext(TicketContext);
}