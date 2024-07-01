import Bookings from "../models/BookingsModel.js";
import Messages from "../models/MessagesModel.js";
import News from "../models/NewsModel.js";
import { sendMany, sendOne } from "../utils/Email.js";

export const sendOneEmail = async(req, res)=>{
	try {
		const {email, name, subject, message} = req.body;
		await sendOne(name, email, subject, message);
		const newMessage = new Messages({...req.body, isSingle:true});
		const savedMessage =  await newMessage.save();
		res.status(201).json("Email sent!");
	} catch (error) {
		console.log(error);
	}
}

export const sendManyEmail = async(req, res)=>{
	try {
		const {subject, message, emails} = req.body;
		// const emails = await News.find({});
		// let emailArray = [];
		// if(emails.length){
		// 	emails.forEach(item=>{
		// 		emailArray.push(item.email);
		// 	})
		// }
		await sendMany(emails,subject,message);
		const newMessage = new Messages({...req.body, isSingle:false});
		const savedMessage =  await newMessage.save();
		console.log('sent to many')
		res.status(201).json('Emails sent!');
	} catch (error) {
		console.log(error)
	}
}

export const fetchSingle = async(req, res)=>{
	try {
		const message = await Messages.find({isSingle:true});
		res.status(200).json(message);
	} catch (error) {
		console.log(error);
	}
}
export const fetchMany = async(req, res)=>{
	try {
		const messages = await Messages.find({isSingle:false});
		res.status(200).json(messages);
	} catch (error) {
		console.log(error);
	}
}
export const fetchAll = async(req, res)=>{
	try {
		const messages = await Messages.find({});
		res.status(200).json(messages);
	} catch (error) {
		console.log(error);
	}
}

export const deleteMessage = async(req, res)=>{
	try {
		const {id} = req.params;
		await Messages.findByIdAndDelete(id);
		res.status(200).json('Message deleted successfully');
	} catch (error) {
		console.log(error);
	}
}

export const deleteByAdmin = async(req, res)=>{
	try {
		const {id} = req.params;
		const {email, name, message} = req.body;
		await Bookings.findByIdAndDelete(id);
		await sendOne(name, email, 'Appointment Cancelled', message);
		res.status(200).json('Message deleted successfully');
	} catch (error) {
		console.log(error);
	}
}