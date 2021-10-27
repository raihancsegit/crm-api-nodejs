const { model, Schema } = require('mongoose');

const ContactSchema = new Schema(
	{
		prefix: {
			type: String,
		},
		fName: {
			type: String,
			required: true,
		},
		lName: {
			type: String,
		},
		organaizationName: {
			type: Schema.Types.ObjectId,
			ref: 'organaigation',
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		homePhone: {
			type: String,
		},
		mobilePhone: {
			type: String,
		},
		otherPhone: {
			type: String,
		},
		assistantPhone: {
			type: String,
		},
		assistantName: {
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
		mallingAddress: {
			type: String,
		},
		mallingCity: {
			type: String,
		},
		mallingState: {
			type: String,
		},
		mallingPostalCode: {
			type: String,
		},
		mallingCountry: {
			type: String,
		},
		otherAddress: {
			type: String,
		},
		otherCity: {
			type: String,
		},
		otherState: {
			type: String,
		},
		otherPostalCode: {
			type: String,
		},
		otherCountry: {
			type: String,
		},
		description: {
			type: String,
		},
		tags: { type: [String]}
	},
	{ timestamps: true }
);
module.exports = model('contacts', ContactSchema);
