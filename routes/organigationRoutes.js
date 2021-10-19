const express = require('express');
const router = express.Router();
const {
	createOrganaigation,
	fetchOrganaigations,
	fetchOrganaigation,
	updateOrganaigation,
	updateValidations,
	updateImage,
	deleteOrganaigation,
	home,
	OrganaigationDetails,
	OrganaigationComment,
} = require('../controllers/organaigationController');

const auth = require('../utils/auth');

router.post('/create_organization', [auth, updateValidations],createOrganaigation);



router.post('/update', [auth, updateValidations], updateOrganaigation);
router.post('/updateImage', auth, updateImage);
router.get('/posts/:id/:page', auth, fetchOrganaigations);
router.get('/post/:id', auth, fetchOrganaigation);
router.get('/delete/:id', auth, deleteOrganaigation);
router.get('/home/:page', home);
router.get('/explore/:id', OrganaigationDetails);
router.post('/comment', auth, OrganaigationComment);
module.exports = router;
