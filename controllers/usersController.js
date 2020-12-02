const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const apiResponse = require('../helpers/apiResponse');
const catchAsync = require('../helpers/catchAsync');
const db = require('../models/index');

// API to get a list of users
exports.userslist = catchAsync(async (req, res) => {
    var perPage = 10, page = Math.max(0, req.query.page)
    const distance = req.query.distance;
    const lat =  req.query.lat;
    const lon = req.query.long;
     db.Users.find({ "address.location":{
        near: { 
          type: "Point",
          coordinates: [ lat,lon]
        },
        maxDistance: distance
     }}).limit(perPage)
    .skip(perPage * page)
    .sort({
        createdAt: 'asc',
    }).exec(function(err, events) {
        if(err){
            return apiResponse.ErrorResponse(res, err);
        }
        db.Users.count().exec(function(err, count) {
            var data = {
                events: events,
                page: page,
                pages: count / perPage
            }
            return apiResponse.successResponseWithData(res, 'Users list', data);           
        })

    })
        
  });

//   API to create a new user

exports.addusers = [
	// Validate fields.
    body("name").isLength({ min: 1 }).trim().withMessage("Name must be specified.")
    .isAlphanumeric().withMessage("Name has non-alphanumeric characters."),
    body("mobile").isLength({ min: 1 }).trim().withMessage("mobile must be specified.").withMessage("mobile must be a valid email address.").custom((value) => {
        return db.Users.findOne({mobile : value}).then((user) => {
            if (user) {
                return Promise.reject("mobile already in use");
            }
        });
    }),
	// Sanitize fields.
	sanitizeBody("name").escape(),
	sanitizeBody("mobile").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("street").escape(),
    sanitizeBody("locality").escape(),
    sanitizeBody("city").escape(),
    sanitizeBody("state").escape(),
    sanitizeBody("pincode").escape(),
    sanitizeBody("coordinatesType").escape(),
    sanitizeBody("coordinates").escape(),
	// Process request after validation and sanitization.
	catchAsync(async(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
                // return apiResponse.ErrorResponse(res, err);
				//hash input password
                user = await db.Users.create(req.body);
                return apiResponse.successResponseWithData(res,'User added succefully .',user);
                
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
    })];
    
//   
exports.updateusers = [
    async (req, res) => {
        console.log(req.body);
        const user = db.Users.findById(req.params.id);
        if(user){
            const updated = await db.Users.findByIdAndUpdate(req.params.id,req.body);
            if(updated){
                return apiResponse.successResponse(res,'User updated succefully .');
            }else return apiResponse.validationError(res, "Not Updated");
        }else{
            return apiResponse.ErrorResponse(res, "Invalid User Id.");
        }

    }];;


// API to Delete user

exports.deleteuser =[
    async (req, res) => {
    user = await db.Users.findByIdAndRemove(req.params.id);
    if(user){

        return apiResponse.successResponseWithData(res,'Deleted Succesfully .',user);
    }else{
        return apiResponse.ErrorResponse(res, "User Id Doesent Match our Records");
    }
    }];
