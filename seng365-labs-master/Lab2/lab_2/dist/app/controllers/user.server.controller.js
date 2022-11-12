"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.list = void 0;
const users = __importStar(require("../models/user.server.model"));
const logger_1 = __importDefault(require("../../config/logger"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`GET all users`);
    try {
        const result = yield users.getAll();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500)
            .send(`ERROR getting users ${err}`);
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`POST create a user with username: ${req.body.username}`);
    if (!req.body.hasOwnProperty("username")) {
        res.status(400).send("Please provide username field");
        return;
    }
    const username = req.body.username;
    try {
        const result = yield users.insert(username);
        res.status(201).send({ "user_id": result.insertId });
    }
    catch (err) {
        res.status(500).send(`ERROR creating user ${username}: ${err}`);
    }
});
exports.create = create;
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`GET single user id: ${req.params.id}`);
    const id = req.params.id;
    try {
        const result = yield users.getOne(parseInt(id, 10));
        if (result.length === 0) {
            res.status(404).send('User not found');
        }
        else {
            res.status(200).send(result[0]);
        }
    }
    catch (err) {
        res.status(500).send(`ERROR reading user ${id}: ${err}`);
    }
});
exports.read = read;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`PUT - update user id: ${req.params.id}`);
    const id = req.params.id;
    try {
        const user = yield users.alter(parseInt(id, 10), req.body.username);
        if (user.length === 0) {
            res.status(404).send('User Not Found');
        }
        else if (req.body.username.length === 0) {
            res.status(400).send('No details provided to update');
        }
        else {
            res.status(200).send(user);
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`DELETE - Delete the user with ID = ${req.params.id}`);
    const id = req.params.id;
    try {
        const result = yield users.remove(parseInt(id, 10));
        res.status(200).send(`User with id ${id} is deleted`);
    }
    catch (err) {
        res.status(400).send("Bad request");
    }
    return null;
});
exports.remove = remove;
//# sourceMappingURL=user.server.controller.js.map