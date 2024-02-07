"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "GET",
            path: "/get-hospitals",
            handler: "get-hospitals.getHospitals",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
