const express = require('express');
const router = express.Router();
const {
	createTask,
	fetchTasks,
	fetchTask,
	updateTask,
	updateValidations,
	deleteTask,
	home,
	TaskDetails,
} = require('../controllers/taskController');

const auth = require('../utils/auth');

router.post('/create_task', [auth, updateValidations],createTask);
router.delete('/delete_task/:id', auth, deleteTask);
router.post('/update_contact/:id', [auth, updateValidations], updateTask);

router.get('/details_task/:id/:page', auth, fetchTasks);
router.get('/details_task/:id', auth, fetchTask);



router.get('/home/:page', home);
router.get('/explore/:id', TaskDetails);


module.exports = router;
