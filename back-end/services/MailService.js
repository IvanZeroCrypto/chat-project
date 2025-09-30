import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const MailService = async ({ email, randomCode }) => {
  // const urlToken = jwt.sign(randomCode, "qwerty", { expiresIn: "1h" });
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "user-25@bk.ru",
        pass: "cCtaD0hW5n9ZqieDd5Bf",
      },
    });
    const mailOptions = {
      from: "user-25@bk.ru",
      to: email,
      subject: "Регистрация аккаунта — ваш код подтверждения",
      html: `
      <div>
      <h1>Ваш код: ${randomCode}</h1>
      <p>Вы можете ввести код вручную или перейти по ссылке и он автоматически активирует страницу</p>
      <a href ="http://localhost:5173/login-code?urlToken=${randomCode}">Перейдите по ссылке чтобы активировать код<a/>
      </div>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено: %s", info.messageId);
  } catch (error) {
    console.log(error, "error MailService");
  }
};
export default MailService;

// const MailService = async ({ randomCode, email, userName, id }) => {
//   const obj = {
//     randomCode,
//     email,
//     userName,
//     id,
//   };
//   const urlToken = jwt.sign(obj, "qwerty", { expiresIn: "1h" });
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.mail.ru",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "user-25@bk.ru",
//         pass: "cCtaD0hW5n9ZqieDd5Bf",
//       },
//     });
//     const mailOptions = {
//       from: "user-25@bk.ru",
//       to: email,
//       subject: "Регистрация аккаунта — ваш код подтверждения",
//       html: `
//       <div>
//       <h1>Ваш код: ${randomCode}</h1>
//       <a href ="http://localhost:5173/register/code?urlToken=${urlToken}">Перейдите по ссылке чтобы активировать код<a/>
//       </div>`,
//     };
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Письмо отправлено: %s", info.messageId);
//   } catch (error) {
//     console.log(error, "error MailService");
//   }
// };
