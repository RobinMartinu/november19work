const url = require('url');

let ids = [];

// occasionally clears the array to save memory
// also sets max users online
let maxUsers = 100;


function nahodneCisloOdDo(minimum, maximum) {
    return minimum + Math.trunc((maximum-minimum+1)*Math.random());
}


exports.apiCislo = function(req, res){
    let q = url.parse(req.url, true);

    if (q.pathname === "/cislo/newguess") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});


        if (ids.length > maxUsers){
            ids = [];
        }


        let obj = {};
        let guess = {};
        let number = nahodneCisloOdDo(1, 4);

        guess.guessed = number;
        guess.message = "";

        if (guess.guessed === 1){
            guess.message = "One";
        } else if (guess.guessed === 2){
            guess.message = "Two";
        } else if (guess.guessed === 3) {
            guess.message = "Three";
        } else if (guess.guessed === 4) {
            guess.message = "Four";
        }

        obj.message = guess.message;
        obj.id = ids.push(guess)-1;

        // debug what saves into array, should be in form
        // [ {guessed: 1, message: 'One'} ]
       // console.log(ids);


        res.end(JSON.stringify(obj));

    } else if (q.pathname === "/cislo/guessnumber"){
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let obj = {};
        let q = url.parse(req.url, true);
        let isGuessed = false;
        let id = Number(q.query["id"]);
        let idValid = false;

        //checks for validity of ID in case of deleting the array
        if (id < ids.length){
            idValid = true;
        } else {
            isGuessed = undefined;
        }
        console.log('ID Valid:' + idValid);

        if ( idValid && q.query["guess"] && (q.query["guess"] == ids[id].guessed)) {
            isGuessed = true;
        }

        obj.isRight = isGuessed;
        res.end(JSON.stringify(obj));

    }

};