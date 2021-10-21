"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInject = exports.setProvides = exports.Injectable = void 0;
var injectable_1 = require("./src/injectable");
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return injectable_1.Injectable; } });
var provide_1 = require("./src/provide");
Object.defineProperty(exports, "setProvides", { enumerable: true, get: function () { return provide_1.setProvides; } });
var use_inject_1 = require("./src/use-inject");
Object.defineProperty(exports, "useInject", { enumerable: true, get: function () { return use_inject_1.useInject; } });
