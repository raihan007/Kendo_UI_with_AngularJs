app.controller('HostController', ['$scope', function($scope) {
    var showErrorMessages = function (messages) {
        angular.forEach(messages, function (m) {
            $.sticky("<b>Error. </b> " + m, { autoclose: 10000, position: "top-right", type: "st-error" });
        });
    }

    var showSucessMessages = function (messages) {
        angular.forEach(messages, function (m) {
            $.sticky("<b>Success !!!</b> " + m, { autoclose: 5000, position: "top-right", type: "st-success" });
        });
    }
}]);