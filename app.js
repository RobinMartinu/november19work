const http = require('http');
const fs = require('fs');
const url = require('url');



// const apiDenVTydnu = require('./modules/api-denvtydnu').apiDenVTydnu;
const apiCislo = require('./api-cislo').apiCislo;

const number ="";

let guess = "";



function processStaticFiles (res, fileName){
    fileName = fileName.substr(1);
    console.log(fileName);
    let contentType = "text/html";

    if (fileName.endsWith(".png")){
        contentType = "image/png";
    } else if (fileName.endsWith(".jpg")){
        contentType = "image/jpeg";
    }

    if (fs.existsSync(fileName)){
        fs.readFile(fileName, function(err, data) {
                res.writeHead(200, {'Content-Type': contentType});
                res.write(data);
                res.end();
            }
        )
    } else {
        res.writeHead(404);
        res.end();
    }

}

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    if (q.pathname == "/") {

        processStaticFiles(res, "/index.html");
        return;
    }
    if (q.pathname == "/clicker") {

        processStaticFiles(res, "/nextGame.html");
        return;
    }
    if (q.pathname.lastIndexOf(".") > -1 && q.pathname.length - q.pathname.lastIndexOf(".") < 6){

        processStaticFiles(res, req.url);
        return;
    }

    if (q.pathname == "/blablabla") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>blablabla</body></html>");

    }
    else if(q.pathname.startsWith("/cislo/")){
    apiCislo(req,res);
    }


    else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body> Nothing here</body></html>");
    }
}).listen(8080);