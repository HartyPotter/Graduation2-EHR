export interface EmergencyContact {
  name: string;
  phoneNumber: string;
}

export interface PatientData {
  _id: string;
  full_name: string;
  email: string;
  role: string;
  gender: string;
  birth_date: string;
  address: string;
  national_id: string;
  password: string;
  insurance_number: string;
  phone_number: string;
  contact: {
    contact_name: string;
    email: string;
    gender: string;
    relation_to_patient: string;
    address: string;
    national_id: string;
    phone_number: string;
  };
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