import {Router} from 'express';
import { createContact, deleteContact, getAllContacts, getContact, updateContact } from '../controllers/ContactControllers.js';

const router = Router();

router.post('/create', createContact);
router.get('/', getAllContacts);
router.delete('/:id', deleteContact);
router.get('/:id', getContact);
router.put('/:id', updateContact);

export default router;