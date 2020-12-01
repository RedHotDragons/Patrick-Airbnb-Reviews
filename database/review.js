const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/airbnb', { useMongoClient: true });

let reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  listing_id: Number,
  date: Date,
  reviewer_name: String,
  reviewer_picture: String,
  comments: String,
  cleanliness: Number,
  communication: Number,
  check_in: Number,
  accuracy: Number,
  location: Number,
  value: Number
});

let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;