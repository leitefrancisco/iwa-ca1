const express = require("express"),
fs = require("fs"),
http = require("http"),
path = require("path"),
xml2js = require("xml2js"),
xmlParse = require ("xslt-processor").xmlParse,
xsltProcess = require("xslt-processor").xsltProcess;

const router = express(),
server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,"views")));

router.get("/get/recipes",function(req, res){
// application/json
// text/html
    res.writeHead(200, {'Content-Type' : 'text/html'}); //Tell the user that the resource exists and which type that is

    let xml = fs.readFileSync('recipes.xml', 'utf8'), //read in the XML file
        xsl = fs.readFileSync('recipes.xsl', 'utf8'); //read in the XSL file


    let doc = xmlParse(xml), //Parse the XML file
        stylesheet = xmlParse(xsl); //Parse the XSL file

    let result = xsltProcess(doc, stylesheet); //Performing XSLT

    res.end(result.toString()); //Serve back the user
    // res.end('{"nome": "xico", "idade": "velho pra caralho"}');

});

router.get("/get/recipes-titles",function(req, res){
    // application/json
    // text/html
        res.writeHead(200, {'Content-Type' : 'text/html'}); //Tell the user that the resource exists and which type that is
    
        let xml = fs.readFileSync('recipes.xml', 'utf8'), //read in the XML file
            xsl = fs.readFileSync('recipes-titles.xsl', 'utf8'); //read in the XSL file
    
    
        let doc = xmlParse(xml), //Parse the XML file
            stylesheet = xmlParse(xsl); //Parse the XSL file
    
        let result = xsltProcess(doc, stylesheet); //Performing XSLT
    
        res.end(result.toString()); //Serve back the user
        // res.end('{"nome": "xico", "idade": "velho pra caralho"}');
    
    });
    
router.post("/recipes", function(req, record){});

server.listen(process.env.PORT || 3001,
    process.env.IP || "0.0.0.0",
    function () {
        const addr = server.address();
        console.log("Server listening at", addr.address + ":" + addr.port);
    }
);

