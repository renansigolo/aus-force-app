const functions = require("firebase-functions")
const { initializeApp } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const { defineSecret } = require("firebase-functions/params")
const { onRequest } = require("firebase-functions/v2/https")
const nodemailer = require("nodemailer")

initializeApp()

const db = getFirestore()

const gmailUser = defineSecret("GMAIL_USER")
const gmailPass = defineSecret("GMAIL_PASS")

/**
 * Save the email address from the Pre Registration form on the website to Firestore
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
exports.registerInterest = onRequest({ cors: true }, (req, res) =>
  db
    .collection("registered-interest")
    .doc()
    .set({ email: req.body.email })
    .then(() => res.send("Email saved"))
    .catch((err) => res.status(500).send(err)),
)

/** Send an email with the details from the Contact Form on the website */
exports.sendEmail = functions
  .runWith({ secrets: [gmailUser, gmailPass] })
  .firestore.document("registered-interest/{id}")
  .onCreate((snap) => {
    const docData = snap.data()

    const gmailTransporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser.value(),
        pass: gmailPass.value(),
      },
    })

    const mailOptions = {
      from: "AUS Force <support@ausforce.com>",
      replyTo: "support@ausforce.com",
      to: docData.email,
      subject: "AUS Force Website | Pre Registration",
      html: `
        <h2>Pre Registration</h2>
        <p>Thank you for your interest in AUS Force.</p>
        <p>We will be in touch soon.</p>
        <br />
        <p>Best Regards,</p>
        <p>AUS Force team</p>
        `,
    }

    return gmailTransporter.sendMail(mailOptions, (err) =>
      err ? res.status(500).send(err) : res.status(200).send({ message: "success" }),
    )
  })
