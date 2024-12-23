const RecordAuthorization = {
  createRecord: {
    roles: ['doctor'],
  },
  getRecord: {
    roles: ['doctor', 'patient'],
  },
  updateRecord: {
    roles: ['doctor'],
  },
  deleteRecord: {
    roles: ['doctor'],
  },
  createVisit: {
    roles: ['doctor'],
  },
  getAllVisits: {
    roles: ['doctor', 'patient'],
  },
  getVisit: {
    roles: ['doctor', 'patient'],
  },
  updateVisit: {
    roles: ['doctor'],
  },
  deleteVisit: {
    roles: ['doctor'],
  },
  createSurgery: {
    roles: ['doctor'],
  },
  getAllSurgeries: {
    roles: ['doctor', 'patient'],
  },
  getSurgery: {
    roles: ['doctor', 'patient'],
  },
  updateSurgery: {
    roles: ['doctor'],
  },
  deleteSurgery: {
    roles: ['doctor'],
  },
  createMedication: {
    roles: ['doctor'],
  },
  getAllMedications: {
    roles: ['doctor', 'patient'],
  },
  getMedication: {
    roles: ['doctor', 'patient'],
  },
  updateMedication: {
    roles: ['doctor'],
  },
  deleteMedication: {
    roles: ['doctor'],
  },
  createAllergy: {
    roles: ['doctor'],
  },
  getAllAllergies: {
    roles: ['doctor', 'patient'],
  },
  getAllergy: {
    roles: ['doctor', 'patient'],
  },
  updateAllergy: {
    roles: ['doctor'],
  },
  deleteAllergy: {
    roles: ['doctor'],
  },
  createCondition: {
    roles: ['doctor'],
  },
  getAllConditions: {
    roles: ['doctor', 'patient'],
  },
  getCondition: {
    roles: ['doctor', 'patient'],
  },
  updateCondition: {
    roles: ['doctor'],
  },
  deleteCondition: {
    roles: ['doctor'],
  },
};

export default RecordAuthorization;
