// Only implemented create routes for now
import express from 'express';
import { 
    createRecord,
    getRecord,
    // updateRecord,
    // deleteRecord
} from '../controllers/record/index.js';
import {
    createVisit,
    // getVisit,
    // updateVisit,
    // deleteVisit,
    // getAllVisits
} from '../controllers/visit/index.js';
import {
    createSurgery,
    // getSurgery,
    // updateSurgery,
    // deleteSurgery,
    // getAllSurgeries
} from '../controllers/surgery/index.js';
import {
    createMedication,
    // getMedication,
    // updateMedication,
    // deleteMedication,
    // getAllMedications
} from '../controllers/medication/index.js';
import {
    createAllergy,
    // getAllergy,
    // getAllAllergies,
    // updateAllergy,
    // deleteAllergy
} from '../controllers/allergy/index.js';
import {
    createCondition,
    // getCondition,
    // getAllConditions,
    // updateCondition,
    // deleteCondition
} from '../controllers/condition/index.js';

const router = express.Router();

// Medical Records routes
router.post('/medical-records', createRecord);
router.get('/medical-records/:id', getRecord);
// router.put('/medical-records/:id', updateRecord);
// router.delete('/medical-records/:id', deleteRecord);

// Visit routes
router.post('/visits', createVisit);
// router.get('/visits', getAllVisits);
// router.get('/visits/:id', getVisit);
// router.put('/visits/:id', updateVisit);
// router.delete('/visits/:id', deleteVisit);

// Surgery routes
router.post('/surgeries', createSurgery);
// router.get('/surgeries', getAllSurgeries);
// router.get('/surgeries/:id', getSurgery);
// router.put('/surgeries/:id', updateSurgery);
// router.delete('/surgeries/:id', deleteSurgery);

// Medication routes
router.post('/medications', createMedication);
// router.get('/medications', getAllMedications);
// router.get('/medications/:id', getMedication);
// router.put('/medications/:id', updateMedication);
// router.delete('/medications/:id', deleteMedication);

// Allergy routes
router.post('/allergies', createAllergy);
// router.get('/allergies', getAllAllergies);
// router.get('/allergies/:id', getAllergy);
// router.put('/allergies/:id', updateAllergy);
// router.delete('/allergies/:id', deleteAllergy);

// Medical Conditions routes
router.post('/conditions', createCondition);
// router.get('/conditions', getAllConditions);
// router.get('/conditions/:id', getCondition);
// router.put('/conditions/:id', updateCondition);
// router.delete('/conditions/:id', deleteCondition);

export default router;