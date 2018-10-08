var drake = dragula([document.querySelector('#toDo'), document.querySelector('#inProgress'), document.querySelector('#done')]);


$(document).ready(function () {

    var thisColumn;


    var tileId;
    $("#addToDoTileButton").on("click", showModal);
    $("#addInProgressTileButton").on("click", showModal);
    $("#addDoneTileButton").on("click", showModal);

    function showModal() {

        modalMode = "newTile";

        if (this.id == "addToDoTileButton") {
            thisColumn = "#toDo";
        }
        if (this.id == "addInProgressTileButton") {
            thisColumn = "#inProgress";
        }
        if (this.id == "addDoneTileButton") {
            thisColumn = "#done";
        }

        $("#addModal").modal("show");

    };


    var newIdCounter = 0;

    function setId() {
        newIdCounter++
    };


    $("#saveNewTileButton").on("click", function () {

        var newTileTitle = $("#newTileTitleInput").val();
        var newTileDescription = $("#newTileDescriptionInput").val();


        if (modalMode === "newTile") {

            var newTileImage;
            setId();
            var newTileId = "t" + newIdCounter;
            var newTilesButtonId = "b" + newIdCounter;


            var newTile = "<div id= " + newTileId + " class=\"tile\" style=\"width: 18rem;\">\n" +
                "<img class=\"card-img-top\" src=\"img/Без%20названия.svg\" alt=\"Card image cap\">\n" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\"> " + newTileTitle + "</h5>\n" +
                "<p class=\"card-text\">" + newTileDescription + "</p>\n" +
                "<a href=\"#\" id=" + newTilesButtonId + " newTilesButtonId class=\"btn btn-secondary\">Edit</a>\n" +
                "</div>\n" +
                "</div>";


            $(thisColumn).append(newTile);

            $("#addModal").modal("hide");
            $("#newTileTitleInput").val("");
            $("#newTileDescriptionInput").val("");
        }
        if (modalMode === "tileEditor") {

            $(tileId).find("h5").text(newTileTitle);
            $(tileId).find("p").text(newTileDescription);
            $("#addModal").modal("hide");
            $("#newTileTitleInput").val("");
            $("#newTileDescriptionInput").val("");
            modalMode = "newTile";


        }
    });


    $(document).on('click ', '.tile a', function () {

        modalMode = "tileEditor";

        var tileTitle, tileDescription, tileImage;
        tileId = "#t" + $(this)[0].id.substring(1);

        tileTitle = $(tileId).find("h5").text();
        tileDescription = $(tileId).find("p").text();

        $("#addModal").modal("show");
        $("#newTileTitleInput").val(tileTitle);
        $("#newTileDescriptionInput").val(tileDescription);


    });


});
