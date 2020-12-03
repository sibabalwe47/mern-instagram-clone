const Session = require("../models/Session");
const asyncHandler = require("express-async-handler");
const express = require("express")

exports.createUserSession = asyncHandler(async (req, res) => {
    // Get device data & operation system
    console.log(req.headers)
});

