import { generateHtml } from '@/utils/genrateHtml';
import nodemailer from 'nodemailer'

const getTransporter = async() =>{
    let transporter = nodemailer.createTransport({
        host : process.env.EMAIL_SMTP_HOST!,
        port : 465,
        secure : true,
        //secure: false,
        auth : {
            user : process.env.EMAIL_SMTP_USER,
            pass : process.env.EMAIL_SMTP_PASSWORD,
        }
        //tls:{
            //ciphers:'SSLv3'
        //}
    })
    return transporter;
}

export const sendEmail = async({email,name}:{email:string,name:string})=>{

    const transporter = await getTransporter();

    const getHtmlMailGenrator = generateHtml(name)
    const subject = "Ticket confirmation for MATRIX 2.0"
    
    let response;

    try{
        response = await transporter.sendMail({
            from : "internware@gmail.com",
            to : email,
            subject,
            html : getHtmlMailGenrator,
        })
    }catch(error){
        console.error("error sending mail",error)
    }

}