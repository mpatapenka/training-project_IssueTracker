MvcUtil = {};
MvcUtil.showSuccessResponse = function (text, element) {
    MvcUtil.showResponse("success", text, element);
};
MvcUtil.showErrorResponse = function showErrorResponse(text, element) {
    MvcUtil.showResponse("error", text, element);
};
MvcUtil.showResponse = function (type, list, element) {
    var responseElementId = element.attr("id") + "Response";
    var responseElement = $("#" + responseElementId);
    if (responseElement.length == 0) {
        responseElement = $('<div class="activity-item"><strong>' + list['name'] + '</strong> ' + list['comment'] + '<br>' + list['date'] + '</div>')
            .insertBefore(element);
    } else {
        responseElement.replaceWith('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + list + '</span>');
        responseElement = $("#" + responseElementId);
    }
    responseElement.fadeIn("slow");
};

var offset = 1;
var panel = "#activity-panel";
var showMoreBtn = "show-more-btn";
$("a.show-more-btn").click(function () {
    var link = $(this);
    $.ajax({
        url: this.href + "?offset=" + offset,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (req) {
            req.setRequestHeader("Accept", "application/json");
        },
        success: function (json) {
            var strJson = JSON.stringify(json);
            var list = JSON.parse(strJson);
            for (var i = 0; i < list.length; i++) {
                MvcUtil.showSuccessResponse(list[i], link);
            }
            offset += 1;
        },
        error: function () {
            location.reload();
        }
    });
    $.ajax({
        url: this.href + "?offset=" + (offset + 1),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (req) {
            req.setRequestHeader("Accept", "application/json");
        },
        success: function (json) {
            if (json == "") {
                document.getElementById(showMoreBtn).style.display = "none";
            }
        },
        error: function () {
            location.reload();
        }
    });
    return false;
});

function memberAdd(id) {
    $.ajax({
        url: "/projects?id=" + id,
        data: $('#memberForm').serialize(),
        type: "POST",
        success: function (result) {
            if (result != "") {
                var element = $('.insertBefore');
                var strDiv = '<div id="insertedError" class="alert alert-danger alert-dismissible alert-fix alert-danger-fix" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span></button>' + result + '</div>';
                var insElem = $(strDiv);
                var parent = document.getElementById("memberForm");
                var test = document.getElementById("insertedError");
                if (test != null) {
                    parent.removeChild(test);
                }
                insElem.insertBefore(element);
            } else {
                location.reload();
            }
        },
        error: function () {
            location.reload();
        }
    });
}

function projectAdd() {
    $.ajax({
        url: "/projects?new",
        data: $('#newProjectForm').serialize(),
        type: "POST",
        success: function (result) {
            if (result != "") {
                result = result.replace('\n', '<br>');
                var element = $('.insertBefore');
                var strDiv = '<div id="insertedError" class="alert alert-danger alert-dismissible alert-fix alert-danger-fix" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span></button>' + result + '</div>';
                var insElem = $(strDiv);
                var parent = document.getElementById("newProjectForm");
                var test = document.getElementById("insertedError");
                if (test != null) {
                    parent.removeChild(test);
                }
                insElem.insertBefore(element);
            } else {
                location.reload();
            }
        },
        error: function () {
            location.reload();
        }
    });
}