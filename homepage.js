const HOST = window.location.protocol + "//" + window.location.hostname + ((window.location.port) ? ":" + window.location.port : "");

function load (){
    fetch(HOST + "/cislo/newguess").then(function(response) {
        return response.text().then(function(text) {
            let obj = JSON.parse(text);

            let number = obj.guessed;



            alert (number);

        });
    });
}
