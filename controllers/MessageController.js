import News from "../models/NewsModel.js";
import { sendMany, sendOne } from "../utils/Email.js";

export const sendOneEmail = async(req, res)=>{
	try {
		const {email, name, subject, message} = req.body;
		await sendOne(name, email, subject, message);
		res.status(201).json("Email sent!");
	} catch (error) {
		console.log(error);
	}
}

export const sendManyEmail = async(req, res)=>{
	try {
		const {subject, message} = req.body;
		const emails = await News.find({});
		let emailArray = [];
		if(emails.length){
			emails.forEach(item=>{
				emailArray.push(item.email);
			})
		}
		await sendMany(emailArray,subject,message);
		res.status(201).json('Emails sent!');
	} catch (error) {
		console.log(error)
	}
}