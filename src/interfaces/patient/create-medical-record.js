import axios from 'axios';

export async function createMedicalRecord(medicalRecord) {
    try {
        const response = await axios.post(
        // 'http://patient-records-service.default.svc.cluster.local:80/api/patient/medical-records',
        'http://localhost:3001/api/records/patient/medical-records',
        medicalRecord
        );
        if (response.status === 201) return true;
        console.log('Medical record created:', response.data);
      } catch (error) {
        console.error('Error creating medical record:', error.message);
      }
}