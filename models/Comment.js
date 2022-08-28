const mongoose = require("mongoose");
const { format } = require("date-fns");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  email: { type: String, required: true, maxLength: 100, lowercase: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  postId: { type: Schema.Types.ObjectId, required: true }
});

commentSchema.virtual("formattedTimestamp").get(function () {
  return format(this.timestamp, "dd/MM/yyyy -- hh:mm aaa");
});

commentSchema.virtual("id").get(function () {
  return this._id;
});

module.exports = mongoose.model("Comment", commentSchema);
