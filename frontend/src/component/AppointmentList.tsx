import React, { useState } from "react";
import { Appointment } from "../types";

interface Props {
  appointments: Appointment[];
  onToggle: (appointment: Appointment) => void;
  onDelete: (appointmentID: number) => void;
}

const AppointmentList: React.FC<Props> = ({ appointments, onToggle, onDelete }) => {
  const [editingAppointmentID, setEditingAppointmentID] = useState<number | null>(null);
  const [editAppointmentStatus, setEditAppointmentStatus] = useState<string>("Pending");
  const [editAppointmentPatient, setEditAppointmentPatient] = useState<string>("");
  const [editAppointmentDoctor, setEditAppointmentDoctor] = useState<string>("");
  const [editAppointmentDate, setEditAppointmentDate] = useState<string>("");

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointmentID(appointment.id);
    setEditAppointmentStatus(appointment.status);
    setEditAppointmentPatient(appointment.patient);
    setEditAppointmentDoctor(appointment.doctor);
    setEditAppointmentDate(appointment.date_of_appointment);
  };

  const handleSave = (appointment: Appointment) => {
    onToggle({
      ...appointment,
      status: editAppointmentStatus,  // Keep status as "Pending" or "Done"
      patient: editAppointmentPatient,
      doctor: editAppointmentDoctor,
      date_of_appointment: editAppointmentDate
    });
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setEditingAppointmentID(null);
    setEditAppointmentStatus("Pending");
    setEditAppointmentPatient("");
    setEditAppointmentDoctor("");
    setEditAppointmentDate("");
  };

  return (
    <ul>
      {appointments.map((appointment) => (
        <li key={appointment.id} style={{ marginBottom: "10px" }}>
          {editingAppointmentID === appointment.id ? (
            <>
              <select
                value={editAppointmentStatus}
                onChange={(e) => setEditAppointmentStatus(e.target.value)}
                style={{ marginRight: "10px" }}
              >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>

              <input
                type="text"
                value={editAppointmentPatient}
                onChange={(e) => setEditAppointmentPatient(e.target.value)}
                style={{ marginRight: "10px" }}
                placeholder="Enter patient name"
              />
              <input
                type="text"
                value={editAppointmentDoctor}
                onChange={(e) => setEditAppointmentDoctor(e.target.value)}
                style={{ marginRight: "10px" }}
                placeholder="Enter doctor name"
              />
              <input
                type="text"
                value={editAppointmentDate}
                onChange={(e) => setEditAppointmentDate(e.target.value)}
                style={{ marginRight: "10px" }}
                placeholder="Enter appointment date"
              />
              <button onClick={() => handleSave(appointment)} style={{ marginRight: "5px" }}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ marginRight: "10px" }}>
                {appointment.status} - {appointment.patient} - {appointment.doctor} - {appointment.date_of_appointment}
              </span>
              <button onClick={() => handleEdit(appointment)} style={{ marginRight: "5px" }}>
                Edit
              </button>
              <button onClick={() => onDelete(appointment.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;