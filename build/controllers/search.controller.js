"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connection_1 = __importDefault(require("../connection"));
var SearchController = /** @class */ (function () {
    function SearchController() {
        this.path = '/search';
        this.router = express_1.default.Router();
        this.getSearchResults = function (request, response) {
            // const key: string = request.query.q;
            console.log(request.query);
            connection_1.default.cluster.health({}, function (err, resp) {
                if (err)
                    console.log('Error: ', err);
                console.log("-- Client Health --", resp);
            });
            response.status(200).json({ "value": 1 });
        };
        this.initializeRoutes();
    }
    SearchController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getSearchResults);
    };
    return SearchController;
}());
exports.default = SearchController;
