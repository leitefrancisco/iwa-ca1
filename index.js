
const express = require("express"),
fs = require("fs"),
http = require("http"),
path = require("path"),
xml2js = require("xml2js"),
xmlParse = require ("xslt-processor").xmlParse,
xsltProcess = require("xslt-processor").xsltProcess,
uuid = require("uuid")
;

const router = express(),
server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,"views")));
router.use(express.json());

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
                    console.log(rec);
                    let recJsonStr = JSON.stringify(rec);
                    res.end(recJsonStr); //Serve back the user
                }
            }
        });
    };
    getRecipeJSON(req.query);
});

router.post('/post/delete', function(req, res){
    function deleteJSON(obj){
        if(obj===undefined){
            throw ("invalid request");
        }
        // console.log(obj)
        XMLtoJSON('recipes.xml', function(err, result){
            if (err) throw (err);
            let recipes = result.recipes.recipe;
            for(let i=0; i<recipes.length; i++){
                let rec = recipes[i];
                if(rec.id[0]==obj.id){ // filter
                    // console.log(rec);
                    delete recipes[i];
                }
                // console.log(recipes);
            }
            JSONtoXMLFile('recipes.xml', result, function(err){
                if (err) console.log(err);
                // res.redirect('back');
                res.end();
            });
        });
    }; 

    deleteJSON(req.body);
});

router.get("/get/recipes-titles",function(req, res){

        res.writeHead(200, {'Content-Type' : 'text/html'}); //Tell the user that the resource exists and which type that is
    
        let xml = fs.readFileSync('recipes.xml', 'utf8'), //read in the XML file
            xsl = fs.readFileSync('recipes-titles.xsl', 'utf8'); //read in the XSL file

        let doc = xmlParse(xml), //Parse the XML file
            stylesheet = xmlParse(xsl); //Parse the XSL file
    
        let result = xsltProcess(doc, stylesheet); //Performing XSLT
    
        res.end(result.toString()); //Serve back the user    
        
    });

function addOrEdit(recipe, res) {
    if(recipe.id=="") {
        addRecipe(recipe, res);
    }else{
        editRecipe(recipe, res);
    }
}

function addRecipe(recipe, res) {
    // xml 
    console.log("add");
    recipe.id = uuid.v4();
    XMLtoJSON('recipes.xml', function(err, result){
        console.log("xmltojson");
        
        if (err) throw (err);
        // let recipes = result.recipes.recipe;
        result.recipes.recipe.push(recipe);
        console.log(result);
        
        JSONtoXMLFile('recipes.xml', result, function(err){
            if (err) console.log(err);
            // res.redirect('back');
            res.end();
        });
    });
}

function editRecipe(recipe, res) {
    //xml
    console.log("edit: " + recipe.id);
    XMLtoJSON('recipes.xml', function(err, result){
        if (err) throw (err);
        let recipes = result.recipes.recipe;
        for(let i=0; i<recipes.length; i++){
            let rec = recipes[i];
            if(rec.id[0]==recipe.id){ // filter
                // console.log(rec);
                delete recipes[i];
                result.recipes.recipe.push(recipe);
            }
            // console.log(recipes);
        }
        JSONtoXMLFile('recipes.xml', result, function(err){
            if (err) console.log(err);
            // res.redirect('back');
            res.end();
        });
    });
}

router.post('/post/add-or-update', function(req, res){
    console.log("Request Body")
    console.log(req.body);
    
    addOrEdit(req.body.recipe, res);
});    
    
router.post("/recipes", function(req, record){});

server.listen(process.env.PORT || 3001,
    process.env.IP || "0.0.0.0",
    function () {
        const addr = server.address();
        console.log("Server listening at", addr.address + ":" + addr.port);
    }
);

