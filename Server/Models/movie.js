"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movie = new mongoose_1.Schema({
    famouspeopleID: { type: String, required: true },
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    nationality: { type: String, required: true },
    birthDate: { type: String, required: true },
    birthPlace: { type: String, required: true },
    bio: { type: String, required: true },
    achievements: { type: [String], required: true },
    imageURL: { type: String, required: true }
});
let Movie = (0, mongoose_1.model)('Movie', movie);
exports.default = Movie;
//# sourceMappingURL=movie.js.map