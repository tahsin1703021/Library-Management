const http = require('http');

const fs = require('fs');

const server = http.createServer((req,res) => {

    if (req.url === '/'){
        res.end("Hello to the welcome page");
    }else if (req.url === '/about') {
        res.end("Hello to the about page");
    }else if (req.url === '/contact') {
        res.end("Hello to the contact page");
    }else if (req.url === '/bookAPI') {
        fs.readFile(`${__dirname}/books.json`, "utf-8", (err, data)=>{
            // console.log(data);
            // const obj = JSON.parse(data);
            res.end(data);
        });
        // res.end(`${__dirname}`);
        // res.end("Hello to the bookAPI page");
    }else {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1> 404 error pages. Page doesn't exist </h1>");
    }


});

server.listen(8080,()=>{
    console.log('Listening to the server port');
});
