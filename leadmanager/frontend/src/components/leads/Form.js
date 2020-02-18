import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead, clearEdit, updateLead, getLeads } from '../../actions/leads';

export class Form extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  };

  static propTypes = {
    editLead: PropTypes.object,
    addLead: PropTypes.func.isRequired,
    clearEdit: PropTypes.func.isRequired,
    updateLead: PropTypes.func.isRequired,
    getLeads: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    console.log('on submit');
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    if (this.props.editLead.id) {
      console.log('On update');
      this.props.updateLead(this.props.editLead.id, name, email, message);
      this.props.getLeads();
    } else {
      this.props.addLead(lead);
    }

    this.setState({
      name: '',
      email: '',
      message: ''
    });
  };

  componentDidUpdate(prevProps) {
    const { editLead } = this.props;
    if (editLead !== prevProps.editLead) {
      console.log('edit lead value ', editLead);
      const { name, email, message } = editLead;
      this.setState({
        name,
        email,
        message
      });
    }
  }

  clearState = e => {
    e.preventDefault();
    console.log('im here');
    this.setState({
      name: '',
      email: '',
      message: ''
    });
    this.props.clearEdit();
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Submit
            </button>
            {this.props.editLead.id ? (
              <button className="btn btn-danger ml-1" onClick={this.clearState}>
                Cancel
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead
});

export default connect(mapStateToProps, {
  addLead,
  clearEdit,
  updateLead,
  getLeads
})(Form);
