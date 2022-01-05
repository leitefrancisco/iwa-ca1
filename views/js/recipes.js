var currentSelected='';


function add_new_row(){
    $("#ingredients-row").append('<label class="extra-ingredients form-label">Ingredient:</label>'+'<input type="text" class="form-control">')
};

function delete_empty_rows(){

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
                    "<label class='form-label'>Ingredients</label>"+
                    "<div id = 'ingredients-row' class='col-4'>"+                        
                    "<input type='text' class='form-control '>"+                      
                    "</div>"+
                    "<button id = 'btnRemoveRow' type='button' class='btn btn-warning' style= 'float:right' onclick='delete_empty_rows()'> Remove Empty Ingredients Rows  </button>"+
                    "<button id = 'btnAddRow' type='button' class='btn btn-info' style='float: right' onclick='add_new_row()'>Add Ingredient Row</button>"+
                    "</div>"+
                    "<div class='mb-3'>"+
                    "<label for='recipe-Instructions' class='form-label'>Instructions:</label>"+
                    "<div id = 'instructions-row'>"+
                    "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' ></textarea>"+
                    "</div>"+
                    "</div>"+
                    "<button type='submit' class='btn btn-primary' >Save Recipe</button>"+
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
                success: setTimeout(getTitles(),1000)
            }
        )
    };
    $.delete('/post/delete/'+currentSelected);
   $("middle").empty();
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
                    
                    strHtml += "<label  class='form-label'>Ingredient:</label>" +
                        "<input type='text' class='form-control ' value = '"+ingredients[i]+"'>";
                        
                }

                strHtml += "</div>"+
                    "<button id = 'btnRemoveRow' type='button' class='btn btn-warning' style= 'float:right' onclick='delete_empty_rows()'> Remove Empty Ingredients Rows  </button>"+
                    "<button id = 'btnAddRow' type='button' class='btn btn-info' style='float: right' onclick='add_new_row()'>Add Ingredient Row</button>"+
                    "</div>"+
                    "<div class='mb-3'>"+
                    "<label for='recipe-Instructions' class='form-label'>Instructions:</label>"+
                    "<div id = 'instructions-row'>"+
                    "<textarea type  = 'text' class='form-control' id='recipe-instructions' rows='5' >"+rec.instructions+"</textarea>"+
                    "</div>"+
                    "</div>"+
                    "<button type='submit' class='btn btn-primary' >Save Recipe</button>"+
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