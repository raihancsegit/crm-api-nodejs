const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { htmlToText } = require('html-to-text');
const fs = require('fs');

const Organaigation = require('../models/Organaigation');
const CommentSchema = require('../models/Comment');

module.exports.createOrganaigation = async (req, res) => {
		const { organaizationName, phone, fax, website,linkdin,facebook,twitter,emailDomain,billingAddress,billingCity,billingState,billingPostalCode,billingCountry,description,tags} = req.body;
		const errors = [];
		if (organaizationName === '') {
			errors.push({ msg: 'Organaization Name is required' });
		}
         else {
			
					try {
						const response = await Organaigation.create({
							organaizationName,
							phone,
							fax,
							website,
							linkdin,
							facebook,
							twitter,
							emailDomain,
							billingAddress,
							billingCity,
							billingState,
							billingPostalCode,
							billingCountry,
							description,
							tags
						});
						return res.status(200).json({
							msg: 'Your organaigation has been created successfully',
							response,
						});
					} catch (error) {
						return res.status(500).json({ errors: error, msg: error.message });
					}
				
			
		}
	
};

module.exports.fetchOrganaigations = async (req, res) => {
	const id = req.params.id;
	const page = req.params.page;
	const perPage = 3;
	const skip = (page - 1) * perPage;
	try {
		const count = await Organaigation.find({ userId: id }).countDocuments();
		const response = await Organaigation.find({ userId: id })
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return res.status(200).json({ response: response, count, perPage });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};
module.exports.fetchOrganaigation = async (req, res) => {
	const id = req.params.id;
	try {
		const Organaigation = await Organaigation.findOne({ _id: id });
		return res.status(200).json({ Organaigation });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ errors: error, msg: error.message });
	}
};
module.exports.updateValidations = [
	body('organaizationName').notEmpty().trim().withMessage('Organaization Name is required'),
];


module.exports.updateOrganaigation = async (req, res) => {
	const { title, body, description, id } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		try {
			const response = await Organaigation.findByIdAndUpdate(id, {
				title,
				body,
				description,
			});
			return res.status(200).json({ msg: 'Your organaigation has been updated' });
		} catch (error) {
			return res.status(500).json({ errors: error, msg: error.message });
		}
	}
};

module.exports.updateImage = (req, res) => {
	const form = formidable({ multiples: true });
	form.parse(req, (errors, fields, files) => {
		const { id } = fields;
		const imageErrors = [];
		if (Object.keys(files).length === 0) {
			imageErrors.push({ msg: 'Please choose image' });
		} else {
			const { type } = files.image;
			const split = type.split('/');
			const extension = split[1].toLowerCase();
			if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
				imageErrors.push({ msg: `${extension} is not a valid extension` });
			} else {
				files.image.name = uuidv4() + '.' + extension;
			}
		}
		if (imageErrors.length !== 0) {
			return res.status(400).json({ errors: imageErrors });
		} else {
			const newPath = __dirname + `/../client/build/images/${files.image.name}`;
			fs.copyFile(files.image.path, newPath, async (error) => {
				if (!error) {
					try {
						const response = await Organaigation.findByIdAndUpdate(id, {
							image: files.image.name,
						});
						return res.status(200).json({ msg: 'Your image has been updated' });
					} catch (error) {
						return res.status(500).json({ errors: error, msg: error.message });
					}
				}
			});
		}
	});
};
module.exports.deleteOrganaigation = async (req, res) => {
	const id = req.params.id;
	try {
		const response = await Organaigation.findByIdAndRemove(id);
		return res.status(200).json({ msg: 'Your organaigation has been deleted' });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};
module.exports.home = async (req, res) => {
	const page = req.params.page;
	const perPage = 6;
	const skip = (page - 1) * perPage;
	try {
		const count = await Organaigation.find({}).countDocuments();
		const Organaigation = await Organaigation.find({})
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return res.status(200).json({ response: Organaigation, count, perPage });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};
module.exports.OrganaigationDetails = async (req, res) => {
	const id = req.params.id;
	try {
		const Organaigation = await Organaigation.findOne({ slug: id });
		const comments = await CommentSchema.find({ OrganaigationId: Organaigation._id }).sort({
			updatedAt: -1,
		});
		return res.status(200).json({ Organaigation, comments });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
};

module.exports.OrganaigationComment = async (req, res) => {
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
