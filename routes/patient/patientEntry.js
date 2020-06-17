const router = require("express").Router();
let PatientEntry = require("../../models/Patient");

//route for getting an array of all patient entries
router.route('/patientEntries').get((req, res) => {
    PatientEntry
        .find()
        .then(patientEntries => res.json(patientEntries))
        .catch(err => res.status(400).json('Error: ' + err));
});

//route for getting patient's all entries by 1 entryid 
router.route('/patientEntries/:id').get((req, res) => {
    PatientEntry
        .findById(req.params.id)
        .then(patientEntries => res.json(patientEntries))
        .catch(err => res.status(400).json('Error: ' + err));
});

//route for getting entries by patient Id
router.route('/patientEntry/:id').get((req, res) => {
    PatientEntry
        .findById(req.params.id)
        .then(patientEntries => res.json(patientEntries))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patient/search/:name').get((req, res) => {
  PatientEntry
      .find({'firstName': req.params.name})
      .then(patientEntries => res.json(patientEntries))
      .catch(err => res.status(400).json('Error: ' + err));
});

//route for getting all entries of 1st patient 
router.route('/patientEntry/').get((req, res) => {
    PatientEntry
        .findOne()
        .then(patientEntries => res.json(patientEntries))
        .catch(err => res.status(400).json('Error: ' + err));
});



//File Upload Using muter
let multer = require("multer");


helpIdGenerator = () => {
  const uuidv4 = require("uuid/v4");
};
const { v4: uuidv4 } = require("uuid");
uuidv4();

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    //   cb(null, uuidv4() + '-' + fileName)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
 

});
//route to put patient symptom
router.put(
  "/patientEntry/add/:id",
  upload.single("media"),
  (req, res, next) => {
    //patient Id
    const url = req.protocol + "://" + req.get("host");
    const formElement = {
      symptom1: req.body.symptom1,
      symptom2: req.body.symptom2,
      symptom3: req.body.symptom3,
      symptom4: req.body.symptom4,
      temp: Number(req.body.temp),
      comment: req.body.comment,
      updateNote: req.body.updateNote,
      immediateAttention: req.body.immediateAttention,
      media: url + "/public/" + req.file.media,
    };
    PatientEntry.findById(req.params.id)
      .then((patientEntries) => {
        patientEntries.patientEntry.push(formElement);
        patientEntries
          .save()
          .then(() => res.json("Patient Entry Added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));

  
}
);

//update patient update note by index
router.route('/patientEntry/update/:id').put((req, res) => {
    
    //const dialogInput = {updateNote : req.body.updateNote};
    PatientEntry.findById(req.params.id)
    //PatientEntry.find({"date": req.params.date})
        .then(entry => {
            entry.patientEntry[entry.patientEntry.length-1].updateNote = req.body.updateNote;
                   entry.save()
                .then(() => res.json('Patient Entry Note Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//adds to the doctor note array in the patient cluster
router.route('/patientEntry/addDoctorNote/:id').put((req, res) => {
    PatientEntry.findById(req.params.id)
        .then(entry => {
            if(req.body.isDoctor) {
            entry.doctorNote.push(req.body.doctorNote);
            entry.save()
                .then(() => res.json('Doctor Note Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));}
            else {
                res.json("Only providers are allowed to update doctor notes")
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//retrieves all the doctor notes
router.route('/doctorNotes/:id').get((req, res) => {
    PatientEntry
        .findById(req.params.id)
        .then(patient => res.json(patient.doctorNote))
        .catch(err => res.status(400).json('Error: ' + err));
});

//updates an additional note from the patient to the patient entry
router.route('/patientEntry/addUpdateNote/:id').put((req, res) => {
    PatientEntry.findById(req.params.id)
        .then(entry => {
            entry.patientEntry[entry.patientEntry.length - 1].updateNote = req.body.updateNote;
            entry.save()
                .then(() => res.json('Doctor Note Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));}
            
        )
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
