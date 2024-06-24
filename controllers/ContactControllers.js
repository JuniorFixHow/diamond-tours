import Contact from "../models/ContactModel.js";

export const createContact = async(req, res)=>{
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    } catch (error) {
        console.log(error);
    }
}


export const getAllContacts = async(req, res)=>{
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
    }
}
export const getContact = async(req, res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    } catch (error) {
        console.log(error);
    }
}
export const deleteContact = async(req, res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        res.status(200).json('Contact deleted successfully');
    } catch (error) {
        console.log(error);
    }
}