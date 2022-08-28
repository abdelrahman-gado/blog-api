const mongoose = require("mongoose");
const { format } = require("date-fns");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true },
});

postSchema.virtual("id").get(function () {
  return this._id;
});

postSchema.virtual("formattedTimestamp").get(function () {
  return format(this.timestamp, "dd/MM/yyyy -- hh:mm aaa");
});

module.exports = mongoose.model("Post", postSchema);
