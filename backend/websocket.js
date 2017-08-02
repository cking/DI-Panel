const Websocket = require('ws');
const http = require('http');
const moment = require('moment');
const expressWs = require('express-ws');

class WebsocketServer {
    constructor(app) {
        expressWs(app);
        app.ws('/ws', this.newConnection.bind(this));
        this.wsMap = {};
    }

    async newConnection(ws, req) {
        let { userid, auth } = req.headers;
        console.log('New connection from', userid);
        if (await global.helpers.Security.verifyLogin(userid, auth))
            ws.on('message', msg => this.onMessage(ws, msg, userid));
        else ws.close(4001, 'Invalid login credentials.');
    }

    async onMessage(ws, msg, userid) {
        msg = JSON.parse(msg);
        if (typeof msg === 'object' && msg.hasOwnProperty('code')) {
            switch (msg.code) {
                case 'setsettings': {
                    let newerSettings = [];
                    for (const key in msg.data) {
                        try {
                            let time = moment(msg.data[key].lastModified);
                            let res = await global.pg_pool.query('SELECT encrypted_data, last_modified FROM public.setting WHERE userid=$1 AND settings_key=$2',
                                [userid, key]);
                            if (res.rows.length > 0 && res.rows[0].last_modified) {
                                let lastModified = moment(res.rows[0].last_modified);
                                if (lastModified.valueOf() > time.valueOf()) {
                                    newerSettings.push({ key, data: res.rows[0].encrypted_data });
                                    continue;
                                }
                            }
                            await global.pg_pool.query(`INSERT INTO public.setting 
                                (userid, settings_key, encrypted_data, last_modified)
                                VALUES ($1, $2, $3, $4)
                                ON CONFLICT (userid, settings_key) DO
                                UPDATE SET
                                    encrypted_data=$3,
                                    last_modified=$4`,
                                [userid, key, msg.data[key].encrypted, time.format()]);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                    if (newerSettings.length > 0) {
                        ws.send(JSON.stringify({ code: 'settings', data: newerSettings }));
                    }

                }
            }
        }
    }
}

module.exports = WebsocketServer;