const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.port || 5000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yannistudio4@gmail.com",
      pass: "bcaw cpsn xfyb wolg",
    },
  });
  if (!isValidEmail(req.body.email)) {
    res.send("send valid email");
  }
  const mailOption = {
    from: req.body.email,
    to: "yannistudio4@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: `the message is :${req.body.message}`,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error(error);
      res.send("error");
    } else {
      console.log("Email sent :" + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
function isValidEmail(email) {
  // Regular expression for validating an email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the email matches the regex
  return emailRegex.test(email);
}
