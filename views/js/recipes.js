var currentSelected='';


function openRecipe(recipeId){
    draw_recipe(recipeId);
}

function draw_recipe(recipeId){
    $("#middle").empty();
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
                let strHtml = "<form>"

                strHtml += "<h1>" + rec.title + "</h1>"
                
                for(let i=0; i < ingredients.length;i++){
                    strHtml += "<label>ingredient</label><input type='text' value='"+ingredients[i]+ "'>"
                }
                strHtml += "</form>";
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