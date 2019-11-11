const HOST = window.location.protocol + "//" + window.location.hostname + ((window.location.port) ? ":" + window.location.port : "");
let numbersRight = 0;
function load (){
    fetch(HOST + "/cislo/newguess").then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            alert (obj.message);

        });
    });
}

function checkGuess(guess) {

    let url = HOST + "/cislo/guessnumber?guess=" + guess;

     fetch(url).then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            if (obj.isRight) {
                    document.getElementById("message").value += guess;
                    numbersRight++;
                    if (numbersRight == 4){
                        numbersRight = 0;
                        win();
                    } else {
                        load();
                    }
            }

        });
    });
}

function win (){
    alert("Blahopřejeme, vyhráli jste!");
    setTimeout(newGame,2000);

}

function newGame (){
    document.getElementById("message").value = "";
    load();
}





