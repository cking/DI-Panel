const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('main', {
        data: {
            otherData: 'Something else'
        },
        vue: {
            head: {
                title: 'Page Title'
            },
            components: ['pageheader', 'pagefooter', 'floatything']
        }
    });
});

module.exports = router;