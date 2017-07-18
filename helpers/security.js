const crypto = require('crypto');

class Security {
    constructor() {
        this.hash = crypto.createHash('sha256');
    }

    generateHash(text, salt) {
        return crypto.createHash('sha256').update(text + salt).digest('base64');
    }

    async verifyLogin(user, token) {
        let res = await global.pg_pool.query('SELECT token, salt FROM public.user WHERE id = $1', [user]);
        if (res.rows.length === 0) return false;
        let authStuff = res.rows[0];
        let hash = this.generateHash(token, authStuff.salt);
        return hash === authStuff.token;
    }
}

module.exports = new Security();