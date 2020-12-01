import React from 'react';
import { shallow } from 'enzyme';
import Review from '../Review.jsx';

describe('Review', () => {
  const reviewObj = {
    reviewer_picture: 'https://duysfaces.s3-us-west-1.amazonaws.com/Female/026f.jpg',
    reviewer_name: 'Alta Nolan',
    date: '2020-05-23T13:35:14.534+00:00',
    comments: 'Lorem ipsum dolor'
  }
  it('renders a <Review> object', () => {
    const wrapper = shallow(<Review review={reviewObj} />);
    console.log(typeof wrapper);
    expect(wrapper.type()).toBe('div');
  });
});