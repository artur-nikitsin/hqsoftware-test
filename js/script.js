var drake = dragula([document.querySelector('#toDo'), document.querySelector('#inProgress'), document.querySelector('#done')]);

$(document).ready(function () {

    var thisColumn,
        tileMask,
        modalMode = "newTile",
        tileButtonId,
        tileId,
        newIdCounter;

    function serverSync() {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/tiles",
            data: "",
            success: function parseToPage(data) {
                localStorage.clear();

                var jsonLen = data.length;

                if (jsonLen > 0) {

                    localStorage.clear();

                    data.forEach(function (item, i, arr) {

                        var obj = {
                            id: item.id,
                            tileid: item.tileid,
                            title: item.title,
                            description: item.description,
                            buttonid: item.buttonid
                        };

                        saveToLocalStorage(item.id, JSON.stringify(obj));

                    });

                    getFromLocalStorage();

                }

            },

            dataType: "json"
        });

    };

    serverSync();

//// dragula (catch drop event)
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


            var newElem = JSON.parse(elem);
            newElem.id = newKey;

            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/tiles/" + key,
                data: newElem,
                success: "",
                dataType: "json"
            });

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/tiles/",
                data: newElem,
                success: "",
                dataType: "json"
            });
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

            var newElem = JSON.parse(elem);

            newElem.id = newKey;


            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/tiles/" + key,
                data: newElem,
                success: "",
                dataType: "json"
            });

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/tiles/",
                data: newElem,
                success: "",
                dataType: "json"
            });

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

            var newElem = JSON.parse(elem);

            newElem.id = newKey;


            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/tiles/" + key,
                data: newElem,
                success: "",
                dataType: "json"
            });

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/tiles/",
                data: newElem,
                success: "",
                dataType: "json"
            });

        }

    });


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


    function setId() {
        newIdCounter = localStorage.length + 1;
        let selector = "t" + newIdCounter;
        if ($(document).is(selector)) {
            newIdCounter++;
            setId();
        } else return


    };


    $("#saveNewTileButton").on("click", function () {

        var newTileTitle = $("#newTileTitleInput").val();
        var newTileDescription = $("#newTileDescriptionInput").val();

        if (modalMode === "newTile") {

            var newTileImage;
            setId();
            var newTileId = "t" + newIdCounter;
            var newTilesButtonId = "b" + newIdCounter;
            var tileObject = {

                id: tileMask + "_" + newTileId,
                tileid: newTileId,
                title: newTileTitle,
                description: newTileDescription,
                buttonid: newTilesButtonId
            };

            saveToLocalStorage(tileMask + "_" + newTileId, JSON.stringify(tileObject));
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/tiles",
                data: tileObject,
                success: "",
                dataType: "json"
            });
            appendTileToColumn(thisColumn, newTileId, newTileTitle, newTileDescription, newTilesButtonId);

            $("#addModal").modal("hide");

        }

        if (modalMode === "tileEditor") {

            $("#" + tileId).find("h5").text(newTileTitle);
            $("#" + tileId).find("p").text(newTileDescription);

            editElementinLocalStogage(tileId, newTileTitle, newTileDescription, tileButtonId);

            var tileObject = {

                id: tileMask + "_" + newTileId,
                tileid: tileId,
                title: newTileTitle,
                description: newTileDescription,
                buttonid: newTilesButtonId
            };

            $("#addModal").modal("hide");

        }
    });


    function appendTileToColumn(thisColumn, tileId, tileTitle, tileDescription, tileButtonId) {
        var newTile = "<div id= " + tileId + " class=\"tile\" style=\"width: 100%;\">\n" +
            "<img class=\"card-img-top\" src=\"img/Без%20названия.svg\" alt=\"Card image cap\">\n" +
            "<div class=\"card-body\">\n" +
            "<h5 class=\"card-title\"> " + tileTitle + "</h5>\n" +
            "<p class=\"card-text\">" + tileDescription + "</p>\n" +
            "<a href=\"#\" id= " + tileButtonId + " newTilesButtonId class=\"btn btn-secondary\">Edit</a>\n" +
            "</div>\n" +
            "</div>";
        $(thisColumn).append(newTile);

    };


    $(document).on("click ", ".tile a", function () {

        modalMode = "tileEditor";
        var tileTitle, tileDescription, tileImage;
        tileButtonId = $(this)[0].id;

        tileId = "t" + $(this)[0].id.substring(1);

        tileTitle = $("#" + tileId).find("h5").text();

        tileDescription = $("#" + tileId).find("p").text();

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


                if (key.substring(0, 3) === "toD") {

                    var tileObject = JSON.parse(localStorage.getItem(key));

                    appendTileToColumn("#toDo", tileObject.tileid, tileObject.title, tileObject.description, tileObject.buttonid);
                }
                if (key.substring(0, 3) === "inP") {

                    var tileObject = JSON.parse(localStorage.getItem(key));

                    appendTileToColumn("#inProgress", tileObject.tileid, tileObject.title, tileObject.description, tileObject.buttonid);

                }
                if (key.substring(0, 3) === "don") {

                    var tileObject = JSON.parse(localStorage.getItem(key));

                    appendTileToColumn("#done", tileObject.tileid, tileObject.title, tileObject.description, tileObject.buttonid);

                }


            }

        }

    };

    function editElementinLocalStogage(tileId, tileTitle, tileDescription, tileButton) {

        var editedTileObject = {
            tileid: tileId,
            title: tileTitle,
            description: tileDescription,
            buttonid: tileButton
        };


        var lsLen = localStorage.length;
        if (lsLen > 0) {
            for (var i = 0; i < lsLen; i++) {
                var key = localStorage.key(i);


                if (key.substring(4) === tileId) {
                    localStorage.removeItem(key);
                    editedTileObject.id = key;
                    localStorage.setItem(key, JSON.stringify(editedTileObject));

                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:3000/tiles/" + key,
                        data: editedTileObject,
                        success: "",
                        dataType: "json"
                    });


                }

            }

        }

    };


})
;
