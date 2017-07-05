module.exports = function (app, title, url, isNotJson) {
    url = url ? url : '/api';
    var apis = app._router.stack.filter(layer =>
        layer.route).map(layer => {
        return {
            json: !isNotJson,
            url: layer.route.path,
            methods: Object.keys(layer.route.methods).map(k => k.toUpperCase())
        }
    });

    app.get(url + '/testPage', function (req, res) {
        res.sendFile(`${__dirname}/tester.html`);
    });
    app.get(url + '/tester.js', function (req, res) {
        res.sendFile(`${__dirname}/tester.js`);
    });
    app.get(url + '/vendor.js', function (req, res) {
        res.sendFile(`${__dirname}/vendor.js`);
    });

    app.get(url + '/apis.js', function (req, res) {
        res.send(`var title='${title ? title : "스프링 API 테스터"}';var apis = ${JSON.stringify(apis)}`)
    });


};