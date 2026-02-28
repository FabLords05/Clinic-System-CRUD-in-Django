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
  const [editAppointmentPatient, setEditAppointmentPatient] = useState<number>(0);
  const [editAppointmentDoctor, setEditAppointmentDoctor] = useState<number>(0);
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
    setEditAppointmentPatient(0);
    setEditAppointmentDoctor(0);
    setEditAppointmentDate("");
  };

  return (
    <ul className="space-y-4">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
          {editingAppointmentID === appointment.id ? (
            <div className="space-y-3">
              <select
                value={editAppointmentStatus}
                onChange={(e) => setEditAppointmentStatus(e.target.value)}
                className="border p-2 rounded-lg w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>

              <input
                type="number"
                value={editAppointmentPatient}
                onChange={(e) => setEditAppointmentPatient(Number(e.target.value))}
                className="border p-2 rounded-lg w-full"
                placeholder="Enter patient ID"
              />
              <input
                type="number"
                value={editAppointmentDoctor}
                onChange={(e) => setEditAppointmentDoctor(Number(e.target.value))}
                className="border p-2 rounded-lg w-full"
                placeholder="Enter doctor ID"
              />
              <input
                type="text"
                value={editAppointmentDate}
                onChange={(e) => setEditAppointmentDate(e.target.value)}
                className="border p-2 rounded-lg w-full"
                placeholder="Enter appointment date"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave(appointment)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="block text-sm text-gray-600">
                <strong>Status:</strong> {appointment.status}
              </span>
              <span className="block text-sm text-gray-600">
                <strong>Patient ID:</strong> {appointment.patient}
              </span>
              <span className="block text-sm text-gray-600">
                <strong>Doctor ID:</strong> {appointment.doctor}
              </span>
              <span className="block text-sm text-gray-600">
                <strong>Date:</strong> {appointment.date_of_appointment}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(appointment.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;