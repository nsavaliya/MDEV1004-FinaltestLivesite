import { Schema, model } from 'mongoose';

//bookID title authors genres country description publicationDate publisher pageCount language ISBN imageURL

interface IMovie {
    famouspeopleID: string,
    name: string,
    occupation: string,
    nationality: string,
    birthDate: string,
    birthPlace: string,
    bio: string,
    achievements: string[],
    imageURL: string
}

const movie = new Schema<IMovie>
    ({
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

let Movie = model<IMovie>('Movie', movie);

export default Movie;