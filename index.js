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

function XMLtoJSON(filename, cb){
    let filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr){
        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
};

function JSONtoXMLDoc( obj) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(obj);
    return xml;
};

function JSONtoXMLFile(filename, obj, cb) {
    let xml = JSONtoXMLDoc(obj, cb)
    let filepath = path.normalize(path.join(__dirname, filename));
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
};

router.get("/get/recipe", function(req, res){

     res.writeHead(200, {'Content-Type' : 'application/json'}); //Tell the user that the resource exists and which type that is
  
    function getRecipeJSON(obj){

        // console.log(obj)
        // XML => JSON => (FILTER)
        XMLtoJSON('recipes.xml', function(err, result){
            if (err) throw (err);
            let recipes = result.recipes.recipe;

            for(let i=0; i<recipes.length; i++){
                let rec = recipes[i];
                if(rec.id[0]==obj.id){ // filter
                    console.log("Found");
                    // console.log(rec);
                    let recJsonStr = JSON.stringify(rec);
                    res.end(recJsonStr); //Serve back the user
                }
            }
            // let empty = {
            //     id: [ '0' ],
            //     title: [ '' ],
            //     ingredients: [ { ingredient: [] } ],
            //     instructions: [ '' ]
            //   }
            // res.end(JSON.stringify(empty)); //Serve back the user with none found // look into throuw a 404
        });
    };
    getRecipeJSON(req.query);
});

router.post('/post/delete/:id', function(req, res){
    // res.writeHead(200, {'Content-Type' : 'application/json'});

    function deleteJSON(obj){

        console.log(obj)
    
        XMLtoJSON('recipes.xml', function(err, result){
            if (err) throw (err);
            let recipes = result.recipes.recipe;
            for(let i=0; i<recipes.length; i++){
                let rec = recipes[i];
                if(rec.id[0]==obj){ // filter
                    console.log(rec);
                    delete recipes[i];
                    // let recJsonStr = JSON.stringify(rec);
                    // res.end(recJsonStr); //Serve back the user
                }
                console.log(recipes);
            }
            JSONtoXMLFile('recipes.xml', result, function(err){
                if (err) console.log(err);
                res.redirect('back');
            });
        });
    };

    deleteJSON(req.params.id);
});


router.get("/get/recipes-titles",function(req, res){

        res.writeHead(200, {'Content-Type' : 'text/html'}); //Tell the user that the resource exists and which type that is
    
        let xml = fs.readFileSync('recipes.xml', 'utf8'), //read in the XML file
            xsl = fs.readFileSync('recipes-titles.xsl', 'utf8'); //read in the XSL file
    
            console.log(xml)
        let doc = xmlParse(xml), //Parse the XML file
            stylesheet = xmlParse(xsl); //Parse the XSL file
    
        let result = xsltProcess(doc, stylesheet); //Performing XSLT
    
        res.end(result.toString()); //Serve back the user    
        
    });
    
router.post("/recipes", function(req, record){});

server.listen(process.env.PORT || 3000,
    process.env.IP || "0.0.0.0",
    function () {
        const addr = server.address();
        console.log("Server listening at", addr.address + ":" + addr.port);
    }
);

