"use strict";
/**
 * @this App
 * @exports App
 *
 * @author Navneet Lal Gupta
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    /**
     * @constructor
     * @param controller
     * @param port
     */
    function App(controller, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddleware();
        this.initializeControllers(controller);
    }
    /**
     * @func listen Starts the server at given port.
     */
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("server started at http://localhost:" + _this.port);
        });
    };
    /**
     * @func initializeMiddleware Initializes all the middleware
     */
    App.prototype.initializeMiddleware = function () {
        this.app.use(body_parser_1.default.json());
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    return App;
}());
exports.default = App;
