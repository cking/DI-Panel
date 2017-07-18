const router = require('express').Router();

const errors = {
    noauth: { error: 'Failed to authenticate' }
};

router.get('/', (req, res, next) => {
    res.send('<img src="https://img.buzzfeed.com/buzzfeed-static/static/2014-05/30/9/enhanced/webdr02/anigif_enhanced-buzz-4865-1401455777-27.gif" class="full"/> <style>* { height: 100%; width: 100%; margin: 0; padding: 0; }</style>');
});

router.get('/settings/:userid/:plugin', async (req, res, next) => {
    if (!await authenticate(req, res)) return;
});

async function authenticate(req, res) {
    let key = req.get('di-auth');

    if (!key || global.helpers.Security.verifyLogin(req.params.userid, key))
        res.status(401).json(errors.noauth);
}



module.exports = router;