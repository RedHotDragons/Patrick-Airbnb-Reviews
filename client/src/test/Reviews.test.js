import React from 'react';
import { shallow } from 'enzyme';
import Reviews from '../Reviews.jsx';

describe('Reviews', () => {
  it('renders a <Reviews> object', () => {
    const wrapper = shallow(<Reviews listingId="1" />);
    expect(wrapper.type().toBe('div'));
  });
});