const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { password, clientId, JWT_SECRET } = require("../config");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(clientId);

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mansiqwerty01@gmail.com",
    pass: password,
  },
});

module.exports.postregister = async (req, res) => {
  var { firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(422).json({ error: "Enter all the details" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
    bcrypt
      .hash(password, 15)
      .then((hashedpw) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedpw,
          profilepic: null,
        });
        user
          .save()
          .then((user) => {
            let mailDetails = {
              from: "mansiqwerty01@gmail.com",
              to: user.email,
              subject: "Signup Successful",
              text: "I hope you have wonderful experience on this platform",
              html: "<h1>Congratulations on signup<h1><img src=`https://cdni.iconscout.com/illustration/premium/thumb/young-business-woman-working-on-todo-list-2644452-2206521.png`></img>",
            };
            mailTransporter.sendMail(mailDetails, function (err, data) {
              if (err) {
                console.log("Error Occurs");
              } else {
                console.log("Email sent successfully");
              }
            });
            return res
              .status(200)
              .json({ message: "User created Succesfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports.postlogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res
          .status(422)
          .json({ error: "User doesnot exist with that email" });
      }
      bcrypt.compare(password, savedUser.password).then((match) => {
        if (!match) {
          return res.status(400).json({ error: "Invalid email or passowrd" });
        }

        User.findOne({ userid: savedUser._id })
          .then((data) => {
            const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);
            return res
              .status(200)
              .json({ token: token, message: "Loggen In Succesfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postemaillogin = async (req, res) => {
  const { tokenId } = req.body;
  if (!tokenId) {
    return res.status(422).json({ error: "Please provide email or password" });
  }

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: clientId,
  });
  console.log(ticket,"ticket is")
  const { given_name, family_name, email, picture } = ticket.getPayload();
  console.log("data is ", ticket.getPayload());

  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        const user = new User({
          firstName: given_name,
          lastName: family_name,
          email: email,
          profilepic: picture,
        });
        console.log("user created");
        user.save().then((user) => {
          console.log("user created");
          let mailDetails = {
            from: "mansiqwerty01@gmail.com",
            to: user.email,
            subject: "Signup Successful",
            text: "I hope you have wonderful experience on this platform",
            html: "<h1>Congratulations on signup<h1><img src=`https://cdni.iconscout.com/illustration/premium/thumb/young-business-woman-working-on-todo-list-2644452-2206521.png`></img>",
          };
          mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
              console.log("Error Occurs");
            } else {
              console.log("Email sent successfully");
            }
          });
          const token = jwt.sign({ id: user._id }, JWT_SECRET);
          return res
            .status(200)
            .json({ token: token, message: "User created Succesfully" });
        });
      } else {
        console.log("saved user is", savedUser);
        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);
        return res
          .status(200)
          .json({ token: token,user:savedUser, message: "Loggen In Succesfully" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// module.exports.resetpassword = async (req, res) => {
//     const email = req.body.email
//     const user = await User.findOne({ email })
//     const token = Math.random().toString(36).slice(-8);
//     user.resettoken = token;
//     user.expiretoken = Date.now() + 3600000
//     const saveduser = await user.save()
//     let mailDetails =
//     {
//         from: 'mansiqwerty01@gmail.com',
//         to: saveduser.email,
//         subject: 'Reset Password',
//         text: 'Here is the link to reset your password',
//         html: `<h4>Click on this <a href="http://localhost:3000/newpassword/${token}">link</a> to reset password .</h4>`
//     }

//     mailTransporter.sendMail(mailDetails, function (err, data) {
//         if (err) {
//             console.log('Error Occurs');
//             return res.status(500).json({ message: "internal error" })
//         } else {
//             console.log('Email sent successfully');
//             return res.status(200).json({ message: "Email sent successfully" })
//         }
//     })
// }

// module.exports.newpassword = async (req, res) => {
//     const newpassword = req.body.password
//     const token = req.params.token;
//     const user = await User.findOne({ resettoken: token, expiretoken: { $gt: Date.now() } })
//     if (user) {
//         const hpw = await bcrypt.hash(newpassword, 15)
//         user.password = hpw;
//         user.resettoken = ''
//         user.expiretoken = ''
//         await user.save()
//         return res.status(200).json({ message: "Password Updated Successfully" })
//     }
//     else {
//         res.json({ err: "Session expired" }).status(422)
//     }
// }
