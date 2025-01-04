import Token from './token-model.js';
import Log from './log-model.js';
import Doctor from './doctor-model.js';
import Patient from './patient-model.js';
import Contact from './emergnecy-contact-model.js';
import PatientContact from './patient-contact-model.js';

// Define many-to-many relationship
Patient.belongsToMany(Contact, { through: PatientContact, foreignKey: 'patient_id' });
Contact.belongsToMany(Patient, { through: PatientContact, foreignKey: 'contact_id' });


export { Patient, Doctor, Token, Contact, PatientContact, Log };