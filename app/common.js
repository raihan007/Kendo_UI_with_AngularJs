var showSuccessMessage = function (data) {
    ShowSuccessSticky(data);
};

function showErrorMessage(data) {
    ShowErrorSticky(data);
};

var ShowSuccessSticky = function (data) {
    showSucessMessages(data.Messages);
};

var ShowErrorSticky = function (data) {
    showErrorMessages(data.Messages);
};

var showErrorMessages = function (messages) {
    angular.forEach(messages, function (m) {
        $.sticky("<b>Error. </b> " + m, { autoclose: 50000, position: "top-right", type: "st-error" });
    });
}

var showSucessMessages = function (messages) {
    angular.forEach(messages, function (m) {
        $.sticky("<b>Success !!!</b> " + m, { autoclose: 5000, position: "top-right", type: "st-success" });
    });
}