import { TicketProvider } from "./context/TicketContext";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import TicketSummary from "./components/TicketSummary";

function App() {
    return (
        <TicketProvider>
            <div className="container mt-4 mb-5">
                <div className="text-center mb-4">
                    <h1>Helpdesk Service Request</h1>
                    <p className="text-muted">
                        Sistem Pengelolaan Laporan Permasalahan
                    </p>
                </div>

                <TicketSummary />

                <TicketForm />

                <TicketList />
            </div>
        </TicketProvider>
    );
}

export default App;