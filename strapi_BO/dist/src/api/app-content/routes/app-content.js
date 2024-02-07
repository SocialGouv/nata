"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "GET",
            path: "/app-content",
            handler: "app-content.getContent",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
