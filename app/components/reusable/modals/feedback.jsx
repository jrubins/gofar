import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import _ from 'lodash';

import { customEvent } from '../../../utils/ga';

import { getIsModalOpen } from '../../../reducers';
import { toggleModal } from '../../../actions/modal';

class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: '',
      isFormSubmitted: false,
    };

    this.handleChangeFeedback = this.handleChangeFeedback.bind(this);
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this);
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
  }

  /**
   * Handles when a user enters in feedback.
   *
   * @param {Event} event
   */
  handleChangeFeedback(event) {
    this.setState({
      feedback: event.target.value,
    });
  }

  /**
   * Handles when feedback is submitted.
   */
  handleFeedbackSubmit() {
    customEvent('Feedback', 'Submitted');

    this.setState({
      isFormSubmitted: true,
    });
  }

  /**
   * Handles when the feedback modal is closed.
   */
  handleCloseFeedback() {
    customEvent('Feedback', 'Closed', 'Modal');

    this.props.toggleModal();
  }

  render() {
    const { isModalOpen } = this.props;

    return (
      <div
        className="modal"
        style={{
          display: isModalOpen ? 'block' : 'none',
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* This is a hidden iFrame that is used to submit the feedback form data to the Google spreadsheet */}
            <iframe
              name="feedback-iframe"
              className="hidden"
            ></iframe>

            <form
              action="https://docs.google.com/forms/d/1ji9XNn0RiJzuaRAtCObXhVi5_Pe54K2dHafOVytTpJ0/formResponse"
              method="POST"
              target="feedback-iframe"
              onSubmit={this.handleFeedbackSubmit}
            >
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.handleCloseFeedback}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Feedback</h4>
              </div>
              <div className="modal-body">
                <div
                  className={cn({
                    hidden: this.state.isFormSubmitted,
                  })}
                >
                  <p className="bg-info padding">
                    If you have any improvements or suggestions for the GO-FAR calculator or
                    are experiencing any issues, please submit your feedback using the form below. If you supply your
                    name and email, I will be sure to get back to you in a timely manner. Thanks!
                  </p>
                  <div className="form-group">
                    <label htmlFor="feedback-name" className="control-label">Name:</label>
                    <input
                      type="text"
                      name="entry.468931824"
                      className="form-control"
                      id="feedback-name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedback-email" className="control-label">Email:</label>
                    <input
                      type="text"
                      name="entry.455716436"
                      className="form-control"
                      id="feedback-email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedback-text" className="control-label">Feedback:</label>
                    <textarea
                      rows="6"
                      name="entry.612948227"
                      className="form-control"
                      id="feedback-text"
                      value={this.state.feedback}
                      onChange={this.handleChangeFeedback}
                    ></textarea>
                  </div>
                </div>

                <p
                  className={cn('bg-success padding', {
                    hidden: !this.state.isFormSubmitted,
                  })}
                >
                  Thanks for your feedback! If you have provided contact information, I will get back to you as
                  soon as possible.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className={cn('btn btn-primary', {
                    disabled: this.state.isFormSubmitted || _.isEmpty(_.trim(this.state.feedback)),
                  })}
                  disabled={this.state.isFormSubmitted || _.isEmpty(_.trim(this.state.feedback))}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.handleCloseFeedback}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

FeedbackModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

const FeedbackModalContainer = connect(state => ({
  isModalOpen: getIsModalOpen(state),
}), {
  toggleModal,
})(FeedbackModal);

export default FeedbackModalContainer;
