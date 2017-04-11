var app = require('express')();

var recordModel = require('./model/currencyRecord');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', "content-type");
    next();
})

app.get('/getrate', (req, res) => {
    recordModel.getData().then(response => {
        var objlist = [];
        var record_list = response.split('\n');
        for (var i = 0; i < record_list.length; i++) {
            var record = record_list[i];
            fields = record.split(',');

            if(fields.length < 9)
                continue;

            var obj = {
                'pair_symbol': fields[0],
                'timestamp': fields[1],
                'bid_bigfigure': fields[2],
                'bid_points': fields[3],
                'offer_bigfigure': fields[4],
                'offer_points': fields[5],
                'high': fields[6],
                'low': fields[7],
                'open': fields[8]
            }
            objlist.push(obj);
        }
        res.send(JSON.stringify(objlist));
    })
})


app.use('*', (req, res) => {
    res.status(500).send(
        '<b>This method is not defined\n<b>'
    )
})

app.listen(4000);