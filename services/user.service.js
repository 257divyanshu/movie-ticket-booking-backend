const User = require('../models/user.model');

const createUser = async (data) => {
    try {
        const response = await User.create(data);
        return response;
    } catch (error) {
        console.log('service layer error');

        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            console.log(err);
            
            // old way (the way we have been doing)
            // return { err: err, code: 422 };
            // new way (throwing an error)
            throw { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}

module.exports = {
    createUser
}