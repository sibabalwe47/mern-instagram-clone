const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
     const salt = await bcrypt.genSalt(10);
     return (password = await bcrypt.hash(password, salt));
}


exports.decodePassword = async (password) => {
    console.log(password);
}