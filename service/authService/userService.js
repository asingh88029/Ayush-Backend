const mongoose = require('mongoose');
const User = require('../../models/User/userModels'); // Replace with the correct path to your User model

class UserService {
    async createUser(userData) {
        try {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                ...userData,
            });

            return await newUser.save();
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async createUserOrUpdateIfPresent(mobileNumber, activeOtp, activeOtpId,) {
        try {
            let user = await User.findOne({ mobileNumber });

            if (user) {
                user.activeOtp = activeOtp;
                user.activeOtpId = activeOtpId;
                await user.save();
                return user;
            }

            user = new User({
                _id: new mongoose.Types.ObjectId(),
                mobileNumber,
                activeOtp,
                activeOtpId,
            });

            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create/update user');
        }
    }

    async findUserByActiveOtpIdAndOtp(activeOtpId, enteredOtp) {
        try {
            const user = await User.findOne({ activeOtpId, activeOtp: enteredOtp });
            return user;
        } catch (error) {
            throw new Error('Failed to find user by OTP and OTP ID');
        }
    }

    // You can add more methods for updating, deleting, querying users, etc.
}

module.exports = UserService;
