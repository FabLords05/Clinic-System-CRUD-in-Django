import axios from "axios";
import { Patient } from "./types";
import { Doctor } from "./types";
import { Appointment } from "./types";


// Axios instance for patients
const apiPatients = axios.create({
  baseURL: "http://127.0.0.1:8000/api/patients/",
});

// Axios instance for doctors
const apiDoctors = axios.create({
  baseURL: "http://127.0.0.1:8000/api/doctors/",
});
// Axios instance for appointments
const apiAppointments = axios.create({
  baseURL: "http://127.0.0.1:8000/api/appointments/",
});

export { apiPatients, apiDoctors, apiAppointments };




export const getPatients = async (): Promise<Patient[]> => {
  const response = await apiPatients.get<Patient[]>('');
  return response.data;
};


export const createPatients = async (data:
    { name: string; phone_number: string; email: string
   
}): Promise<Patient> => {
  const response = await apiPatients.post<Patient>('', data);
  return response.data;
};


export const updatePatients = async (
  id: number,
  data: Partial<Patient>
): Promise<Patient> => {
  const response = await apiPatients.put<Patient>(`${id}/`, data);
  return response.data;
};


export const deletePatients = async (id: number): Promise<void> => {
  await apiPatients.delete(`${id}/`);
};


// Doctor API functions
export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await apiDoctors.get<Doctor[]>('');
  return response.data;
};

export const createDoctors = async (data:
    { name: string; phone_number: string; email: string
   
}): Promise<Doctor> => {
  const response = await apiDoctors.post<Doctor>('', data);
  return response.data;
};


export const updateDoctors = async (
  id: number,
  data: Partial<Doctor>
): Promise<Doctor> => {
  const response = await apiDoctors.put<Doctor>(`${id}/`, data);
  return response.data;
};


export const deleteDoctors = async (id: number): Promise<void> => {
  await apiDoctors.delete(`${id}/`);
};

// Appointment API functions
export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await apiAppointments.get<Appointment[]>('');
  return response.data;
}

export const createAppointments = async (data:
    { date_of_appointment: string; patient: string; doctor: string; status: string }
): Promise<Appointment> => {
  const response = await apiAppointments.post<Appointment>('', data);
  return response.data;
};

export const updateAppointments = async (
    
  id: number,
  data: Partial<Appointment>
): Promise<Appointment> => {
  const response = await apiAppointments.put<Appointment>(`${id}/`, data);
  return response.data;
};

export const deleteAppointments = async (id: number): Promise<void> => {
  await apiAppointments.delete(`${id}/`);
};