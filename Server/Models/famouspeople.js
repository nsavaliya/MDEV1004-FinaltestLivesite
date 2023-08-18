"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const famouspeopleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    achievements: {
        type: [String],
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
});
let famouspeople = (0, mongoose_1.model)('famouspeople', famouspeopleSchema);
exports.default = famouspeople;
//# sourceMappingURL=famouspeople.js.map