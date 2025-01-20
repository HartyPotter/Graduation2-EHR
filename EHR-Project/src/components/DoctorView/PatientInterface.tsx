export interface EmergencyContact {
  name: string;
  phoneNumber: string;
}

export interface PatientData {
  emergencyContact: EmergencyContact;
  _id: string;
  firstName: string;
  age:number;
  lastName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  admin: string;
  appointments: any[]; // Adjust this if appointments have a specific structure
  billing: any[];      // Adjust this if billing has a specific structure
  examinations: any[]; // Adjust this if examinations have a specific structure
  createdAt: string;
  updatedAt: string;
}

export interface PatientsResponse {
  status: string;
  page: number;
  totalPages: number;
  totalPatients: number;
  data: PatientData[];
}
