import React, { useState } from "react";

interface Visit {
  doctor: string;
  date: string;
  reason: string;
  complaint: string;
  symptoms: string[];
  diagnosis: string[];
  treatment_plan: string;
  medications_prescribed: Medication[];
  referrals: Referral[];
  lab_orders: LabOrder[];
  imaging_orders: ImageOrder[];
  notes: string;
  vitals: Vitals;
  duration: number;
  status: string;
  billing_status: string;
  follow_up_needed: boolean;
  follow_up_date: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface Referral {
  speciality: string;
  doctor_id: string;
  reason: string;
  priority: string;
}

interface LabOrder {
  test_name: string;
  status: string;
  results: any; // JSON
  ordered_date: string;
  completed_date: string;
}

interface ImageOrder {
  type: string;
  status: string;
  results: any; // JSON
  ordered_date: string;
  completed_date: string;
}

interface Vitals {
  heart_rate: number;
  blood_pressure: string;
  temperature: string;
  oxygen_saturation: number;
  respiratory_rate: number;
  blood_glucose: number;
  pain_level: number;
  bmi: number;
  other: any; // JSON
}

const MedicalRecord: React.FC = () => {
  const [formData, setFormData] = useState<Visit>({
    doctor: "",
    date: "",
    reason: "",
    complaint: "",
    symptoms: [],
    diagnosis: [],
    treatment_plan: "",
    medications_prescribed: [],
    referrals: [],
    lab_orders: [],
    imaging_orders: [],
    notes: "",
    vitals: {
      heart_rate: 0,
      blood_pressure: "",
      temperature: "",
      oxygen_saturation: 0,
      respiratory_rate: 0,
      blood_glucose: 0,
      pain_level: 0,
      bmi: 0,
      other: {},
    },
    duration: 0,
    status: "",
    billing_status: "",
    follow_up_needed: false,
    follow_up_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVitalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      vitals: {
        ...prevData.vitals,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Patient Visit Details</h2>
        <label className="block text-sm font-medium text-gray-700">
          Doctor
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md"
          />
        </label>
        {/* Add other fields similarly */}
      </div>

      <div>
        <h2 className="text-xl font-bold">Vitals</h2>
        <label className="block text-sm font-medium text-gray-700">
          Heart Rate
          <input
            type="number"
            name="heart_rate"
            value={formData.vitals.heart_rate}
            onChange={handleVitalsChange}
            className="block w-full mt-1 border-gray-300 rounded-md"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Blood Pressure
          <input
            type="text"
            name="blood_pressure"
            value={formData.vitals.blood_pressure}
            onChange={handleVitalsChange}
            className="block w-full mt-1 border-gray-300 rounded-md"
          />
        </label>
        {/* Add other vitals similarly */}
      </div>

      <div>
        <h2 className="text-xl font-bold">Medications</h2>
        {/* Map through medications and add fields */}
      </div>

      <div>
        <h2 className="text-xl font-bold">Referrals</h2>
        {/* Map through referrals and add fields */}
      </div>

      <div>
        <h2 className="text-xl font-bold">Additional Details</h2>
        <label className="block text-sm font-medium text-gray-700">
          Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md"
          />
        </label>
      </div>

      <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default MedicalRecord;
