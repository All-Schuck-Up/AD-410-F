const router = require('express').Router();
const auth = require('../../middleware/auth');
const PatientEntry = require('../../models/PatientEntry');
const Patient = require('../../models/Patient');
const User = require('../../models/User');

//route for getting a array of all patient entries
router.route('/patientEntries').get((req, res) => {
  PatientEntry.find()
    .then((patientEntries) => res.json(patientEntries))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//patient entry adding route
router.route('/patientEntry/add').post((req, res) => {
  const patientEmail = req.body.patientEmail;
  const form = req.body.form;
  const doctorNote = req.body.doctorNote;
  const immediateAttention = req.body.immediateAttention;

  const newPatientEntry = new PatientEntry({
    patientEmail,
    form,
    doctorNote,
    immediateAttention,
  });
  console.log('++++++++++++++++++++++++++++++++++' + newPatientEntry);
  newPatientEntry
    .save()
    .then(() => res.json('Patient Entry Added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//update route for the patient to add a note to their entry entered in last 24 hours
router.route('/patientEntry/update/:id').post((req, res) => {
  PatientEntry.findById(req.params.id)
    .then((entry) => {
      entry.form[form.size() - (1)[5]] = req.body.updatedAdditionalNote;
      entry
        .save()
        .then(() => res.json('Patient Entry Note Updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;