const http = require('http');

const url = require('url');
const fs = require('fs');
const path = require('path');

const test = null;
const PORT = 4000;

// Maps file extension to MIME types which
// helps the browser to understand what to
// do with the file
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
};


const app = http.createServer(function (request,response){
    const parsedUrl = url.parse(request.url);
    // index route to showcase what all files are there in root of the folder
    if (parsedUrl.pathname === "/") {
        let filesLink = "<ul>";
        response.setHeader('Content-type', 'text/html');
        let filesList = fs.readdirSync("./");
        filesList.forEach(element => {
            if (fs.statSync("./" + element).isFile()) {
                filesLink += `<br/><li><a href='./${element}'>
					${element}
				</a></li>` ;
            }
        });

        filesLink += "</ul>";

        response.end("<h1>List of files:</h1> " + filesLink);
    }
    
    // customized  test route
    if (parsedUrl.pathname === "/test") {
        response.write("this is test url response")
         response.end();    
    }

    // dynamic url based on user action
    // whether the user has accessed a particular file in my root directory
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);
    if (!fs.existsSync(pathname)) {
        response.statusCode = 404;
        response.end(`File ${pathname} not found!`);
    }else{
        //check extension of the file and fetch the mime content
        fs.readFile(pathname, function (err, data) {
            if (err) {
                response.statusCode = 500;
                response.end(`Error in getting the file.`);
            }
            else {
                const ext = path.parse(pathname).ext;
                response.setHeader('Content-type',
                    mimeType[ext] || 'text/plain');

                response.end(data);
            }
        })
    }
})
app.listen(PORT, function(){
    console.log("server started with port number 4000");
})