const { model, Schema } = require('mongoose');

const OrganazationSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = model('organaigation', OrganazationSchema);
