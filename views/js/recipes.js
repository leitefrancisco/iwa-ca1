var currentSelected='';
// function fnGet(url, callbackFn){
//     return $.ajax({
//         url: url,
//         type: 'GET',
//         cache: false,
//         success:  callbackFn});
// }

function openRecipe(recipeId){
    alert(recipeId);
}

function draw_recipes(){
    $("#main").empty();
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#main").append(html);
            }
        });
    };
    $.getHTMLuncached("/get/recipes");
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
    // draw_recipes();
    getTitles();
    // fnGet("/get/recipes", function(data){console.log(data)});
    // var fnCall = function(d) {
        
    // }
    // fnGet("/get/recipes", fnCall)

});