const express = require('express');
const router = express.Router();
const {
	createOrganaigation,
	allOrganaigation,
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


//with auth
//router.post('/create_organization', [auth, updateValidations],createOrganaigation);


// without auth
router.post('/create_organization', updateValidations,createOrganaigation);
router.get('/all_organization',allOrganaigation);
router.get('/delete_organization/:id', deleteOrganaigation);
router.post('/update_organization/:id', updateValidations, updateOrganaigation);
router.get('/details_organization/:id', fetchOrganaigation);


router.get('/details_organizations/:id/:page', auth, fetchOrganaigations);
router.get('/home/:page', home);
router.get('/explore/:id', OrganaigationDetails);
router.post('/comment', auth, OrganaigationComment);


module.exports = router;
