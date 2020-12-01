/* eslint-disable react/prop-types */
import React from 'react';
import $ from 'jquery';
import cx from 'classnames';
import Review from './Review.jsx';
import ReviewsModal from './ReviewsModal.jsx';
import globalStyles from '../dist/bootstrap.module.css';
import styles from '../dist/reviews.module.css';

const MAX_REVIEWS = 6;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      totalRating: 0,
      cleanliness: 0,
      communication: 0,
      check_in: 0,
      accuracy: 0,
      location: 0,
      value: 0,
      showModal: false,
      searchQuery: ''
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `/api/reviews/${this.props.listingId}`,
      processData: false,
      contentType: 'application/json',
      success: (results) => {
        let cleanliness = 0;
        let communication = 0;
        let check_in = 0;
        let accuracy = 0;
        let location = 0;
        let value = 0;

        for (let i = 0; i < results.length; i++) {
          cleanliness += results[i].cleanliness;
          communication += results[i].communication;
          check_in += results[i].check_in;
          accuracy += results[i].accuracy;
          location += results[i].location;
          value += results[i].value;
        }

        let totalRating = (cleanliness + communication + check_in + accuracy + location + value) / (6 * results.length);
        this.setState({
          reviews: results,
          totalRating,
          cleanliness: cleanliness / results.length,
          communication: communication / results.length,
          check_in: check_in / results.length,
          accuracy: accuracy / results.length,
          location: location / results.length,
          value: value / results.length
        });
      }
    });
  }

  getProgressAsPercent(rating) {
    return ((rating / 5) * 100).toFixed(0);
  }

  handleSearchInputChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      searchQuery: ''
    });
  }

  renderHeading() {
    let { reviews, totalRating } = this.state;

    return (
      <div className={cx(globalStyles.row, globalStyles['pb-3'])}>
        <div className={cx(globalStyles['col-lg-12'], globalStyles['col-md-12'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
          <span className={styles.reviewsStar}>&#9733;</span>
          <span className={styles.reviewsTitle}>{totalRating.toFixed(1)} ({reviews.length} Reviews)</span>
        </div>
      </div>
    );
  }

  renderRatings() {
    let { cleanliness, communication, check_in, accuracy, location, value } = this.state;

    return (
      <React.Fragment>
        <div className={cx(globalStyles['d-none'], globalStyles['d-md-block'])}>
          <div className={cx(globalStyles.row, globalStyles['pb-3'])}>
            <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
              <div className={styles.ratingTable}>
                <div className={styles.width100}>
                  <span className={styles.ratingCategory}>Cleanliness</span>
                </div>
                <div>
                  <div className={styles.ratingBar}>
                    <span style={{width: this.getProgressAsPercent(cleanliness) + '%'}}></span>
                  </div>
                </div>
                <div><span className={styles.rating}>{cleanliness.toFixed(1)}</span></div>
              </div>
            </div>
            <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
              <div className={styles.ratingTable}>
                <div className={styles.width100}>
                  <span className={styles.ratingCategory}>Accuracy</span>
                </div>
                <div>
                  <div className={styles.ratingBar}>
                    <span style={{width: this.getProgressAsPercent(accuracy) + '%'}}></span>
                  </div>
                </div>
                <div>
                  <span className={styles.rating}>{accuracy.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(globalStyles.row, globalStyles['pb-3'])}>
            <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
              <div className={styles.ratingTable}>
                <div className={styles.width100}>
                  <span className={styles.ratingCategory}>Communication</span>
                </div>
                <div>
                  <div className={styles.ratingBar}>
                    <span style={{width: this.getProgressAsPercent(communication) + '%'}}></span>
                  </div>
                </div>
                <div>
                  <span className={styles.rating}>{communication.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
              <div className={styles.ratingTable}>
                <div className={styles.width100}>
                  <span className={styles.ratingCategory}>Location</span>
                </div>
                <div>
                  <div className={styles.ratingBar}>
                    <span style={{width: this.getProgressAsPercent(location) + '%'}}></span>
                  </div>
                </div>
                <div>
                  <span className={styles.rating}>{location.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(globalStyles.row, globalStyles['pb-3'])}>
            <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
              <div className={styles.ratingTable}>
                <div className={styles.width100}>
                  <span className={styles.ratingCategory}>Check-in</span>
                </div>
                <div>
                  <div className={styles.ratingBar}>
                    <span style={{width: this.getProgressAsPercent(check_in) + '%'}}></span>
                  </div>
                </div>
                <div>
                  <span className={styles.rating}>{check_in.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
              <div className={styles.ratingTable}>
                <div className={styles.width100}>
                  <span className={styles.ratingCategory}>Value</span>
                </div>
                <div>
                  <div className={styles.ratingBar}>
                    <span style={{width: this.getProgressAsPercent(value) + '%'}}></span>
                  </div>
                </div>
                <div>
                  <span className={styles.rating}>{value.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    let { reviews, showModal, searchQuery } = this.state;
    let i = 0;
    let showOddRow = false;
    let showAllReviewsButton = false;
    let reviewPairs = [];
    let highlightedReviews = [];

    while (i < reviews.length && i < MAX_REVIEWS) {
      reviewPairs.push([reviews[i], reviews[i + 1]]);
      i += 2;
    }

    if (i === MAX_REVIEWS) {
      showAllReviewsButton = true;
    } else if (i % 2) {
      // eslint-disable-next-line no-unused-vars
      showOddRow = true;
    }

    if (searchQuery && searchQuery.length > 2) {
      for (i = 0; i < reviews.length; i++) {
        if (reviews[i].comments.includes(searchQuery)) {
          reviews[i].comments = reviews[i].comments.replace(`/${searchQuery}/gi`, `'<mark>${searchQuery}</mark>'`);
          highlightedReviews.push(reviews[i]);
        }
      }
    } else {
      highlightedReviews = reviews;
    }

    return (
      <React.Fragment>
        <div className={cx(globalStyles.container, globalStyles['px-1'])}>
          {this.renderHeading()}
          {this.renderRatings()}
          {reviewPairs.map(reviewPair =>
            // eslint-disable-next-line react/jsx-key
            <div className={cx(globalStyles.row, globalStyles['pb-3'])}>
              <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
                <Review review={reviewPair[0]} />
              </div>
              <div className={cx(globalStyles['col-lg-6'], globalStyles['col-md-6'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
                <Review review={reviewPair[1]} />
              </div>
            </div>
          )}
          { showAllReviewsButton &&
            <div className={cx(globalStyles.row, globalStyles['pb-3'])}>
              <div className={cx(globalStyles['col-lg-12'], globalStyles['col-md-12'], globalStyles['col-sm-12'], globalStyles['col-xs-12'])}>
                <button className={styles.reviewsButton} onClick={this.toggleModal}>
                  Show all {reviews.length} reviews
                </button>
              </div>
            </div>
          }
        </div>
        <ReviewsModal show={showModal} toggle={this.toggleModal}>
          {this.renderHeading()}
          {this.renderRatings()}
          <div className={styles.reviewsSearch}>
            &#x1F50D; <input type="text" className={styles.reviewsSearchInput} placeholder="Search reviews" id="reviewsSearchInput" onChange={this.handleSearchInputChange}/>
          </div>
          {highlightedReviews.map(review =>
            // eslint-disable-next-line react/jsx-key
            <div className={`${styles.reviews} ${styles.row} ${styles.paddingBottom32}`}>
              <div className={styles.col12}>
                <Review review={review} searchQuery={searchQuery} />
              </div>
            </div>
          )}
        </ReviewsModal>
      </React.Fragment>
    );
  }
}

export default Reviews;