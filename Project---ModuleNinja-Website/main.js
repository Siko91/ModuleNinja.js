// initialize the application
var app = Sammy('#wrapper', function () {
    $("#content-items").on("click", "a", changeSelectedLink);

    function changeSelectedLink(event) {
        var self = this;
        $("#content-items").find("a").removeClass("selected")
        $(self).addClass("selected");
    }

    function convertStringTabsAndNewLines(string) {
        while (string.indexOf("\n") !== -1) {
            string = string.replace("\n", "<br/>");
        }
        while (string.indexOf("\t") !== -1) {
            string = string.replace("\t", "&#32;&#32;&#32;");
        }
        return string;
    }

    function loadArticleAndSideItem(path){
        loadSelectedDocument(path);

        require([path], function (doc) {
            addSideMenuItem(doc.name);
        });
    }
    function addSideMenuItem(name){
            $("#content-items")
                .append($("<a>")
                    .attr("href", "#" + name)
                    .append(name.trim())
                    .css("display", "block")
                    .css("textAlign", "center"));
    }
    function loadAllNames(){
        require(["docs/list/allNames.js"], function (list) {
            debugger;
            var docFrag = document.createDocumentFragment();
            for (var i = 0; i < list.length; i++) {
                $("<a>")
                    .attr("href", "#/documentation/" + list[i])
                    .append(list[i].trim())
                    .css("display", "block")
                    .css("textAlign", "center")
                    .appendTo(docFrag)
            }
            $("#content-items").append(docFrag);
        })
    }
    function loadSelectedDocument(path) {
        require([path], function (result) {
            $("#content-item-article")
               .append($("<h1>")
                   .append(result.name)
                   .attr("id", result.name))
               .append($("<p>")
                   .append(convertStringTabsAndNewLines(result.text))
                   .append($("<div>").append(convertStringTabsAndNewLines(result.example))))
        })
    }

    this.get('#/home', function () {
        $("#content-item-article").empty();
        $("#content-items").empty();

        loadArticleAndSideItem("docs/moduleNinja.js");
        loadArticleAndSideItem("docs/Why_use_moduleNinja.js");
    });

    this.get('#/download', function () {
        $("#content-item-article").empty();
        $("#content-items").empty();

        loadArticleAndSideItem("docs/download_moduleNinja.js");
    });
    this.get('#/contact', function () {
        $("#content-item-article").empty();
        $("#content-items").empty();

        loadArticleAndSideItem("docs/Contact_me.js");
    })
    this.get('#/documentation', function () {
        $("#content-item-article").empty().append("<h4>Select a document to display</h4>");
        $("#content-items").empty();

        loadAllNames();
    })

    this.get('#/documentation/:docName', function () {
        $("#content-item-article").empty();

        var docPath = "docs/" + this.params["docName"] + ".js";
        while (docPath.indexOf(" ") !== -1) {
            docPath = docPath.replace(" ", "_");
        }

        loadSelectedDocument(docPath)

        if ($("#content-items").find("a").length === 0) {

            $("#content-items").empty();
            loadAllNames();
        }
    });

    this.get('#/faq', function () {
        $("#content-item-article").empty().append("<h4>No Questions have been asked yet...</h4>");
        $("#content-items").empty();
    });
});

// start the application
app.run('#/home');