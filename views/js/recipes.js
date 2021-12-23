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

$(document).ready(function(){
    draw_recipes();
});