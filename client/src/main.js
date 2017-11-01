"use strict";
exports.__esModule = true;
var ko = require("knockout");
var ViewModel = /** @class */ (function () {
    function ViewModel() {
        this.words = ko.observableArray(['Hello', 'World']);
    }
    return ViewModel;
}());
ko.applyBindings(new ViewModel());
//# sourceMappingURL=main.js.map