const { model, Schema } = require('mongoose');

const OrganazationSchema = new Schema(
	{
		organaizationName: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		fax: {
			type: String,
		},
		website: {
			type: String,
		},
		linkdin: {
			type: String,
		},
		facebook: {
			type: String,
		},
		twitter: {
			type: String,
		},
		emailDomain: {
			type: String,
		},
		billingAddress: {
			type: String,
		},
		billingCity: {
			type: String,
		},
		billingState: {
			type: String,
		},
		billingPostalCode: {
			type: String,
		},
		billingCountry: {
			type: String,
		},
		description: {
			type: String,
		},
		tags: { type: [String]}
	},
	{ timestamps: true }
);
module.exports = model('organaigation', OrganazationSchema);
