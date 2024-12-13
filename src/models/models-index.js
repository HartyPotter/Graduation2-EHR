import Token from './token-model.js';
import Log from './log-model.js';
import Doctor from './doctor-model.js';
import Patient from './patient-model.js';


Patient.belongsToMany(Contact, { through: 'patient_contacts' });
Contact.belongsToMany(Patient, { through: 'patient_contacts' });

export { Patient, Doctor,Token, Log };