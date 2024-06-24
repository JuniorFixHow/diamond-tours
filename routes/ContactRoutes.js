import {Router} from 'express';
import { createContact, deleteContact, getAllContacts, getContact } from '../controllers/ContactControllers.js';

const router = Router();

router.post('/create', createContact);
router.get('/', getAllContacts);
router.delete('/:id', deleteContact);
router.get('/:id', getContact);

export default router;