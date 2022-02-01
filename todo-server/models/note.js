const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const   NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  lastModified: {
    type: Date,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Note", NoteSchema);
