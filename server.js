import express from "express";
import mongoose from "mongoose";
import Cards from "./models/Cardsdb.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import Cors from "cors";
//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://user:tNd3ihJd1M0ffYGr@cluster0.edwea.mongodb.net/BRIDGETS-BACKEND?retryWrites=true&w=majority";
//Middlewares
app.use(express.json());
app.use(Cors());
//DB config
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

//API Endpoints
app.get("/", (req, res) => res.status(200).send("test"));

app.post("/blog/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/blog/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//Listener
app.listen(port, () => console.log(`You're Connected on localhost:${port}`));

//nodemailer

var router = express.Router();
app.use("/", router);
//nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  auth: {
    user: process.env.EMAIL, //replace with the email address
    pass: process.env.EMAIL_PASS, //replace with the password
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "wesley3295@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
  };
  transporter.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
