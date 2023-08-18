import { Collection, Schema,  model } from 'mongoose';

interface Ifamouspeople
{
    name: string,
    occupation: string,
    nationality: string,
    birthDate: string,
    birthPlace: string,
    bio: string,
    achievements: string[],
    imageURL: string
}

const famouspeopleSchema = new Schema<Ifamouspeople>({
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

let famouspeople = model<Ifamouspeople>('famouspeople', famouspeopleSchema);

export default famouspeople;