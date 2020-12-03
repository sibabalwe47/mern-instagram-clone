const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();
const Session = require("../models/Session");
const asyncHandler = require("express-async-handler");

exports.generateSessionData = asyncHandler(async (deviceData, userId, token) => {
    const device = deviceDetector.parse(deviceData);
    let session = new Session({
        user: userId,
        device: device.device.type,
        os: device.os.name,
        token: token
    });
    const createdSession = await session.save();

    console.log(createdSession);
})
