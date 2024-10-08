// Initialize EmailJS with your Service ID and Template ID
emailjs.init('fYB0wZsfTQmZugVhF');

// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent form from submitting

    // Fetch form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Use EmailJS to send the email
    emailjs.send('service_0lxn1g9', 'template_kcf4xcr', {
        from_name: name,
        reply_to: email,
        message: message
    })
    .then(function(response) {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset(); // Reset form after successful submission
    }, function(error) {
        alert('Failed to send message. Please try again later.');
    });
}

// Attach sendEmail function to form submit event
document.getElementById('contactForm').addEventListener('submit', sendEmail);
