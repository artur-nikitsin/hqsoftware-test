var drake = dragula([document.querySelector('#toDo'), document.querySelector('#inProgress'), document.querySelector('#done')]);


$(document).ready(function () {

    var thisColumn;
    $("#addToDoTileButton").on("click", showModal);
    $("#addInProgressTileButton").on("click", showModal);
    $("#addDoneTileButton").on("click", showModal);

    function showModal() {

        if (this.id == "addToDoTileButton"){
            thisColumn ="#toDo";
        }
        if (this.id == "addInProgressTileButton"){
            thisColumn ="#inProgress";
        }
        if (this.id == "addDoneTileButton"){
            thisColumn ="#done";
        }

        $("#addModal").modal("show");

    };


    $("#saveNewTileButton").on("click", function () {

        var newTileTitle = $("#newTileTitleInput").val();
        var newTileDescription = $("#newTileDescriptionInput").val();
        ;
        var newTileImage;


        var newTile = "<div class=\"card\" style=\"width: 18rem;\">\n" +
            "<img class=\"card-img-top\" src=\"img/Без%20названия.svg\" alt=\"Card image cap\">\n" +
            "<div class=\"card-body\">\n" +
            "<h5 class=\"card-title\"> " + newTileTitle + "</h5>\n" +
            "<p class=\"card-text\">" + newTileDescription + "</p>\n" +
            "<a href=\"#\" class=\"btn btn-secondary\">Edit</a>\n" +
            "</div>\n" +
            "</div>";


        $(thisColumn).append(newTile);

        $("#addModal").modal("hide");
        $("#newTileTitleInput").val("");
        $("#newTileDescriptionInput").val("");


    })


});
