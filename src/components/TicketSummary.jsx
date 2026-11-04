import { useTicket } from "../context/TicketContext";

function TicketSummary() {
    const { tickets } = useTicket();

    const total = tickets.length;

    const open = tickets.filter(
        (ticket) => ticket.status === "Open"
    ).length;

    const progress = tickets.filter(
        (ticket) => ticket.status === "In Progress"
    ).length;

    const resolved = tickets.filter(
        (ticket) => ticket.status === "Resolved"
    ).length;

    return (
        <div className="row mb-4">
            <div className="col-md-3 mb-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6>Total Tickets</h6>
                        <h2>{total}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6>Open</h6>
                        <h2>{open}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6>In Progress</h6>
                        <h2>{progress}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6>Resolved</h6>
                        <h2>{resolved}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketSummary;