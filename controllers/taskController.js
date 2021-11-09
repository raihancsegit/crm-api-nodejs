const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { htmlToText } = require('html-to-text');
const fs = require('fs');

const Task = require('../models/Task');
const CommentSchema = require('../models/Comment');

module.exports.createTask = async (req, res) => {
			const { 
				taskName,
				category, 
				dueDate, 
				startDate,
				progress,
				priority,
				status,
				description
			} = req.body;

		const errors = [];
		if (taskName === '') {
			errors.push({ msg: 'Task Name is required' });
		}
         else {
			
					try {
						const response = await Task.create({
							taskName,
							category, 
							dueDate, 
							startDate,
							progress,
							priority,
							status,
							description
						});
						return res.status(200).json({
							msg: 'Your Task has been created successfully',
							response,
						});
					} catch (error) {
						return res.status(500).json({ errors: error, msg: error.message });
					}
				
			
		}
	
};

module.exports.fetchTasks = async (req, res) => {
	const id = req.params.id;
	const page = req.params.page;
	const perPage = 3;
	const skip = (page - 1) * perPage;
	try {
		const count = await Task.find({ userId: id }).countDocuments();
		const response = await Task.find({ userId: id })
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return res.status(200).json({ response: response, count, perPage });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.fetchTask = async (req, res) => {
	const id = req.params.id;
	try {
		const task = await Task.findOne({ _id: id });
		return res.status(200).json({ task });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.updateValidations = [
	body('taskName').notEmpty().trim().withMessage('Task Name is required'),
];


module.exports.updateTask = async (req, res) => {
	const {
		taskName,
		category, 
		dueDate, 
		startDate,
		progress,
		priority,
		status,
		description
	} = req.body;
	const errors = validationResult(req);
	const id = req.params.id;
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		try {
			const response = await Task.findByIdAndUpdate(id, {
				taskName,
				category, 
				dueDate, 
				startDate,
				progress,
				priority,
				status,
				description
			});
			return res.status(200).json({ msg: 'Your Task has been updated' });
		} catch (error) {
			return res.status(500).json({ errors: error, msg: error.message });
		}
	}
};

module.exports.deleteTask = async (req, res) => {
	const id = req.params.id;
	try {
		const response = await Contact.findByIdAndRemove(id);
		return res.status(200).json({ msg: 'Your task has been deleted' });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};


module.exports.home = async (req, res) => {
	const page = req.params.page;
	const perPage = 6;
	const skip = (page - 1) * perPage;
	try {
		const count = await Contact.find({}).countDocuments();
		const Contact = await Contact.find({})
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return res.status(200).json({ response: Contact, count, perPage });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.TaskDetails = async (req, res) => {
	const id = req.params.id;
	try {
		const Task = await Task.findOne({ slug: id });
		const comments = await CommentSchema.find({ TaskId: Task._id }).sort({
			updatedAt: -1,
		});
		return res.status(200).json({ Task, comments });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};


