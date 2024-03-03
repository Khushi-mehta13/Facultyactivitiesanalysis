const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Hackthon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User1 schema
const user1Schema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create User1 model
const User1 = mongoose.model('User1', user1Schema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mehtakhushim@gmail.com',
    pass: 'hqnu anwo chzp emvb',
  }
});

// Function to send registration email
async function sendRegistrationEmail(email, username, password) {
  try {
    console.log("entred scuessfully");
    const mailOptions = {
      from: 'mehtakhushim@gmail.com',
      to: email,
      subject: 'Registration Successful',
      html: `
        <h1>Welcome to our platform!</h1>
        <p>Your account has been successfully registered.</p>
        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
        <p>Please keep your credentials secure.</p>
      `
    };
    console.log("message scuessfull");
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw new Error('Failed to send registration email');
  }
}

// Define User schema
const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  user_image: String,
  education: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: Number, required: true },
  position: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Create User model
const User = mongoose.model('User', userSchema);

// Define Hodregister schema
const hodRegisterSchema = new mongoose.Schema({
  hod_id: { type: Number, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  user_image: String,
  education: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: Number, required: true },
  position: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Create Hodregister model
const Hodregister = mongoose.model('Hodregister', hodRegisterSchema);

// Define Workshop schema
const workshopSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  title: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  report: { type: String, required: true },
});

// Create Workshop model
const Workshop = mongoose.model('Workshop', workshopSchema);

// Define Mentorship schema
const mentorshipSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: { type: String, required: true },
  Studentsnames: { type: Array, required: true }
});

// Create Mentorship model
const Mentorship = mongoose.model('Mentorship', mentorshipSchema);

// Define Committee schema
const committeeSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  title: { type: String, required: true },
  description_Of_Role: { type: String, required: true },
  time_given: { type: String, required: true },
  Position: { type: String, required: true },
  Proof: { type: String, required: true }
});

// Create Committee model
const Committee = mongoose.model('Committee', committeeSchema);

// Define Publication schema
const publicationSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  type: { type: String, required: true }, // conference, journal, book chapter, ISBN/ISNN
  Title: { type: String, required: true },
  Total_Students: { type: String, required: true },
  Proof: { type: String, required: true },
  Description: { type: String, required: true },
  Date: { type: Date, required: true }
});

// Create Publication model
const Publication = mongoose.model('Publication', publicationSchema);

// Define Event schema
const eventSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  Type: { type: String, required: true }, // Industry_Visit, Fest_Event
  Title: { type: String, required: true },
  ToDate: { type: Date, required: true },
  fromDate: { type: Date, required: true },
  Position: { type: String, required: true },
  Report: { type: String, required: true },
  Location: { type: String, required: true }
});

// Create Event model
const Event = mongoose.model('Event', eventSchema);

// Define Certificate schema
const CertificateSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  Title: { type: String, required: true },
  proof: { type: String, required: true },
});

// Create Certificate model
const Certificate = mongoose.model('Certificate', CertificateSchema);

// Define Faculty Meeting schema
const facultyMeetingSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  Type: { type: String, required: true }, // Industry_Visit, Fest_Event
  Title: { type: String, required: true },
  ToDate: { type: Date, required: true },
  fromDate: { type: Date, required: true },
  Position: { type: String, required: true },
  Report: { type: String, required: true },
  Location: { type: String, required: true }
});

// Create Faculty Meeting model
const FacultyMeeting = mongoose.model('FacultyMeeting', facultyMeetingSchema);

// Define Hod Rights schema
const hodRightsSchema = new mongoose.Schema({
  hod_id: { type: Number, unique: true },
  subjects: [{
    name: { type: String, required: true },
    code: { type: String, required: true },
    credits: { type: Number, required: true },
    class: { type: String, required: true }
  }],
  Faculty: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  role: { type: String, required: true }
});
// Create Hod Rights model
const HodRights = mongoose.model('HodRights', hodRightsSchema);

