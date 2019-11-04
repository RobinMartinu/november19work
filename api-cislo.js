const url = require('url');

function nahodneCisloOdDo(minimum, maximum) {
    return minimum + Math.trunc((maximum-minimum+1)*Math.random());
}


exports.apiCislo = function(req, res){
    let q = url.parse(req.url, true);

    if (q.pathname == "/cislo/newguess") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let obj = {};

        let number = nahodneCisloOdDo(1, 4);

        obj.guessed = number;
        res.end(JSON.stringify(obj));

    } else if (q.pathname == "/cislo/inputnumber"){
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let obj = {};

        let number = nahodneCisloOdDo(1, 4);

        obj.guessed = number;
        res.end(JSON.stringify(obj));

    }

}