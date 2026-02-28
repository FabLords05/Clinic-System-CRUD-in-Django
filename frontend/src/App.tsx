import React, { useEffect, useState } from "react";
import { Patient } from "./types";
import { getPatients, createPatients, updatePatients, deletePatients } from "./api";
import { Doctor } from "./types";
import { getDoctors, createDoctors, updateDoctors, deleteDoctors } from "./api";
import { Appointment } from "./types";
import { getAppointments, createAppointments, updateAppointments, deleteAppointments } from "./api"; 
import PatientList from "./component/PatientList";
import DoctorList from "./component/DoctorList";
import AppointmentList from "./component/AppointmentList";

const App: React.FC = () => {
  // Patient State
  const [patients, setPatients] = useState<Patient[]>([]);
  // (Removed patientName, phoneNumber, and email states since PatientList handles them now)

  // Doctor State
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorName, setDoctorName] = useState<string>("");
  const [doctorPhoneNumber, setDoctorPhoneNumber] = useState<string>("");
  const [doctorEmail, setDoctorEmail] = useState<string>("");

  // Appointment State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentPatient, setAppointmentPatient] = useState<string>("");
  const [appointmentDoctor, setAppointmentDoctor] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentStatus, setAppointmentStatus] = useState<string>("Pending");

  // Fetch Patients
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Handle Patient Creation (Updated to accept data from PatientList)
  const handleCreatePatient = async (newPatient: { name: string; email: string; phone_number: string }) => {
    try {
      await createPatients(newPatient);
      fetchPatients();
    } catch (error) {
      console.error("Error creating patient", error);
    }
  };

  // Handle Doctor Creation
  const handleCreateDoctor = async () => {
    try {
      await createDoctors({ name: doctorName, phone_number: doctorPhoneNumber, email: doctorEmail });
      setDoctorName("");
      setDoctorPhoneNumber("");
      setDoctorEmail("");
      fetchDoctors();
    } catch (error) {
      console.error("Error creating doctor", error);
    }
  };

  // Handle Appointment Creation
  const handleCreateAppointment = async () => {
    try {
      await createAppointments({ 
        date_of_appointment: appointmentDate, 
        patient: appointmentPatient, 
        doctor: appointmentDoctor, 
        status: appointmentStatus 
      });
      setAppointmentPatient("");
      setAppointmentDoctor("");
      setAppointmentDate("");
      setAppointmentStatus("Pending");
      fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment", error);
    }
  };

  // Handle Patient Update
  const handleTogglePatient = async (patient: Patient) => {
    try {
      await updatePatients(patient.id, {
        name: patient.name,
        phone_number: patient.phone_number,
        email: patient.email,
      });
      fetchPatients();
    } catch (error) {
      console.error("Error updating patient", error);
    }
  };

  // Handle Doctor Update
  const handleToggleDoctor = async (doctor: Doctor) => {
    try {
      await updateDoctors(doctor.id, {
        name: doctor.name,
        phone_number: doctor.phone_number,
        email: doctor.email,
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error updating doctor", error);
    }
  };

  // Handle Appointment Update
  const handleToggleAppointment = async (appointment: Appointment) => {
    try {
      await updateAppointments(appointment.id, {
        date_of_appointment: appointment.date_of_appointment,
        patient: appointment.patient,
        doctor: appointment.doctor,
        status: appointment.status,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  // Handle Appointment Delete
  const handleDeleteAppointment = async (id: number) => {
    try {
      await deleteAppointments(id);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
  };

  // Handle Patient Delete
  const handleDeletePatient = async (id: number) => {
    try {
      await deletePatients(id);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };

  // Handle Doctor Delete
  const handleDeleteDoctor = async (id: number) => {
    try {
      await deleteDoctors(id);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor", error);
    }
  };

  // Notice how the max-width is removed here to allow the modern design to breathe
  return (
    <div style={{ padding: "40px", margin: "0 auto", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      
      {/* The modern Patient List with the integrated form */}
      <PatientList 
        patients={patients} 
        onToggle={handleTogglePatient} 
        onDelete={handleDeletePatient} 
        onAddPatient={handleCreatePatient} 
      />

      {/* --- OLDER SECTIONS BELOW --- */}
      <div style={{ maxWidth: "500px", margin: "40px auto 0" }}>
        <h2>Doctor CRUD (TypeScript)</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={doctorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDoctorName(e.target.value)}
            placeholder="Enter Doctor Name..."
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            value={doctorPhoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDoctorPhoneNumber(e.target.value)}
            placeholder="Enter Doctor Phone Number..."
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            value={doctorEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDoctorEmail(e.target.value)}
            placeholder="Enter Doctor Email..."
            style={{ marginRight: "10px" }}
          />
          <button onClick={handleCreateDoctor}>Add Doctor</button>
        </div>

        <DoctorList doctor={doctors} onToggle={handleToggleDoctor} onDelete={handleDeleteDoctor} />

        <h2 style={{ marginTop: "40px" }}>Appointment CRUD (TypeScript)</h2>
        <div style={{ marginBottom: "20px" }}>
          {/* Patient Dropdown */}
          <select
            value={appointmentPatient}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAppointmentPatient(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>

          {/* Doctor Dropdown */}
          <select
            value={appointmentDoctor}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAppointmentDoctor(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={appointmentDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppointmentDate(e.target.value)}
            style={{ marginRight: "10px" }}
          />

          {/* Status Dropdown */}
          <select
            value={appointmentStatus}
            onChange={(e) => setAppointmentStatus(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>

          <button onClick={handleCreateAppointment}>Add Appointment</button>
        </div>

        <AppointmentList appointments={appointments} onToggle={() => {}} onDelete={() => {}} />
      </div>
    </div>
  );
};

export default App;