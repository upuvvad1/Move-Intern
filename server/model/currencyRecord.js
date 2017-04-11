var request = require('request');
exports.getData = function () {

    return new Promise((resolve, reject) => {
        request.get({
            url: 'http://webrates.truefx.com/rates/connect.html?f=csv'
        }, (err, response, body) => {
            resolve(body)
        })
    })
}