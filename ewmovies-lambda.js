const xmljs = require('xml2js');                                                //*
const https = require('https');
const getStatus = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
    const options = { ...defaultOptions, path, method: 'GET' };
    const req = https.request(options, res => {
        let buffer = "";
        let jsonOut;                                                            //*
        res.on('data', chunk => buffer += chunk)
        xmljs.parseString(buffer, (err, result) => {                            //*
            if(err) {                                                           //*
                throw err;                                                      //*
            }                                                                   //*

        // `result` is a JavaScript object
        // convert it to a JSON string
        jsonOut = JSON.stringify(result, null, 4);                              //*
        });                                                                     //*
        //res.on('end', () => resolve(/*JSON.parse*/buffer)) //(buffer)     //*
        res.on('end', () => resolve(JSON.parse(jsonOut)))                   //*
    });
    req.on('error', e => reject(e.message));
    req.write(JSON.stringify(payload)); // (payload)                        //*
    req.end();
});

exports.handler = async (event) => {
    // TODO
    const defaultOptions = {
        host: 'easyware.webaissance.com', //_hostname : example.com, passed from event as a parameter
        port: 443, // or 80 for http
        headers: {
         'Content-Type': 'application/xml',
        }
    };
    var status_info = await getStatus(defaultOptions, '/feeds/CircleCinema/parsefeed.php?key=8^h7B%gt5bn(Q', ''); //_pathname : /user/add, passed from event as a parameter
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(status_info)
        //body: status_info
    };
    const headers = {
        "Access-Control-Allow-Headers" : "application/xml",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };
    return {
        response,
        headers
    };
};