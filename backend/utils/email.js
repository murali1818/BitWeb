const nodemailer=require('nodemailer')
const sendemail=async options =>{
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0dc014b338125d",
          pass: "4bbd438bca017e"
        }
      });
      const msg={
        from:"<noreply@Bitweb.com>",
        to:options.email,
        subject:options.subject,
        text:options.message

      }
      await transport.sendMail(msg);

}
module.exports=sendemail;