/* eslint-disable react/prop-types */
import React  from 'react';
import Truncate from 'react-truncate';
import Highlight from 'react-highlighter';
import styles from '../dist/reviews.module.css';

class Comments extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: false,
      truncated: false
    };
    this.handleTruncate = this.handleTruncate.bind(this);
    this.readMore = this.readMore.bind(this);
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
          truncated
      });
    }
  }

  readMore(event) {
    event.preventDefault();

    this.setState({
      expanded: true
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let { children, more, lines, searchQuery } = this.props;
    let { expanded } = this.state;

    return (
      <div>
        <Truncate
          lines={!expanded && lines}
          ellipsis={(
            <span>... <a className={styles.reviewReadMore} href='#' onClick={this.readMore}>{more}</a></span>
          )}
          onTruncate={this.handleTruncate}
        >
          {<Highlight matchClass={styles.highlight} search={searchQuery}>{children}</Highlight>}
        </Truncate>
      </div>
    );
  }
}

Comments.defaultProps = {
  lines: 4,
  more: 'read more'
}

export default Comments;