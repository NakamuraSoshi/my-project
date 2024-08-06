const HttpStatus = require('../../config/httpStatus');


const checkUser = (req, res) => {
    res.status(HttpStatus.成功).json({ message: 'ユーザーは認証されています' });
};

module.exports = { checkUser };
