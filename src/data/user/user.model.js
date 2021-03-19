const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: String,
    githubId: String,
    googleId: String,
    linkedinId: String,
    vacancies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vacancy',
      },
    ],
    role: {
      type: String,
      enum: ['professional', 'company'],
      default: 'professional',
    },
    avatarUrl: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
