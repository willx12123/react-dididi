"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInject = void 0;
const react_1 = require("react");
const provide_1 = require("./provide");
function useInject(Service) {
    const instanceRef = react_1.useRef();
    if (!instanceRef.current) {
        instanceRef.current = provide_1.getInstance(Service);
    }
    return instanceRef.current;
}
exports.useInject = useInject;
