"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const appRouter = (0, express_1.Router)();
const appRoutes = [
    {
        path: "/auth",
        router: authRoute_1.default,
    },
];
appRoutes.forEach(route => {
    appRouter.use(route.path, route.router);
});
exports.default = appRouter;
//# sourceMappingURL=index.js.map