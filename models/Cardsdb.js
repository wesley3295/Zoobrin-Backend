import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  title: String,
  categories: String,
  description: String,
  img: String,
  date: { type: Date, default: Date.now },
  comments: [
    {
      author: String,
      body: String,
      author: String,
      date: { type: Date, default: Date.now },

      replies: [
        {
          author: String,
          body: String,
          author: String,
          date: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

export default mongoose.model("cards", cardSchema);
