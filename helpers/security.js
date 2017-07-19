const crypto = require('crypto');

class Security {
    constructor() {
        this.hash = crypto.createHash('sha256');
    }

    generateHash(text, salt) {
        return crypto.createHash('sha256').update(text + salt).digest('base64');
    }

    generateToken() {
        return new Promise((res, rej) => {
            crypto.randomBytes(64, (err, buf) => {
                if (err) rej(err);
                else res(buf.toString('base64').replace(/=/g, '').replace(/[^\w-]/g, '.'));
            });
        });
    }

    generateSalt() {
        return new Promise((res, rej) => {
            crypto.randomBytes(8, (err, buf) => {
                if (err) rej(err);
                else res(buf.toString('base64').replace(/\W/g, ''));
            });
        });
    }

    async setToken(user, token, salt) {
        token = this.generateHash(token, salt);

        try {
            let res = await global.pg_pool.query(`INSERT INTO public.user (id, token, salt) VALUES ($1, $2, $3)
                ON CONFLICT (id) DO UPDATE SET token=$2, salt=$3`,
                [user, token, salt]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
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