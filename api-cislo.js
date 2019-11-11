const url = require('url');
let guessedNumber = "";


function nahodneCisloOdDo(minimum, maximum) {
    return minimum + Math.trunc((maximum-minimum+1)*Math.random());
}


exports.apiCislo = function(req, res){
    let q = url.parse(req.url, true);

    if (q.pathname == "/cislo/newguess") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let obj = {};

        let number = nahodneCisloOdDo(1, 4);


        guessedNumber= number;

        obj.guessed = number;
        obj.message = "";

        if (obj.guessed == 1){
            obj.message = "One";
        } else if (obj.guessed == 2){
            obj.message = "Two";
        } else if (obj.guessed == 3) {
            obj.message = "Three";
        } else if (obj.guessed == 4) {
            obj.message = "Four";
        }
/*
        switch (number) {
            case 1:
                obj.message = "One";
                break;
            case 2:
                obj.message = "Two";
                break;
            case 3:
                obj.message = "Three";
                break;
            case 4:
                obj.message = "Four";
                break;
        }
*/

        res.end(JSON.stringify(obj));

    } else if (q.pathname == "/cislo/guessnumber"){
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let obj = {};
        let q = url.parse(req.url, true);
        let isGuessed = false;
            if (q.query["guess"] && (q.query["guess"] == guessedNumber)){
                isGuessed = true;
            }
        obj.isRight = isGuessed;
        res.end(JSON.stringify(obj));

    }

};