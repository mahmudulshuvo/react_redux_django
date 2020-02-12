import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';

class Form extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.addLead(lead);
    this.setState({
      name: '',
      email: '',
      message: ''
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div>
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              aria-describedby="helpId"
              value={name}
              onChange={this.onChange}
            />
            <small id="helpId" className="form-text text-muted">
              Please enter your full name
            </small>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={this.onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="message"
              aria-describedby="helpId"
              value={message}
              onChange={this.onChange}
            ></textarea>
            <small id="helpId" className="form-text text-muted">
              Please enter your message
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
