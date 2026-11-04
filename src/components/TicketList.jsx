import { useState } from "react";
import { useTicket } from "../context/TicketContext";

function TicketList() {
    const {
        tickets,
        updateTicketStatus,
        deleteTicket,
        clearTickets
    } = useTicket();

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const filteredTickets = tickets.filter((ticket) => {
        const matchSearch =
            ticket.title.toLowerCase().includes(search.toLowerCase()) ||
            ticket.name.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            categoryFilter === "" ||
            ticket.category === categoryFilter;

        const matchStatus =
            statusFilter === "" ||
            ticket.status === statusFilter;

        const matchPriority =
            priorityFilter === "" ||
            ticket.priority === priorityFilter;

        return (
            matchSearch &&
            matchCategory &&
            matchStatus &&
            matchPriority
        );
    });

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Ticket List</h5>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        if (window.confirm("Hapus semua ticket?")) {
                            clearTickets();
                        }
                    }}
                >
                    Clear All
                </button>
            </div>

            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-3 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cari ticket..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3 mb-2">
                        <select
                            className="form-select"
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                        >
                            <option value="">Semua Kategori</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                            <option value="Network">Network</option>
                            <option value="Account">Account</option>
                            <option value="Security">Security</option>
                        </select>
                    </div>

                    <div className="col-md-3 mb-2">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="">Semua Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <div className="col-md-3 mb-2">
                        <select
                            className="form-select"
                            value={priorityFilter}
                            onChange={(e) =>
                                setPriorityFilter(e.target.value)
                            }
                        >
                            <option value="">Semua Prioritas</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                {filteredTickets.length === 0 ? (
                    <p className="text-center text-muted">
                        Belum ada ticket.
                    </p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Judul</th>
                                    <th>Kategori</th>
                                    <th>Prioritas</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.title}</td>
                                        <td>{ticket.category}</td>
                                        <td>{ticket.priority}</td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={ticket.status}
                                                onChange={(e) =>
                                                    updateTicketStatus(
                                                        ticket.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Open">
                                                    Open
                                                </option>

                                                <option value="In Progress">
                                                    In Progress
                                                </option>

                                                <option value="Resolved">
                                                    Resolved
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteTicket(ticket.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TicketList;