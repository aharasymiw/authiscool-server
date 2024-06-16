require("dotenv").config();
import express, { Express } from "express";
const cors = require('cors');
const app: Express = express();

const passwordsRouter = require("./routes/passwords.router");
// const passkeysRouter = require("./routes/passkeys.router");

const PORT = process.env.PORT || 5001;
app.use(cors());
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

if (process.env.ENV !== 'dev') {
  app.listen(PORT, () => {
    console.log(`HTTP Server is listening on port ${PORT}`);
  });
} else {
  const fs = require('fs');
  const https = require('https');

  const key = fs.readFileSync('./.certs/localhost_key_exp_4_19_25.pem');
  const cert = fs.readFileSync('./.certs/localhost_cert_exp_4_19_25.pem');

  const server = https.createServer({ key: key, cert: cert }, app);

  server.listen(PORT, () => {
    console.log(`HTTPS Server is listening on port ${PORT}`);
  });
}

export { };
