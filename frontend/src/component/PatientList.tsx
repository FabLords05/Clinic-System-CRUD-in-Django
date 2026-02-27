import React, { useState } from "react";
import { Patient } from "../types";


interface Props {
  patients: Patient[];
  onToggle: (patient: Patient) => void;
  onDelete: (patientID: number) => void;
}


const PatientList: React.FC<Props> = ({ patients, onToggle, onDelete }) => {
  const [editingPatientID, setEditingPatientID] = useState<number | null>(null);
  const[editEmail, setEditEmail] = useState<string>("");
  const[EditPatientName, setEditPatientName] = useState<string>("");
  const[editPhoneNumber, setEditPhoneNumber] = useState<string>("");


  const handleEdit = (patient: Patient) => {
    setEditingPatientID(patient.id);
    setEditPatientName(patient.name);
    setEditEmail(patient.email);
    setEditPhoneNumber(patient.phone_number);
  };


  const handleSave = (patient: Patient) => {
    onToggle({
      ...patient,
      name: EditPatientName,
      email: editEmail,
      phone_number: editPhoneNumber
    });
    setEditingPatientID(null);
    setEditPatientName("");
    setEditEmail("");
    setEditPhoneNumber("");

  };


  const handleCancel = () => {
    setEditingPatientID(null);
    setEditPatientName("");
    setEditEmail("");
    setEditPhoneNumber("");
  };


  return (
    <ul>
      {patients.map((patient) => (
        <li key={patient.id} style={{ marginBottom: "10px" }}>
          {editingPatientID === patient.id ? (
            <>
              <input
                type="text"
                value={EditPatientName}
                onChange={(e) => setEditPatientName(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <input
                type="text"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <input
                type="text"
                value={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <button onClick={() => handleSave(patient)} style={{ marginRight: "5px" }}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span
                style={{
                  marginRight: "10px",
                }}
              >
                {patient.name} - {patient.email} - {patient.phone_number}
              </span>
              <button onClick={() => handleEdit(patient)} style={{ marginRight: "5px" }}>
                Edit
              </button>
              <button onClick={() => onDelete(patient.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};


export default PatientList;
