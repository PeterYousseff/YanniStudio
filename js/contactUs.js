const firebaseConfig = {
  apiKey: "AIzaSyAOfGQpa0Jd4RhSehHwpsKBSSc4maBE050",
  authDomain: "windy-raceway-435310-t7.firebaseapp.com",
  databaseURL: "https://windy-raceway-435310-t7-default-rtdb.firebaseio.com",
  projectId: "windy-raceway-435310-t7",
  storageBucket: "windy-raceway-435310-t7.appspot.com",
  messagingSenderId: "870157095764",
  appId: "1:870157095764:web:2c5a7cdcbd6d52bcdbaec1",
  measurementId: "G-B87PPFPCC2",
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("yannistudioContactForm");

document.getElementById("yannistudioContactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var subject = getElementVal("subject");
  var message = getElementVal("message");

  saveMessage(name, email, subject, message);
}

const saveMessage = (name, email, subject, message) => {
  var newContactForm = contactFormDB.push();

  // Get formatted date and time
  var timestamp = formatDateTime(new Date());

  newContactForm.set({
    name: name,
    email: email,
    subject: subject,
    message: message,
    timestamp: timestamp, // Add formatted timestamp here
  })
  .then(() => {
    // Show success alert
    alert("Message sent successfully!");
  })
  .catch((error) => {
    // Show error alert
    alert("Error sending message: " + error.message);
  });
};

const formatDateTime = (date) => {
  // Format date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Format time
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Adjust hours for 12-hour format

  return `date: ${day}/${month}/${year}, time: ${hours}:${minutes} ${period}`;
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
