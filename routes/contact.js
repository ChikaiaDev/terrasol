const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.post('/send', async (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>${req.body.fname}</li>
        <li>${req.body.lname}</li>
        <li>${req.body.number}</li>
        <li>${req.body.email}</li>
    </ul>
    <h3>${req.body.message}</h3>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ian.chikaia@gmail.com', // generated ethereal user
            pass: 'Mseewa#95', // generated ethereal password
        },
        tls: {
            rejectInauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: req.body.email, // sender address
        to: "ian.chikaia@gmail.com, ian.chikaia@gmail.com", // list of receivers
        subject: "New  Contact", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body

    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.render("/jobs/index", {
        msg: 'Email has been sent',
    });

});

module.exports = router;