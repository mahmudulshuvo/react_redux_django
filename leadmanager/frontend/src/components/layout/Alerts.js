import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { errors, alert, messages } = this.props;
    if (errors !== prevProps.errors) {
      if (errors.msg.name) {
        alert.error(`Name: ${errors.msg.name.join()}`);
      }
      if (errors.msg.email) {
        alert.error(`Email: ${errors.msg.email.join()}`);
      }
      if (errors.msg.message) {
        alert.error(`Message: ${errors.msg.message.join()}`);
      }
    }
    if (messages !== prevProps.messages) {
      if (messages.deleteLead) {
        alert.success(messages.deleteLead);
      }
      if (messages.addLead) {
        alert.success(messages.addLead);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
