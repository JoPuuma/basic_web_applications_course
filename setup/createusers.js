"use strict";

module.exports = async userConfig => {
    const User = require("../models/user");
    const admin = await User.findOne({ role: "admin" }).exec();

    if (admin) {
        return "Admin not created: at least one admin user already found in database.";
    }

    const user = await User.findOne({email: userConfig.email}).exec();
    if (user) {
        user.role = "admin";
        await user.save();
        return "Changed role to admin: user with same email already found in database";
    }

    const new_user = new User(userConfig);
    new_user.role = "admin";
    await new_user.save();
    return "Admin user successfully created";
};