//Define Schema for course Preparation Schema 
const coursePreparationSchema = new mongoose.Schema({
    facultyName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    shortSubjectName: { type: String, required: true },
    totalUnits: { type: Number, required: true },
    totalHours: { type: Number, required: true },
    totalPracticals: { type: Number, required: true },
    totalHoursPractical: { type: Number, required: true },
    units: [{
        unitName: { type: String, required: true },
        description: { type: String, required: true },
        hours: { type: Number, required: true }
    }],
    practicals: [{
        practicalsName: { type: String, required: true },
        description: { type: String, required: true },
        hours: { type: Number, required: true }
    }]
});
//Create course preparation model
const CoursePreparation = mongoose.model('CoursePreparation', coursePreparationSchema);


//Define Facultyactivite Entry Schema
const FacultyactiviteSchema = new mongoose.Schema({
    user_id :String,
    activities: Object
});
//Create course preparation model
const Facultyactivite = mongoose.model('Facultyactivite', FacultyactiviteSchema);

// Define Timetable Entry schema
const timetableEntrySchema = new mongoose.Schema({
  dayOfWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subject: { type: String, required: true },
  subjectCode: { type: String, required: true },
  faculty: { type: String, required: true },
  location: { type: String, required: true },
  credits: { type: Number, required: true }
});

// Define Timetable schema
const timetableSchema = new mongoose.Schema({
  department: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  entries: [timetableEntrySchema]
});

// Create Timetable model
const Timetable = mongoose.model('Timetable', timetableSchema);

// Auto-increment user_id
async function autoIncrement(schemaName, field) {
  const model = mongoose.model(schemaName);
  const count = await model.countDocuments({});
  this[field] = count + 1;
}

userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    await autoIncrement.call(this, 'User', 'user_id');
    next();
  } catch (error) {
    return next(error);
  }
});

// Define your API routes here

app.get('/', (req, res) => {
  res.send("Server is running on port 5000");
});

app.post('/register', async (req, res) => {
    try {
        // Extract user data from the request body
        const userData = req.body;
        // Create a new user instance
        const newUser = new User(userData);
        // Save the new user to the database
        await newUser.save();
        console.log(req.body);
        res.json(newUser); // Send the created user in the response
    } catch (error) {
        res.json({ error: error.message }); // Handle validation or database errors
    }
});
app.post('/facultyactivite', async (req, res) => {
    try {
      // Create a new Facultyactivite instance
      const newFacultyactivite = new Facultyactivite(req.body);
      await newFacultyactivite.save();
      console.log(req.body);
      res.json({ message: "Facultyactivite entry created successfully", facultyactiviteEntry: newFacultyactivite });
    } catch (error) {
      // If there's an error, send an error response
      res.json({ error: error.message });
    }
  });
  app.get('/activities', async (req, res) => {
    try {
        const { user_id } = req.query;

        // Check if user_id is provided
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch faculty activities based on user_id
        const activities = await Facultyactivite.find({ user_id });
        if (activities.length === 0) {
            return res.json({ message: "No activities found for this user" });
        }

        // Return activities in the response
        res.json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.json({ error: "Internal Server Error" });
    }
});
// Define the FacultyProblem schema
const facultyProblemSchema = new mongoose.Schema({
    user_id: { type: String, required: true }, // User ID of the faculty member reporting the problem
    problem: { type: String, required: true }, // Description of the problem reported
    Date: { type: Date, default: Date.now } // Timestamp for when the problem was reported
});
// Create the FacultyProblem model
const FacultyProblem = mongoose.model('FacultyProblem', facultyProblemSchema);

//subject
var subjectSchema = new mongoose.Schema({
    nameOfDepartment: String,
    nameOfSubject: String,
    semester: String,
    credit: String,
  });
var Subject = mongoose.model("subject", subjectSchema);


// Define the hodrights
app.post('/hodRights', async (req, res) => {
    try {
        // Extract required fields from the request body
        const { name, code, credits, class: className } = req.body;

        // Create a new HodRights document
        const newHodRights = new HodRights({
            subject: { name, code, credits, class: className },
            Faculty: req.body.Faculty,
            year: req.body.year,
            semester: req.body.semester,
            role: req.body.role
        });

        // Save the HodRights document to the database
        await newHodRights.save();

        // Send a success response
        res.json({ message: "Hod Rights created successfully", hodRights: newHodRights });
    } catch (error) {
        // Send an error response if something went wrong
        res.json({ error: error.message });
    }
});

