const nodemailer = require('nodemailer');//邮箱验证码

    //ELZOFIOFXKTYZMSU  网易163邮箱授权码
exports.transporter = nodemailer.createTransport({
    // 邮件传输配置信息
    host: 'smtp.163.com', // SMTP 服务器主机名
    secureConnection: true,
    port: 465, // SMTP 服务器端口号
    secure: true, // 使用 STARTTLS 加密（常用于非加密的连接）
    auth: {
        user: 'youyuan066@163.com', // 发件人邮箱用户名
        pass: 'ELZOFIOFXKTYZMSU', // 发件人邮箱密码或授权码
    },
});

//   const mailOptions = {
//     from: 'youyuan066@163.com', // 发件人邮箱
//     to: 'recipient@example.com', // 收件人邮箱
//     subject: 'Verification Code', // 邮件主题
//     text: 'Your verification code is 123456', // 邮件正文
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error occurred while sending email:', error);
//     } else {
//       console.log('Email sent successfully:', info.response);
//     }
//   });