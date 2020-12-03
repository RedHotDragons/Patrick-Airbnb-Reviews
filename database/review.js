const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/airbnb', { useMongoClient: true });

let reviewSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
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

const erase = (data, callback) => {

  Review.remove(data, (err, results) => {
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  })
}

const add = (data, callback) => {
  Review.create(data, (err, results) => {
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  })
}
module.exports = Review;
module.exports.erase = erase;
module.exports.add = add;