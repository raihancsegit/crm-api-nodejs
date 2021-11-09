const { model, Schema } = require('mongoose');

const TaskSchema = new Schema(
	{
		taskName: {
			type: String,
		},
		category: {
			type: String,
			required: true,
		},
		dueDate: {
			type: String,
		},
		startDate: {
			type: String,
		},
		progress: {
			type: String,
		},
		priority: {
			type: String,
		},
		status: {
			type: String,
		},
		description: {
			type: String,
		}
	},
	{ timestamps: true }
);
module.exports = model('task', TaskSchema);
