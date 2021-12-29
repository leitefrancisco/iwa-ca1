var currentSelected='';


function openRecipe(recipeId){
    draw_recipe();
}

function draw_recipe(){
    $("#middle").empty();
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#middle").append(html);
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