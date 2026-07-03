const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS, STATUS_CODES } = require('../utils/constants');

const createUser = async (data) => {
    try {
        console.log('createUser service layer function');
        if (!data.userRole || data.userRole == USER_ROLE.customer) {
            if (data.userStatus && data.userStatus != USER_STATUS.approved) {
                throw {
                    err: "We cannot set any other status for customer",
                    code: STATUS_CODES.BAD_REQUEST
                };
            }
        }
        if (data.userRole && data.userRole != USER_ROLE.customer) {
            data.userStatus = USER_STATUS.pending;
        }
        const response = await User.create(data);
        return response;
    } catch (error) {
        console.log('service layer error');
        console.log(error);

        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            // console.log(err);

            // old way (the way we have been doing)
            // return { err: err, code: 422 };
            // new way (throwing an error)
            throw { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        } else {
            throw error;
        }
    }
}

const getUserByEmail = async (email) => {
    try {
        console.log('getUserByEmail service layer function');

        const response = await User.findOne({
            email: email
        });

        if (!response) {
            throw { err: "No user found for the given email", code: STATUS_CODES.NOT_FOUND };
        }

        return response;
    } catch (error) {
        console.log("service layer error");
        console.log(error);

        throw error;
    }
}

const getUserById = async (id) => {
    try {
        console.log('getUserById service layer function');

        const user = await User.findById(id);

        if (!user) {
            throw { err: "No user found for the given id", code: STATUS_CODES.NOT_FOUND };
        }

        return user;
    } catch (error) {
        console.log("service layer error");
        console.log(error);

        throw error;
    }
}

const updateUserRoleOrStatus = async (data, userId) => {
    try {
        console.log('updateUserRoleOrStatus service layer function');

        let updateQuery = {};

        if (data.userRole) updateQuery.userRole = data.userRole;
        if (data.userStatus) updateQuery.userStatus = data.userStatus;

        let response = await User.findByIdAndUpdate(
            userId,
            updateQuery,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        // console.log(response);

        if (!response) {
            throw { err: 'No user found for the given id', code: STATUS_CODES.NOT_FOUND };
        }

        return response;
    } catch (error) {
        console.log("service layer error");
        console.log(error);

        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });

            throw { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        }
        else {
            throw error;
        }
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleOrStatus
}