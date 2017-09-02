import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '',
  };

  componentDidMount() {
    window.document.title = this.props.text || '';
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      window.document.title = nextProps.text || '';
    }
  }

  render() {
    return null;
  }
}