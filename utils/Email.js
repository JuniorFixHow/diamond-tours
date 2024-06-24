import sgMail from '@sendgrid/mail';
import dotenv  from 'dotenv';
import postmark from 'postmark'

// sgMail.setApiKey(process.env.MAIL_KEY)
// export const sendEmail = async(content, toEmail, fromEmail, subject, fromName, bodyText)=>{
//     const msg = {
//         to: toEmail,
//         from:{
//             name: fromName,
//             email:fromEmail
//         },
//         subject: subject,
//         text:bodyText,
//         html: content
//     }

//     try {
//         await sgMail.send(msg);
//     } catch (error) {
//         console.error(error)
//         if(error.response){
//             console.log(error.response.body);
//         }
//     }
// }


// export const sendOne = async (fullname, toEmail, subject, body) =>{
//     const msg = {
//         to: toEmail,
//         from:{
//             name: 'Diamond Tours GH',
//             email:process.env.EMAIL
//         },
//         templateId: process.env.TEMP_KEY,
//         dynamicTemplateData:{
//             fullname,
//             subject,
//             body
//         }
//     }

//     try {
//         await sgMail.send(msg);
//         console.log('Message sent')
//     } catch (error) {
//         console.error(error)
//         if(error.response){
//             console.log(error.response.body);
//         }
//     }
// }
// export const sendMany = async (toEmails, subject, body) =>{
//     const msg = {
//         to: toEmails,
//         from:{
//             name: 'Diamond Tours GH',
//             email:process.env.EMAIL
//         },
//         templateId: process.env.TEMP_KEY,
//         dynamicTemplateData:{
//             subject,
//             body
//         }
//     }

//     try {
//         await sgMail.send(msg);
//         console.log('Message sent')
//     } catch (error) {
//         console.error(error)
//         if(error.response){
//             console.log(error.response.body);
//         }
//     }
// }



// export const replyDynamicEmail = async (subject, toEmail, body) =>{
//     const msg = {
//         to: toEmail,
//         from:{
//             name: 'AcuPower',
//             email:process.env.EMAIL
//         },
//         templateId: process.env.REPLY_KEY,
//         dynamicTemplateData:{
//             subject,
//             body
//         }
//     }

//     try {
//         await sgMail.send(msg);
//         console.log('Message sent')
//     } catch (error) {
//         console.error(error)
//         if(error.response){
//             console.log(error.response.body);
//         }
//     }
// }

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN )

export const sendOne = async(fullname, toEmail, subject, body)=>{
    try {
        await client.sendEmail({
            'From':'rjannan@st.ug.edu.gh',
            'To': toEmail,
            'Subject':subject,
            'TextBody':body
        })
        console.log('sent')
    } catch (error) {
        console.log(error)
    }
}

export const sendMany = async (toEmails, subject, body)=>{

}