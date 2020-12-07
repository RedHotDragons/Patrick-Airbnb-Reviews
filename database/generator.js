const faker = require('faker');
const fs = require('fs');
const db = require('./review.js')
const mongoose = require('mongoose');

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

const writeReview = () => {
  const reviews = [];
  const newObj = {};

    const reviewObj = {
      date: faker.date.recent().toString().split('').slice(0, 15).join(''),
      reviewer_name: faker.name.firstName() + ' ' + faker.name.lastName(),
      reviewer_picture: generateReviewerPicture(),
      comments: faker.lorem.paragraphs(Math.floor(Math.random() * 5) + 1),
      cleanliness: faker.random.number({min: 1, max: 5}),
      communication:faker.random.number({min: 1, max: 5}),
      check_in: faker.random.number({min: 1, max: 5}),
      accuracy: faker.random.number({min: 1, max: 5}),
      location: faker.random.number({min: 1, max: 5}),
      value: faker.random.number({min: 1, max: 5})
  }
  reviews.push(reviewObj);
  newObj['reviews'] = reviews
  return newObj;
}

const saveToDB = (cb) => {
  const reviews = writeReview();
  console.log(reviews)
  db.add(reviews, (err, result) => {
    if (err) {
      cb(err)
    } else {
      cb(null, result)
    }
  })
}

saveToDB((err, result) => {
  if (err) {
    console.log('error saving data to mongo')
  } else {
    console.log('successfully saved data to mongo', result)
  }
})

const writeUsers = fs.createWriteStream('userReviews.json', {flags: 'r+', start: 1});


function writeTenMillionReviews(writer, encoding, callback) {
  let i = 3;
  function write() {
    let ok = true;
    do {

      const review = writeReview();
      const reviewObj = {
        reviews: review
      }
      i--;
      const newJson = JSON.stringify(reviewObj) + ',';
      if (i === 0) {
        writer.write(JSON.stringify(reviewObj) + ']', encoding, callback);
      } else {
        ok = writer.write(newJson, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write()

}

writeTenMillionReviews(writeUsers, 'utf-8', () => {
  writeUsers.end();
});