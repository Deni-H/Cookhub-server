"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = exports.dayToTimestamp = void 0;
const dayToTimestamp = (day) => {
    return 60 * 60 * 24 * 1000 * day;
};
exports.dayToTimestamp = dayToTimestamp;
const getCurrentTime = () => {
    return new Date().getTime();
};
exports.getCurrentTime = getCurrentTime;
