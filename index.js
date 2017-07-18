const express = require('express');
const expressVue = require('express-vue');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('vue', {
    componentsDir: path.join(__dirname, 'app', 'components'),
    defaultLayout: 'layout'
});

app.engine('vue', expressVue);
app.set('view engine', 'vue');

app.use(express.static('public'));

app.use('/', require('./routes/main'));

const port = 8099;
app.listen(port, () => {
    console.log('App listening on port', port);
});