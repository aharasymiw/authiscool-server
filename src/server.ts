require("dotenv").config();
import express, { Express } from "express";
const cors = require('cors');
const app: Express = express();

const PORT = process.env.PORT || 5001;
const ENV = process.env.ENV;

// CORS origin can be an array, but environment varibles can't.
process.env.ORIGINS = ENV === 'dev' ? JSON.stringify(['https://localhost:5173']) : JSON.stringify(['https://authis.cool', 'https://authiscool.com', 'https://authiscool.org', 'https://authiscool.net', 'https://authiscool.dev']);

const passwordsRouter = require("./routes/passwords.router");
// const passkeysRouter = require("./routes/passkeys.router");

const corsOptions = {
  origin: JSON.parse(process.env.ORIGINS),
  optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions)) // enable pre-flight across-the-board, include before other routes
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./server/public"));

app.use("/robots.txt", express.static("./robots.txt"));

app.use("/.well-known/security.txt", express.static("./security.txt"));
app.use(
  "/security/disclosure-policy.html",
  express.static("./disclosure-policy.html"),
);
app.use(
  "/security/security-contact.html",
  express.static("./security-contact.html"),
);

app.use("/api/v1/passwords", passwordsRouter);
// app.use("/api/v1/passkeys", passkeysRouter);

if (ENV !== 'dev') {
  app.listen(PORT, () => {
    console.log(`HTTP Production Server is listening on port ${PORT}`);
  });
} else {
  const fs = require('fs');
  const https = require('https');

  const key = fs.readFileSync('./.certs/localhost_key_exp_4_19_25.pem');
  const cert = fs.readFileSync('./.certs/localhost_cert_exp_4_19_25.pem');

  const server = https.createServer({ key: key, cert: cert }, app);

  server.listen(PORT, () => {
    console.log(`HTTPS Development Server is listening on port ${PORT}`);
  });
}
