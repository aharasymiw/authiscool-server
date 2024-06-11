// import express, { Request, Response } from "express";
// const router = express.Router();
// const pool = require("../modules/pool.js");
// const { generateRegistrationOptions, verifyRegistrationResponse } = require('@simplewebauthn/server');

// // The name of the relying party (your site)
// const RP_NAME = 'Auth Is Cool';
// // Unique id for the relying party, aka: the server hostname.
// const RP_ID = process.env.SERVER_BASE_URL || 'localhost:5001';
// // The URL where registrations and authN take place
// const ORIGIN = `https://${RP_ID}`;

// // Get options to generate a new passkey for a logged in user.
// router.get("/user/:id", async (req: Request, res: Response) => {

//   const loggedInUserId = req.params.id;

//   const user = await getUserFromDB(loggedInUserId);

//   const userPasskeys = await getUserPasskeys(user);

//   const options = await generateRegistrationOptions({
//     RP_NAME,
//     RP_ID,
//     userName: user.username,
//     // Don't prompt users for additional information about the authenticator
//     // (Recommended for smoother UX)
//     attestationType: 'none',
//     // Prevent users from re-registering existing authenticators
//     excludeCredentials: userPasskeys.map(passkey => ({
//       id: passkey.id,
//       // Optional
//       transports: passkey.transports,
//     })),
//     // See "Guiding use of authenticators via authenticatorSelection" below
//     authenticatorSelection: {
//       // Defaults
//       residentKey: 'preferred',
//       userVerification: 'preferred',
//       // Optional
//       authenticatorAttachment: 'platform',
//     },
//   });

//   setCurrentRegistrationOptions (user, options);

//   res.send(options);
// });

// // Get options to generate a new passkey for a new user.
// router.post("/", async (req: Request, res: Response) => {

//   const options = await generateRegistrationOptions({
//     RP_NAME,
//     RP_ID,
//     userName: user.username,
//     // Don't prompt users for additional information about the authenticator
//     // (Recommended for smoother UX)
//     attestationType: 'none',
//     // Prevent users from re-registering existing authenticators
//     excludeCredentials: userPasskeys.map(passkey => ({
//       id: passkey.id,
//       // Optional
//       transports: passkey.transports,
//     })),
//     // See "Guiding use of authenticators via authenticatorSelection" below
//     authenticatorSelection: {
//       // Defaults
//       residentKey: 'preferred',
//       userVerification: 'preferred',
//       // Optional
//       authenticatorAttachment: 'platform',
//     },
//   });

//   setCurrentRegistrationOptions (user, options);

//   res.send(options);
// });



// router.post("/", (req: Request, res: Response) => {
//   console.log(req);

//   res.sendStatus(201);

// });

// module.exports = router;
