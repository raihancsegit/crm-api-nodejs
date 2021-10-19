const express = require('express');
const router = express.Router();
const {
	createOrganaigation,
	fetchOrganaigations,
	fetchOrganaigation,
	updateOrganaigation,
	updateValidations,
	deleteOrganaigation,
	home,
	OrganaigationDetails,
	OrganaigationComment,
} = require('../controllers/organaigationController');

const auth = require('../utils/auth');

router.post('/create_organization', [auth, updateValidations],createOrganaigation);
router.get('/delete_organization/:id', auth, deleteOrganaigation);
router.post('/update_organization/:id', [auth, updateValidations], updateOrganaigation);

router.get('/organizations/:id/:page', auth, fetchOrganaigations);
router.get('/details_organization/:id', auth, fetchOrganaigation);



router.get('/home/:page', home);
router.get('/explore/:id', OrganaigationDetails);
router.post('/comment', auth, OrganaigationComment);


module.exports = router;
