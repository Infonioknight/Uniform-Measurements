const express = require("express");
const databaseConnection = require("./db.js");
const cors = require("cors");
const path = require('path')
// const menTopFabricRouter = require("./src/router/menTopFabricRoutes.js");
// const adminCompanyRouter = require("./src/router/admin/companyRouter/companyRouter.js");
const userRouter = require("./src/router/userRouter.js");
const sellerRouter = require("./src/router/sellerRouter.js");
const uploadRouter = require("./src/router/uploadRouter.js")
const sizePredictorRouter = require("./src/router/sizePredictorRouter.js");
const adminRouter = require("./src/router/adminRoute.js");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const configurePassport = require('./src/config/passport')
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const scheduledJobs = require('./src/utils/scheduledJobs.js');
const tailerRouter = require("./src/router/tailerRouter.js");
const bodyMeasurementsRouter = require("./src/router/bodyMeasurementsRouter.js")
const filteredProductsRouter = require("./src/router/filteredProductsRoutes.js")

dotenv.config();

// Passport config
configurePassport(passport);

// database connection
databaseConnection();


// Middlewares setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",") || [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Express session middleware
app.use(session({
  name: 'mbmPassportToken',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  },
  // creates session in the database with cookie
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// path to our static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  // Route to reach swagger URL - "http://localhost:3001/api-docs"
// app.use("/", menTopFabricRouter)
// app.use("/", adminCompanyRouter);
app.use("/", adminRouter)
app.use("/", userRouter)
app.use("/", sellerRouter)
app.use("/", tailerRouter)
app.use("/", uploadRouter)
app.use("/", sizePredictorRouter)
app.use("/", bodyMeasurementsRouter)
app.use("/",filteredProductsRouter)
app.get('/download/employee-details-template', (req, res) => {
  // Set the appropriate headers for file download
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=employee-details-template.xlsx"
  );
  res.download("templetefile/employee-details-templete.xlsx");
});

app.get("/download/tshirts-details-template", (req, res) => {
  // Set the appropriate headers for file download
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=tshirts-details-template.xlsx"
  );
  res.download("templetefile/tshirts-details-template.xlsx");
});

app.get("/download/employee-emails-template", (req, res) => {
  // Set the appropriate headers for file download
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=employee-emails-template.xlsx"
  );
  res.download("templetefile/employee-emails.xlsx");
});

const multer = require("multer");
const fs = require("fs");
const { spawn } = require("child_process");

const upload = multer({ dest: "uploads/" });

app.post("/predict", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;

  const python = spawn("python", ["run_model.py", imagePath]);

  let result = "";
  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on("close", (code) => {
    fs.unlinkSync(imagePath); // clean up
    res.json({ output: result.trim() });
  });
});

app.listen(process.env.PORT || 3001, function () {
  console.log("Express app is running on port " + (process.env.PORT || 3001));
});
