const faker = require('faker');
const mongoose = require('mongoose');
const Review = require('./review');

const ratingCategories = [
  'cleanliness',
  'communication',
  'check_in',
  'accuracy',
  'location',
  'value'
];

// Generate a link to a user picture
var generateReviewerPicture = () => {
  var isFemale = Math.floor(Math.random() * 2);
  var randomNum;

  let pad = (num, size) => {
    num = num.toString();
    while (num.length < size) {
      num = "0" + num;
    }
    return num;
  }

  if (isFemale) {
    randomNum = pad(Math.floor(Math.random() * 88), 3);
    return `https://duysfaces.s3-us-west-1.amazonaws.com/Female/${randomNum}f.jpg`;
  } else {
    randomNum = pad(Math.floor(Math.random() * 112), 3);
    return `https://duysfaces.s3-us-west-1.amazonaws.com/Male/${randomNum}m.jpg`;
  }
}

// Generates 10-20 reviews for a given listingId
var generateReviewsPerListing = function(listing_id) {
  let reviews = [];
  let numOfReviews = Math.floor(Math.random() * 10) + 10;

  for (let i = 0; i < numOfReviews; i++) {
    let review = { listing_id };
    review['date'] = faker.date.past();
    review['reviewer_name'] = faker.name.firstName() + ' ' + faker.name.lastName();
    //review['reviewer_picture'] = faker.image.avatar();
    review['reviewer_picture'] = generateReviewerPicture();
    review['comments'] = faker.lorem.paragraphs(Math.floor(Math.random() * 5) + 1);

    for (let i = 0; i < ratingCategories.length; i++) {
      review[ratingCategories[i]] = Math.floor(Math.random() * 5) + 1;
    }
    reviews.push(review);
  }

  Review.insertMany(reviews)
    .then(() => {
      mongoose.connection.close();
    })
    .catch(error => {
      console.log('MongoDB error:', error);
    });
};

var generateReviews = function(numOfListings) {
  for (let i = 0; i < numOfListings; i++) {
    generateReviewsPerListing(i);
  }
};

generateReviews(100);