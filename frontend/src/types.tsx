export interface Patient{
    name: string;
    phone_number: string;
    email: string;
    id: number;
}

export interface Doctor{
    name: string;
    phone_number: string;
    email: string;
    id: number;
}

export interface Appointment{
    date_of_appointment: string;
    patient: number;
    doctor: number;
    status: string;
    id: number;
}