var currentSelected='';
var jsonFile = '';

function refresh_page(){
    $("#middle").html("");
    getTitles();
}

function add_new_row(){
    $("#ingredients-row").append('<input type="text" class="form-control">')
};

function delete_last_ingredient_row(){
    var list = document.getElementById("ingredients-row");   
    list.removeChild(list.childNodes[list.childNodes.length -1]);    
};

function open_recipe(recipeId){
    $("#middle").empty();
    draw_recipe(recipeId);
    currentSelected = recipeId;
};

function add_new_recipe(){
    $("#middle").empty();
    currentSelected = '';
    let strHtml =   "<form class = 'ingredients-form'>"+
                    "<label for='recipe-name' class='form-label'>Recipe Name:</label>"+
                    "<input type='text' class='form-control' id='recipe-name'>"+
                    "<div class='mb-3'>"+
                    "<label class='form-label'>Ingredients:</label>"+
                    "<div id = 'ingredients-row' class='col-4'>"+                        
                    "<input type='text' class='form-control'>"+                      
                    "</div>"+
                    "<button id = 'btnRemoveRow' type='button' class='btn btn-warning' style= 'float:right' onclick='delete_last_ingredient_row()'> Remove Last Ingredient Row </button>"+
                    "<button id = 'btnAddRow' type='button' class='btn btn-info' style='float: right' onclick='add_new_row()'>Add Ingredient Row</button>"+
                    "</div>"+
                    "<div class='mb-3'>"+
                    "<label for='recipe-Instructions' class='form-label'>Instructions:</label>"+
                    "<div id = 'instructions-row'>"+
                    "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' ></textarea>"+
                    "</div>"+
                    "</div>"+
                    "<button type='button' class='btn btn-primary' onclick ='getFields(0)' >Save Recipe</button>"+
                    "</form>";
    $("#middle").append(strHtml);

};

function draw_recipe(recipeId){
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            data: "id="+ recipeId,
            type: 'GET',
            cache: false,
            success: function(rec) {
                
                //$("#middle").append(html);
                console.log(rec);
                
                let ingredients = rec.ingredients[0].ingredient;
                let strHtml = "<div class='row'>"+
                    "<div class='col'>"+
                    "<h1>"+rec.title+"</h1>"+
                    "<h2>Ingredients</h2>"+
                    "<ul>"

                for(let i=0; i < ingredients.length;i++){
                    
                    strHtml += "<li>" + ingredients[i] + "</li>";
                        
                }

                strHtml+="</ul>"+
                    "<h2>Instructions</h2>"+
                    "<p>"+ rec.instructions +"</p>"
                    "</div>"
                   
                $("#middle").append(strHtml);

            },
            error: function(r) {
                console.log("Error " + r.responseText);
            }
        });
    };
    $.getHTMLuncached("/get/recipe");
    
};



function delete_recipe(){
    
    $.delete = function(url) {
        $.ajax(
            {
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: {id: currentSelected},
                success: setTimeout(refresh_page,1000)
            }
        )
    };
    $.delete('/post/delete/'+currentSelected);
  
};

function save_eddited_recipe() {

    $.edit = function (url) {
        $.ajax(
            {
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: { jsonFile },
                success: setTimeout(refresh_page, 1000)
            }
        )
    };
    $.edit('/post/edit/');

};

function save_new_recipe() {

    $.add = function (url) {
        $.ajax(
            {
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: { jsonFile },
                success: setTimeout(refresh_page, 1000)
            }
        )
    };
    $.add('/post/add/');

};

function edit_recipe(){
    $("#middle").empty();
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            data: "id="+ currentSelected,
            type: 'GET',
            cache: false,
            success: function(rec) {
                
                //$("#middle").append(html);
                console.log(rec);
                
                let ingredients = rec.ingredients[0].ingredient;
                let strHtml = "<form class = 'ingredients-form'>"+
                    "<label for='recipe-name' class='form-label'>Recipe Name:</label>"+
                    "<div id = 'recipeName-row' class='col-8'></div>"+
                    "<input type='text' class='form-control' id='recipe-name' value = '"+rec.title+"'>"+
                    "</div>"+
                    "<div class='mb-3'>"+
                    "<label class='form-label'>Ingredients</label>"+
                    "<div id = 'ingredients-row' class='col-4'>";
                
                for(let i=0; i < ingredients.length;i++){
                    strHtml +="<input type='text' class='form-control ' value = '"+ingredients[i]+"'>";
                }

                strHtml += "</div>"+
                    "<button id = 'btnRemoveRow' type='button' class='btn btn-warning' style= 'float:right' onclick='delete_last_ingredient_row()'> Remove Last Ingredient Row  </button>"+
                    "<button id = 'btnAddRow' type='button' class='btn btn-info' style='float: right' onclick='add_new_row()'>Add Ingredient Row</button>"+
                    "</div>"+
                    "<div class='mb-3'>"+
                    "<label for='recipe-Instructions' class='form-label'>Instructions:</label>"+
                    "<div id = 'instructions-row'>"+
                    "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' >"+rec.instructions+"</textarea>"+
                    "</div>"+
                    "</div>"+
                    "<button type='button' class='btn btn-primary' onclick= 'get_fields(1)'>Save Recipe</button>"+
                    "</form>";
                $("#middle").append(strHtml);

            },
            error: function(r) {
                console.log("Error " + r.responseText);
            }
        });
    };
    $.getHTMLuncached("/get/recipe");
    
};

//https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


function getFields(obj){
    
    var recipe_id ='';

    if (currentSelected != ''){
        recipe_id = currentSelected;
    }
    else{
        recipe_id = uuidv4();
    }

    var title = document.getElementById("recipe-name").value.trim();
    var instructions = document.getElementById("recipe-instructions").value.trim();
    var list = document.querySelectorAll("#ingredients-row > input");
    var ingredients =[]
    if (list != null && list.length>0){
        for (var i = 0; i<list.length ; i++){
            eachElement = list[i].value;
            ingredients.push(eachElement);
        }
    }
    var strJSON = "{"+
        "'title': '"+title+"',"+
        "'id':'"+ recipe_id+"',"+
        "'ingredients':[";

        for(var i = 0 ;i<ingredients.length;i++){
            strJSON +="'"+ ingredients[i]+"'"
            if(i<ingredients.length-1){
                strJSON +=","
            }
        }

        strJSON+="],"+
        "'instructions' :'"+instructions+"'}";
            
    console.log(strJSON);
  
    
    
}

function generate_id(){

}

function getTitles(){
    $("#menu-recipes").empty();
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#menu-recipes").append(html);
            }
        });
    };
    $.getHTMLuncached("/get/recipes-titles");
};


$(document).ready(function(){
    getTitles();
});