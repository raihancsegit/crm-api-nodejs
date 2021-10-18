const mongoose = require('mongoose');
require('dotenv').config();
module.exports = connect = async () => {
	try {
		const response = await mongoose.connect("mongodb://localhost:27017/myDB", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});
		console.log('Database connection created');
	} catch (error) {
		console.log(error);
	}
};
