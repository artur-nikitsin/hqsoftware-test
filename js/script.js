var drake = dragula([document.querySelector('#toDo'), document.querySelector('#inProgress'), document.querySelector('#done')]);

drake.on("drop", function (el, target, source) {

    if (source.id === "toDo") {
        var key = "toD" + "_" + el.id;
        var newKey;

        if (target.id === "inProgress") {
            newKey = "inP" + "_" + el.id;
        }
        if (target.id === "done") {
            newKey = "don" + "_" + el.id;
        }

        var elem = localStorage.getItem(key);
        localStorage.removeItem(key);
        localStorage.setItem(newKey, elem);
    }
    if (source.id === "inProgress") {
        var key = "inP" + "_" + el.id;
        var newKey;

        if (target.id === "toDo") {
            newKey = "toD" + "_" + el.id;
        }
        if (target.id === "done") {
            newKey = "don" + "_" + el.id;
        }

        var elem = localStorage.getItem(key);
        localStorage.removeItem(key);
        localStorage.setItem(newKey, elem);
    }
    if (source.id === "done") {
        var key = "don" + "_" + el.id;
        var newKey;

        if (target.id === "inProgress") {
            newKey = "inP" + "_" + el.id;
        }
        if (target.id === "toDo") {
            newKey = "toD" + "_" + el.id;
        }

        var elem = localStorage.getItem(key);
        localStorage.removeItem(key);
        localStorage.setItem(newKey, elem);
    }


});

$(document).ready(function () {

    var thisColumn;
    var tileMask;
    var modalMode = "newTile";


    var tileId;
    $("#addToDoTileButton").on("click", showModal);
    $("#addInProgressTileButton").on("click", showModal);
    $("#addDoneTileButton").on("click", showModal);



    function showModal() {

        if (this.id === "addToDoTileButton") {
            thisColumn = "#toDo";
            tileMask = "toD";
        }
        if (this.id === "addInProgressTileButton") {
            thisColumn = "#inProgress";
            tileMask = "inP";
        }
        if (this.id === "addDoneTileButton") {
            thisColumn = "#done";
            tileMask = "don";
        }

        $("#addModal").modal("show");

    };

    $("#addModal").on("hidden.bs.modal", function clearInputs() {
        $("#newTileTitleInput").val("");
        $("#newTileDescriptionInput").val("");
        modalMode = "newTile";
    });



    var newIdCounter = function () {
        if (localStorage.getItem("idCounter") === null) return 0
        else return Number(localStorage.getItem("idCounter"))+1;

    }();



    function setId() {

        if (localStorage.getItem("idCounter") === null) {
            localStorage.setItem("idCounter", newIdCounter);
            newIdCounter++;
        } else {
            localStorage.removeItem("idCounter");
            localStorage.setItem("idCounter", newIdCounter);
            newIdCounter++;

        }

    };


    $("#saveNewTileButton").on("click", function () {

        var newTileTitle = $("#newTileTitleInput").val();
        var newTileDescription = $("#newTileDescriptionInput").val();

// вставить функцию на проверку заполнения полей при создании нового тайла                TODO


        if (modalMode === "newTile") {

            var newTileImage;
            setId();
            var newTileId = "t" + newIdCounter;
            var newTilesButtonId = "b" + newIdCounter;


            var newTile = "<div id= " + newTileId + " class=\"tile\" style=\"width: 100%;\">\n" +
                "<img class=\"card-img-top\" src=\"img/Без%20названия.svg\" alt=\"Card image cap\">\n" +
                "<div class=\"card-body\">\n" +
                "<h5 class=\"card-title\"> " + newTileTitle + "</h5>\n" +
                "<p class=\"card-text\">" + newTileDescription + "</p>\n" +
                "<a href=\"#\" id=" + newTilesButtonId + " newTilesButtonId class=\"btn btn-secondary\">Edit</a>\n" +
                "</div>\n" +
                "</div>";

            saveToLocalStorage(tileMask + "_" + newTileId, newTile);

            $(thisColumn).append(newTile);
            $("#addModal").modal("hide");

        }

        if (modalMode === "tileEditor") {

            $(tileId).find("h5").text(newTileTitle);
            $(tileId).find("p").text(newTileDescription);
            $("#addModal").modal("hide");
        }
    });


    $(document).on("click ", ".tile a", function () {

        modalMode = "tileEditor";

        var tileTitle, tileDescription, tileImage;
        tileId = "#t" + $(this)[0].id.substring(1);
        console.log(tileId);
        tileTitle = $(tileId).find("h5").text();
        tileDescription = $(tileId).find("p").text();

        showModal();
        $("#newTileTitleInput").val(tileTitle);
        $("#newTileDescriptionInput").val(tileDescription);


    });


    function saveToLocalStorage(key, val) {
        localStorage.setItem(key, val);
    };


    function getFromLocalStorage() {
        var lsLen = localStorage.length;
        if (lsLen > 0) {
            for (var i = 0; i < lsLen; i++) {
                var key = localStorage.key(i);

                if (key === "idCounter") continue;

                if (key.substring(0, 3) === "toD") {

                    $("#toDo").append(localStorage.getItem(key));
                }
                if (key.substring(0, 3) === "inP") {

                    $("#inProgress").append(localStorage.getItem(key));
                }
                if (key.substring(0, 3) === "don") {

                    $("#done").append(localStorage.getItem(key));
                }


            }

        }

    };
    getFromLocalStorage();


});
