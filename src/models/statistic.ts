import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
  continent: { type: String, unique: false },
  country: { type: String, unique: false },
  population: { type: Number, unique: false },
  cases: {
    newer: { type: String, unique: false },
    active: { type: Number, unique: false },
    critical: { type: Number, unique: false },
    recovered: { type: Number, unique: false },
    M_pop: { type: String, unique: false },
    total: { type: Number, unique: false },
  },
  deaths: {
    newer: { type: String, unique: false },
    M_pop: { type: String, unique: false },
    total: { type: Number, unique: false },
  },
  tests: {
    M_pop: { type: String, required: false, unique: false },
    total: { type: Number, required: false, unique: false },
  },
  day: Date,
  time: Date,
});

export default mongoose.model('Statistic', UserSchema);