app.post('/mentorship', async (req, res) => {
    try { 
        const { user_id, date, time, category, Studentsnames } = req.body;
        const newMentorship = new Mentorship({ user_id, date, time, category, Studentsnames });
        await newMentorship.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        console.error("Error saving mentorship:", error);
        res.json({ error: error.message });
    }
});
app.post("/allsubjects", async (req, res) => {
    try {
      console.log(req.body)
      let result = await Subject(req.body).save();
      console.log(result);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });

// Define the Allocation schema
const allocationSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    semester: { type: String, required: true },
    class: { type: String, required: true },
    facultyName: { type: String, required: true }
});

// Create the Allocation model
const Allocation = mongoose.model('Allocation', allocationSchema);

// GET API to retrieve all subjects and create allocations
app.get('/allocationsubject', async (req, res) => {
    try {
        // Retrieve all subjects
        const subjects = await Subject.find();

        // Process each subject and create allocations
        const allocations = [];
        subjects.forEach(subject => {
            // Extract semester and class information from the subject
            const { semester, class: className } = subject;

            // You can extract faculty name from wherever it's stored in your system
            const facultyName = "Faculty Name"; // Replace this with actual faculty name

            // Create an allocation object
            const allocation = new Allocation({
                subjectName: subject.name,
                semester,
                class: className,
                facultyName
            });

            // Add the allocation to the list
            allocations.push(allocation.save());
        });

        // Wait for all allocations to be saved
        await Promise.all(allocations);

        // Send success response
        res.json({ message: 'Allocations created successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});
// POST API to report a problem
app.post('/reportproblem', async (req, res) => {
    try {
        // Extract data from the request body
        const { user_id, problem,date} = req.body;

        // Create a new instance of FacultyProblem
        const newProblem = new FacultyProblem({
            user_id,
            problem,
            date
        });

        // Save the new problem report to the database
        const savedProblem = await newProblem.save();

        // Send a success response
        res.json(savedProblem);
    } catch (error) {
        // Send an error response if there's an issue
        res.status(500).json({ error: error.message });
    }
});

// GET API to retrieve all problems
app.get('/problems', async (req, res) => {
    try {
        // Retrieve all problems from the database
        const problems = await FacultyProblem.find();

        // Send the list of problems in the response
        res.json(problems);
    } catch (error) {
        // Send an error response if there's an issue
        res.status(500).json({ error: error.message });
    }
});
app.post('/course-preparation', async (req, res) => {
    try {
        const coursePreparation = await CoursePreparation.create(req.body);
        res.json(coursePreparation);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.get('/course-preparation/:id',async(req,res)=>{
     try {
        const coursePreparation = await CoursePreparation.findById(req.params.id);
        if (!coursePreparation) {
            return res.json({ error: 'Course preparation not found' });
        }
        res.json(coursePreparation);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.post('/timetable', async (req, res) => {
    try {
        const { department, year, semester, entries } = req.body;

        // Create the timetable entry
        const timetable = await Timetable.create({ department, year, semester, entries });

        res.json(timetable);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.get('/timetable/:department/:year/:semester', async (req, res) => {
    try {
        const { department, year, semester } = req.params;

        // Find timetable entries for the specified department, year, and semester
        const timetable = await Timetable.findOne({ department, year, semester });

        if (!timetable) {
            return res.json({ error: 'Timetable not found' });
        }

        res.json(timetable.entries);
    } catch (error) {
        res.json({ error: error.message });
    }
});app.put('/timetable/:department/:year/:semester/:entryId', async (req, res) => {
    try {
        const { department, year, semester, entryId } = req.params;
        const { dayOfWeek, startTime, endTime, subject, subjectCode, faculty, location, credits } = req.body;

        // Find the timetable entry to update
        const timetable = await Timetable.findOneAndUpdate(
            { department, year, semester, 'entries._id': entryId },
            {
                $set: {
                    'entries.$.dayOfWeek': dayOfWeek,
                    'entries.$.startTime': startTime,
                    'entries.$.endTime': endTime,
                    'entries.$.subject': subject,
                    'entries.$.subjectCode': subjectCode,
                    'entries.$.faculty': faculty,
                    'entries.$.location': location,
                    'entries.$.credits': credits
                }
            },
            { new: true }
        );

        res.json(timetable);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.delete('/timetable/:department/:year/:semester/:entryId', async (req, res) => {
    try {
        const { department, year, semester, entryId } = req.params;

        // Find and remove the timetable entry
        const timetable = await Timetable.findOneAndUpdate(
            { department, year, semester },
            { $pull: { entries: { _id: entryId } } },
            { new: true }
        );

        res.json(timetable);
    } catch (error) {
        res.json({ error: error.message });
    }
});


app.post('/workshop', async (req, res) => {
    try {
        const { user_id, venue, date, time, Report, title } = req.body;
        const newWorkshop = new Work({ user_id,  venue, date, time, Report, title });
        await newWorkshop.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});

//api of committe
app.post('/committee', async (req, res) => {
    try {
        const { user_id, title, description_Of_Role, time_given, Position, Proof } = req.body;
        const newCommittee = new Committee({ user_id, title, description_Of_Role, time_given, Position, Proof });
        await newCommittee.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.post('/hodregister', async (req, res) => {
    try {
        // Retrieve data from users collection where position is 'Hod'
        const hodData = await User.find({ position: 'HOD' });

        // Check if any Hod data was found
        if (!hodData || hodData.length === 0) {
            return res.json({ error: "No Hod found" });
        }

        // Modify the user_id field to hod_id and store in Hodregister collection
        const hodRegisterData = hodData.map(hod => ({
            hod_id: hod.user_id,
            firstname:hod.firstname,
            lastname: hod.lastname,
            user_image: hod.user_image,
            education: hod.education,
            experience: hod.experience,
            email: hod.email,
            contact_no: hod.contact_no,
            position: hod.position,
            username:hod.username,
            password: hod.password
        }));

        // Store the modified Hod data in the Hodregister collection
        await Hodregister.insertMany(hodRegisterData);

        res.json({ message: "Hod data registered successfully" });
    } catch (error) {
        // Handle any errors that occur during the process
        res.json({ error: error.message });
    }
});

app.get('/hodregister/:hod_id', async (req, res) => {
    try {
        const { hod_id } = req.params;

        // Find the Hod data based on hod_id
        const hodData = await Hodregister.findOne({ hod_id });

        // Check if Hod data was found
        if (!hodData) {
            return res.status(404).json({ error: "Hod not found" });
        }

        res.json(hodData); // Send the Hod data in the response
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error fetching Hod data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API Route for login
app.post('/login', async (req, res) => {
    try {
      console.log(req.body);
      // Assuming you have a User model
      const user = await User.find(req.body);
        console.log(user)
      if (user.length == 0) {
        return res.json({ error: "User not found" });
      }
      else{
          res.json({ userid:user[0].user_id});
          console.log(user);
        }
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  

//API for Publication
app.post('/publication', async (req, res) => {
    try {
        // Extract data from request body
        const { user_id, type, Title, Total_Students, Proof, Description, Date } = req.body;
        const newPublication = new Publication({ user_id, type, Title, Total_Students, Proof, Description, Date });
        await newPublication.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});

//API for Event
app.post('/event', async (req, res) => {
    try {
        const { user_id, Type, Title, ToDate, fromDate, Position, Report, Location } = req.body;
        const newEvent = new Event({ user_id, Type, Title, ToDate, fromDate, Position, Report, Location });
        await newEvent.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});

//API for Certificate
app.post('/certificate', async (req, res) => {
    try {
        const { user_id, Title, proof } = req.body;
        const newCertificate = new Certificate({ user_id, Title, proof });
        await newCertificate.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});

//Api for Faculty-Meeting
app.post('/faculty-meeting', async (req, res) => {
    try {
        const { user_id, Type, Title, ToDate, fromDate, Position, Report, Location } = req.body;
        const newFacultyMeeting = new FacultyMeeting({ user_id, Type, Title, ToDate, fromDate, Position, Report, Location });
        await newFacultyMeeting.save();
        res.json({ user_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});
//adpi for hodrights
app.post('/hodrights', async (req, res) => {
    try {

        const { subject_id, subject_code, class: className, Faculty, year, semester, credits } = req.body;


        const hod_id = await autoIncrement('HodRights', 'hod_id');

        const newHodRights = new HodRights({ hod_id, subject_id, subject_code, class: className, Faculty, year, semester, credits });

        await newHodRights.save();
        res.json({ hod_id: newUser._id });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get('/user-data', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        // Find user data based on user_id and project specific fields
        const userData = await User.findOne({ user_id }, { username:1,  contact_no: 1, position: 1 });
        if (!userData) {
            return res.json({ error: "User not found" });
        }

        res.json(userData);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.get('/facultydetails', async (req, res) => {
    try {
        const facultyList = await User.find();

        if (!facultyList || facultyList.length === 0) {
            return res.json({ error: "No faculty found" });
        }

        res.json(facultyList);
    } catch (error) {
        res.json({ error: error.message });
    }
});


app.get('/userfulldata', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        // Find user data based on user_id and project specific fields
        const userData = await User.find({ user_id },{ username:1, user_image:1, education:1, experience:1, email:1, contact_no:1, position:1});
        if (!userData) {
            return res.json({ error: "User not found" });
        }

        res.json(userData);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get('/workshops', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const workshops = await Work.find({ user_id }, { subject_id: 1, venue: 1, date: 1, time: 1, Report: 1, title: 1 });

        if (!workshops || workshops.length === 0) {
            return res.json({ error: "Workshops not found for the provided user_id" });
        }

        res.json(workshops);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get('/mentorships', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const mentorships = await Mentorship.find({ user_id }, { date: 1, time: 1, category: 1, Studentsnames: 1 });

        if (!mentorships || mentorships.length === 0) {
            return res.json({ error: "Mentorships not found for the provided user_id" });
        }

        res.json(mentorships);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get('/committees', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const committees = await Committee.find({ user_id }, { title: 1, description_Of_Role: 1, time_given: 1, Position: 1, Proof: 1 });

        if (!committees || committees.length === 0) {
            return res.json({ error: "Committees not found for the provided user_id" });
        }

        res.json(committees);
     } catch (error) {
        res.json({ error: error.message });
    }
});
app.get('/publications', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const publications = await Publication.find({ user_id }, { type: 1, Title: 1, Total_Students: 1, Proof: 1, Description: 1, Date: 1 });

        if (!publications || publications.length === 0) {
            return res.json({ error: "Publications not found for the provided user_id" });
        }

        res.json(publications);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.get('/events', async (req, res) => {
    try {
        const { user_id } = req.query.params;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const events = await Event.find({ user_id }, { Type: 1, Title: 1, ToDate: 1, fromDate: 1, Position: 1, Report: 1, Location: 1 });

        if (!events || events.length === 0) {
            return res.json({ error: "Events not found for the provided user_id" });
        }

        res.json(events);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get('/certificates', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const certificates = await Certificate.find({ user_id }, { Title: 1, proof: 1 });

        if (!certificates || certificates.length === 0) {
            return res.json({ error: "Certificates not found for the provided user_id" });
        }

        res.json(certificates);
    } catch (error) {
        res.json({ error: error.message });
    }
});
app.get('/faculty-meetings', async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.json({ error: "user_id parameter is required" });
        }

        const facultyMeetings = await FacultyMeeting.find({ user_id }, { Type: 1, Title: 1, ToDate: 1, fromDate: 1, Position: 1, Report: 1, Location: 1 });

        if (!facultyMeetings || facultyMeetings.length === 0) {
            return res.json({ error: "Faculty Meetings not found for the provided user_id" });
        }

        res.json(facultyMeetings);
    } catch (error) {
        res.json({ error: error.message });
    }
});
// Update user data by user_id
app.put('/userfulldata/:user_id', async (req, res) => {
    const { user_id } = req.params; // Extract the user_id from the request parameters
    const userData = req.body; // Extract the updated user data from the request body

    try {
        // Dynamically construct the update object
        const updateFields = {};
        for (const key in userData) {
            if (userData[key] !== '') { // Check if the field is not empty
                updateFields[key] = userData[key]; // Add the field to the update object
            }
        }

        // Find the user by user_id and update the data
        const updatedUser = await User.findOneAndUpdate(
            { user_id },
            { $set: updateFields }, // Update user data
            { new: true } // Return the updated document
        );

        // Check if the user exists and send the updated user data in the response
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle errors
        res.json({ error: error.message });
    }
});

// Define the route to generate the combined report based on user_id
app.get('/generateReport', async (req, res) => {
    try {
        const { user_id } = req.query;

        // Check if user_id is provided
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch user details based on user_id
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const username = `${user.firstname} ${user.lastname}`;

        let report = `Combined Report for User: ${username}\n\n`;

        report += `Education: ${user.education}\n`;
        report += `Experience: ${user.experience}\n`;
        report += `Email: ${user.email}\n`;
        report += `Contact Number: ${user.contact_no}\n`;
        report += `Position: ${user.position}\n`;

        // Fetch faculty activities based on user_id
        const activities = await Facultyactivite.find({ user_id });
        if (activities.length === 0) {
            report += "No activities found for this user.";
        } else {
            report += "\nFaculty :";
            activities.forEach((activity, index) => {
                report += `Activities: ${JSON.stringify(activity.activities)}\n\n`;
            });
        }

        // Calculate scores for each activity based on predefined criteria
        let totalScore = 0;
        activities.forEach(activity => {
            switch (activity.activities['Sub Category']) {
                case 'Workshop':
                    totalScore += 15;
                    break;
                case 'Publication':
                    totalScore += 30;
                    break;
                case 'Committee':
                    totalScore += 10;
                    break;
                case 'Event':
                    totalScore += 15; 
                    break;
                case 'Course Preparation':
                    totalScore += 10;
                    break;
                case 'Conference':
                    totalScore += 20;
                    break;
                case 'Faculty Meeting':
                    totalScore += 10;
                    break;
                case 'Certificate':
                    totalScore += 10;
                    break;
                case 'Mentorship':
                    totalScore += 20;
                    break;
                case 'Industrial Vists':
                    totalScore += 30;
                    break;
                default:
                    // If the activity type doesn't match any predefined criteria, score remains 0
                    break;
            }
        });

        report += `Total Score: ${totalScore}\n`;

        // Set response headers for file download
        res.setHeader('Content-disposition', 'attachment; filename=report.txt');
        res.setHeader('Content-type', 'text/plain');

        // Send the report as the response
        res.send(report);
    } catch (error) {
        console.error("Error generating report:", error);
        res.send("Error generating report");
    }
});

app.get('/score', async (req, res) => {
    try {
        const { user_id } = req.query;

        // Check if user_id is provided
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Retrieve faculty activities for the specified user_id from the database
        const activities = await Facultyactivite.find({ user_id });

        // Calculate total score based on predefined criteria
        let totalScore = 0;
        activities.forEach(activity => {
            switch (activity.activities['Sub Category']) {
                case 'Workshop':
                    totalScore += 15;
                    break;
                case 'Publication':
                    totalScore += 30;
                    break;
                case 'Committee':
                    totalScore += 10;
                    break;
                case 'Event':
                    totalScore += 15; 
                    break;
                case 'Course Preparation':
                    totalScore += 10;
                    break;
                case 'Conference':
                    totalScore += 20;
                    break;
                case 'Faculty Meeting':
                    totalScore += 10;
                    break;
                case 'Certificate':
                    totalScore += 10;
                    break;
                case 'Mentorship':
                    totalScore += 20;
                    break;
                case 'Industrial Vists':
                    totalScore += 30;
                    break;
                default:
                    // If the activity type doesn't match any predefined criteria, score remains 0
                    break;
            }
        });

        // Return the total score in the response
        res.json({ user_id, totalScore });
    } catch (error) {
        // Handle errors
        console.error("Error calculating score:", error);
        res.json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
