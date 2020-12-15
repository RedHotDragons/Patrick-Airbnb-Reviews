const faker = require('faker');
const fs = require('fs');
const path = require('path');

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

    const reviewObj = {
      // id: faker.random.number({min: 1, max: 100}),
      date: faker.date.recent().toString().split('').slice(0, 15).join(''),
      reviewer_name: faker.name.firstName() + ' ' + faker.name.lastName(),
      reviewer_picture: generateReviewerPicture(),
      comments: faker.lorem.paragraphs(1),
      cleanliness: faker.random.number({min: 1, max: 5}),
      communication:faker.random.number({min: 1, max: 5}),
      check_in: faker.random.number({min: 1, max: 5}),
      accuracy: faker.random.number({min: 1, max: 5}),
      location: faker.random.number({min: 1, max: 5}),
      value: faker.random.number({min: 1, max: 5})
  }

  return reviewObj;
}

const postgres = () => {
  //Create CSV file and path
  const reviewFile = fs.createWriteStream(path.join(__dirname, '../reviews.csv'))
  const listingFile = fs.createWriteStream(path.join(__dirname, '../listing.csv'))


  //Write headers
  listingFile.write('listing_id \n')
  reviewFile.write('listing_id, date, reviwer_name, reviewer_picture, comments, cleanliness, communication, check_in, accuracy, location, value \n')

  let i = 10000000;
  let id = 0;
  const write = () => {
    let listingOk = true;
    let reviewOk = true;
    do {
      i -= 1;
      id += 1;
      const review = writeReview();
      const listingID = `${id} \n`;
      const RelativeID = `${id}`;
      const reviews = `${RelativeID}, ${review.date}, ${review.reviewer_name}, ${review.reviewer_picture}, ${review.comments}, ${review.cleanliness}, ${review.communication}, ${review.check_in}, ${review.accuracy}, ${review.location}, ${review.value} \n`;
      if (i === 0) {
        reviewFile.write(reviews, 'utf-8', () => reviewFile.end())
        listingFile.write(listingID, 'utf-8', () => listingFile.end());
      } else {
          listingOk = listingFile.write(listingID, 'utf-8');
          reviewOk = reviewFile.write(reviews, 'utf-8');
      }
    } while (i > 0 && reviewOk && listingOk);
    if (i > 0) {
      listingFile.once('drain', write);
      reviewFile.once('drain', write);
    }
  }
  write();
}

postgres()