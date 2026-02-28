import React, { useState } from "react";
import { Doctor } from "../types";


interface Props {
  doctor: Doctor[];
  onToggle: (doctor: Doctor) => void;
  onDelete: (doctorID: number) => void;
}


const DoctorList: React.FC<Props> = ({ doctor, onToggle, onDelete }) => {
  const [editingDoctorID, setEditingDoctorID] = useState<number | null>(null);
  const[editEmail, setEditEmail] = useState<string>("");
  const[EditDoctorName, setEditDoctorName] = useState<string>("");
  const[editPhoneNumber, setEditPhoneNumber] = useState<string>("");


  const handleEdit = (doctor: Doctor) => {
    setEditingDoctorID(doctor.id);
    setEditDoctorName(doctor.name);
    setEditEmail(doctor.email);
    setEditPhoneNumber(doctor.phone_number);
  };


  const handleSave = (doctor: Doctor) => {
    onToggle({
      ...doctor,
      name: EditDoctorName,
      email: editEmail,
      phone_number: editPhoneNumber
    });
    setEditingDoctorID(null);
    setEditDoctorName("");
    setEditEmail("");
    setEditPhoneNumber("");

  };


  const handleCancel = () => {
    setEditingDoctorID(null);
    setEditDoctorName("");
    setEditEmail("");
    setEditPhoneNumber("");
  };


  return (
    <ul>
      {doctor.map((doctor) => (
        <li key={doctor.id} style={{ marginBottom: "10px" }}>
          {editingDoctorID === doctor.id ? (

            <>
              <input
                type="text"
                value={EditDoctorName}
                onChange={(e) => setEditDoctorName(e.target.value)}
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
              <button onClick={() => handleSave(doctor)} style={{ marginRight: "5px" }}>
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
                name: {doctor.name} <br></br>
                email: {doctor.email} <br></br>
                number: {doctor.phone_number}
              </span>
              <button onClick={() => handleEdit(doctor)} style={{ marginRight: "5px" }}>
                Edit
              </button>
              <button onClick={() => onDelete(doctor.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};


export default DoctorList;
