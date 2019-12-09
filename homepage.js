
const HOST = window.location.protocol + "//" + window.location.hostname + ((window.location.port) ? ":" + window.location.port : "");

let numbersRight = 0;
let id = "";
let idTimer = "";

function intro (){
    alert ("Procvičte si s námi angličtinu, klikněte na číslici, jejíž jméno se Vám ukáže.");
    load();

    fetch(HOST + "/cislo/timerstart").then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);


            idTimer = obj.id;


        });
    });

}
function load (){

    fetch(HOST + "/cislo/newguess").then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            document.getElementById("goal").innerText = obj.message;
            id = obj.id;


        });
    });



}

function checkGuess(guess) {

    let url = HOST + "/cislo/guessnumber?guess=" + guess + "&id=" + id;

     fetch(url).then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            if (obj.isRight) {
                    document.getElementById("message").value += guess;
                    numbersRight++;
                    if (numbersRight === 4){
                        numbersRight = 0;
                        win();
                    } else {
                        load();
                    }
            } else if (obj.isRight === undefined) {
                    // should refresh the page if fetch returns undefined
                        alert ('Něco se pokazilo, moc se omlouváme a obnovujeme stránku');
                        location.reload();
                    }

        });
    });
}

function win (){
    let timerEnd = "";
    let url = HOST + "/cislo/timerstop?idTimer=" + idTimer;

     fetch(url).then(function(response) {
        response.text().then(function(text) {
            let obj = JSON.parse(text);
            timerEnd = obj.timerDur;
            document.getElementById("goal").innerText = "Blahopřejeme, vyhráli jste za: " + timerEnd + " s";

            setTimeout(newGame, 2000);
        });
    });




}

function newGame (){
    document.getElementById("message").value = "";
    intro();
}





