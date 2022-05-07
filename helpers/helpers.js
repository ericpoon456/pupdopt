const organization = require('../models/user/OrganizationModel');
const admin = require('../models/user/AdminModel');
const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error(error);
    }
};

const comparePasswords = async (password, receivedPassword) => {
    try {
        return await bcrypt.compare(password, receivedPassword);
    } catch (error) {
        console.error(error);
    }
};

const searchEmail = async (email) => {
    try {
        const foundEmail = await organization.findOne({ email });
        return foundEmail;
    } catch (error) {
        console.error(error);
    }
};

// TODO: look for a way to use a single function to check mails
const searchEmailAdmin = async (email) => {
    try {
        const foundEmail = await admin.findOne({ email });
        return foundEmail;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    encryptPassword,
    comparePasswords,
    searchEmail,
    searchEmailAdmin
}