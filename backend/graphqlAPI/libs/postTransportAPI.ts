import {POST_ACCESS} from "./accessConsts";
import Mailer from "nodemailer";

export const sendEmail = async ({email, html, subject}) => {

    const transporterProps = {
        host: POST_ACCESS.host,
        port: POST_ACCESS.port,
        secure: true,
        auth: {
            user: POST_ACCESS.from,
            pass: POST_ACCESS.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    const transport = Mailer.createTransport(transporterProps)

    const mailOptions = {
        from: POST_ACCESS.from,
        to: email,
        subject,
        html
    };

    return new Promise ((resolve, reject) => {
        transport.sendMail(mailOptions, e => {
            if (e) {
                reject(e)
            } else {
                resolve(true)
            }
        });
    })
}