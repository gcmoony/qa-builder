import "./config/dotenv.js";
import express from "express";
import connectDB from "./db/connect.js";
// import UserRouter from "./routes/user_router.js";
// import passport from "passport";
// import { Github } from "./config/auth.js";
import session from "express-session";
import cors from "cors";
// import AuthRouter from "./routes/auth_router.js";
import QARouter from "./routes/qas_router.js";
import http from "http";

const app = express();

// configs
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  }),
);
app.use(
  session({
    secret: "qa-builder",
    resave: false,
    saveUninitialized: true,
  }),
);

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(Github);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// routes
// app.use("/api/auth", UserRouter);
// app.use("/api/auth", AuthRouter);
app.use("/api/qas", QARouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Alive!" });
});

const port = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("listening on port", port);
      setInterval(() => {
        http
          .request(`http://localhost:${port}/`, (res) => {
            console.log("Server available");
          })
          .end();
      }, 600000);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
