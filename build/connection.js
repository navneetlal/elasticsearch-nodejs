"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_1 = __importDefault(require("elasticsearch"));
var client = new elasticsearch_1.default.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.4'
});
exports.default = client;
