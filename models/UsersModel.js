var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var UsersSchema = new mongoose.Schema({ 
	name: String,
	 mobile: String,
	  email: String,
	   address: { 
		   street: String, 
		   locality: String, 
		   city: String, 
		   state: String, 
		   pincode: String, 	
		   location: {
			type: { type: String },
			coordinates: [Number],
		  },	   
		 },

		
		 }, {timestamps: true});


		 UsersSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Users", UsersSchema);