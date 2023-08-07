const jwt = require('jsonwebtoken');

class JwtTokenHandler {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    generateToken(payload, expiresIn = '1h') {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = JwtTokenHandler