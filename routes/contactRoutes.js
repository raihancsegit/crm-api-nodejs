const express = require('express');
const router = express.Router();
const {
	createContact,
	fetchContacts,
	fetchContact,
	updateContact,
	updateValidations,
	deleteContact,
	home,
	ContactDetails,
	ContactComment,
} = require('../controllers/contactController');

const auth = require('../utils/auth');

router.post('/create_contact', [auth, updateValidations],createContact);
router.delete('/delete_contact/:id', auth, deleteContact);
router.post('/update_contact/:id', [auth, updateValidations], updateContact);

router.get('/details_contact/:id/:page', auth, fetchContacts);
router.get('/details_contact/:id', auth, fetchContact);



router.get('/home/:page', home);
router.get('/explore/:id', ContactDetails);
router.post('/comment', auth, ContactComment);


module.exports = router;
