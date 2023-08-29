import User from "@/modals/modal"
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'


export const sendEmail = async ({ email, emailType, userId }) =>{
    console.log(email, emailType, userId )
        try {
            const hashedToken = await bcryptjs.hash(userId.toString(), 10);

            if(emailType === "VERIFY"){

                await User.findByIdAndUpdate(userId, {
                    verifyToken: hashedToken ,
                    verifyTokenExpiry : Date.now() + 3600000 });
            }else if(emailType === "RESET"){
                await User.findByIdAndUpdate(userId, {
                    forgotPassword: hashedToken , 
                    forgotPasswordExpiry: Date.now() + 3600000
            });
            }

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: 'e7ee2f986fe87d',
                    pass: '8575870f0615d2'
                }
            });
           

            const mailOptions = {
                from : 'hari@gmail.com',
                to : email,
                subject : emailType === "VERIFY" ?  "Verify your email address" : "Reset your password",
                html: `${emailType === "VERIFY" ? (
                    `<p>
                    Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"/>here</a>
                    to Verify your email address <br />
                    or copy and paste the link in your browser <br /> 
                    "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
                    </p>`
                ) : (
                    `<p>
                    Click <a href="${process.env.DOMAIN}/verifyemailreset?token=${hashedToken}"/>here</a>
                    to Reset your password <br />
                    or copy and paste the link in your browser <br /> 
                    "${process.env.DOMAIN}/verifyemailreset?token=${hashedToken}"
                    </p>`
                )}`
                 
            }

            const mailResponse = await transport.sendMail(mailOptions);
            return mailResponse;

            
        } catch (error) {
            throw new Error(error.message);
        }
}