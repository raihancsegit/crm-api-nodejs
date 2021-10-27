const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { htmlToText } = require('html-to-text');
const fs = require('fs');

const Contact = require('../models/Contact');
const CommentSchema = require('../models/Comment');

module.exports.createContact = async (req, res) => {
			const { 
				prefix,
				fName, 
				lName, 
				organaizationName,
				email,
				phone,
				homePhone,
				mobilePhone,
				otherPhone,
				assistantPhone,
				fax,
				website,
				linkdin,
				facebook,
				twitter,
				mallingAddress,
				mallingCity,
				mallingState,
				mallingPostalCode,
				mallingCountry,
				otherAddress,
				otherCity,
				otherState,
				otherPostalCode,
				otherCountry,
				description,
				tags
			} = req.body;

		const errors = [];
		if (fName === '') {
			errors.push({ msg: 'Contact First Name is required' });
		}
		if (organaizationName === '') {
			errors.push({ msg: 'Organaization Name is required' });
		}
         else {
			
					try {
						const response = await Contact.create({
							prefix,
							fName, 
							lName, 
							organaizationName,
							email,
							phone,
							homePhone,
							mobilePhone,
							otherPhone,
							assistantPhone,
							fax,
							website,
							linkdin,
							facebook,
							twitter,
							mallingAddress,
							mallingCity,
							mallingState,
							mallingPostalCode,
							mallingCountry,
							otherAddress,
							otherCity,
							otherState,
							otherPostalCode,
							otherCountry,
							description,
							tags
						});
						return res.status(200).json({
							msg: 'Your Contact has been created successfully',
							response,
						});
					} catch (error) {
						return res.status(500).json({ errors: error, msg: error.message });
					}
				
			
		}
	
};

module.exports.fetchContacts = async (req, res) => {
	const id = req.params.id;
	const page = req.params.page;
	const perPage = 3;
	const skip = (page - 1) * perPage;
	try {
		const count = await Contact.find({ userId: id }).countDocuments();
		const response = await Contact.find({ userId: id })
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return res.status(200).json({ response: response, count, perPage });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.fetchContact = async (req, res) => {
	const id = req.params.id;
	try {
		const contact = await Contact.findOne({ _id: id });
		return res.status(200).json({ contact });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.updateValidations = [
	body('organaizationName').notEmpty().trim().withMessage('Organaization Name is required'),
	body('fName').notEmpty().trim().withMessage('First Name is required'),
];


module.exports.updateContact = async (req, res) => {
	const {
		      prefix,
				fName, 
				lName, 
				organaizationName,
				email,
				phone,
				homePhone,
				mobilePhone,
				otherPhone,
				assistantPhone,
				fax,
				website,
				linkdin,
				facebook,
				twitter,
				mallingAddress,
				mallingCity,
				mallingState,
				mallingPostalCode,
				mallingCountry,
				otherAddress,
				otherCity,
				otherState,
				otherPostalCode,
				otherCountry,
				description,
				tags
	} = req.body;
	const errors = validationResult(req);
	const id = req.params.id;
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		try {
			const response = await Contact.findByIdAndUpdate(id, {
				prefix,
				fName, 
				lName, 
				organaizationName,
				email,
				phone,
				homePhone,
				mobilePhone,
				otherPhone,
				assistantPhone,
				fax,
				website,
				linkdin,
				facebook,
				twitter,
				mallingAddress,
				mallingCity,
				mallingState,
				mallingPostalCode,
				mallingCountry,
				otherAddress,
				otherCity,
				otherState,
				otherPostalCode,
				otherCountry,
				description,
				tags
			});
			return res.status(200).json({ msg: 'Your Contact has been updated' });
		} catch (error) {
			return res.status(500).json({ errors: error, msg: error.message });
		}
	}
};

module.exports.deleteContact = async (req, res) => {
	const id = req.params.id;
	try {
		const response = await Contact.findByIdAndRemove(id);
		return res.status(200).json({ msg: 'Your contact has been deleted' });
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

module.exports.ContactDetails = async (req, res) => {
	const id = req.params.id;
	try {
		const Contact = await Contact.findOne({ slug: id });
		const comments = await CommentSchema.find({ ContactId: Contact._id }).sort({
			updatedAt: -1,
		});
		return res.status(200).json({ Contact, comments });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.ContactComment = async (req, res) => {
	const { id, comment, userName } = req.body;
	console.log(req.body);
	try {
		const response = await CommentSchema.create({
			OrganaigationId: id,
			comment,
			userName,
		});
		return res.status(200).json({ msg: 'Your comment has been published' });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};
