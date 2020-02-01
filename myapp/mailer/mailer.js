const nodemailer = require("nodemailer");

let mailConfig = {
  host: "smtp.ethereal.email",

  port: 587,

  auth: {
    user: 'aniya.wintheiser@ethereal.email',
    pass: 'z9XBdG2cmcdHMg93YT'
  }
};

module.exports = nodemailer.createTransport(mailConfig);
