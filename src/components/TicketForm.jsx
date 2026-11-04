import { useEffect, useRef, useState } from "react";
import { useTicket } from "../context/TicketContext";

function TicketForm() {
    const { addTicket } = useTicket();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "",
        category: "",
        priority: "Medium",
        title: "",
        description: "",
        incidentDate: ""
    });

    const titleRef = useRef(null);

    useEffect(() => {
        fetch("/categories.json")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.location ||
            !formData.category ||
            !formData.title ||
            !formData.description ||
            !formData.incidentDate
        ) {
            alert("Semua kolom wajib diisi!");
            return;
        }

        addTicket(formData);

        alert("Ticket berhasil dibuat!");

        setFormData({
            name: "",
            email: "",
            location: "",
            category: "",
            priority: "Medium",
            title: "",
            description: "",
            incidentDate: ""
        });

        titleRef.current.focus();
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Create New Ticket</h5>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Nama Pelapor
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Lokasi
                        </label>

                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Kategori
                        </label>

                        <select
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">
                                Pilih Kategori
                            </option>

                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Prioritas
                        </label>

                        <select
                            name="priority"
                            className="form-select"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Judul Permasalahan
                        </label>

                        <input
                            ref={titleRef}
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Deskripsi Permasalahan
                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Tanggal Kejadian
                        </label>

                        <input
                            type="date"
                            name="incidentDate"
                            className="form-control"
                            value={formData.incidentDate}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit Ticket
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TicketForm;