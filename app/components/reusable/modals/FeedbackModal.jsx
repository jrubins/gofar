import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cn from 'classnames'

import { customEvent } from '../../../utils/analytics'

import Button from '../forms/fields/Button'

class FeedbackModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      feedback: '',
      isFormSubmitted: false,
    }

    this.handleChangeFeedback = this.handleChangeFeedback.bind(this)
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this)
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this)
  }

  /**
   * Handles when a user enters in feedback.
   *
   * @param {Event} event
   */
  handleChangeFeedback(event) {
    this.setState({
      feedback: event.target.value,
    })
  }

  /**
   * Handles when the feedback modal is closed.
   */
  handleCloseFeedback() {
    customEvent('Feedback', 'Closed', 'Modal')

    this.props.completedForm()
  }

  /**
   * Handles when feedback is submitted.
   */
  handleFeedbackSubmit() {
    customEvent('Feedback', 'Submitted')

    this.setState({
      isFormSubmitted: true,
    })
  }

  render() {
    const {
      feedback,
      isFormSubmitted,
    } = this.state

    return (
      <div className="feedback-modal">
        {/* This is a hidden iFrame that is used to submit the feedback form data to the Google spreadsheet */}
        <iframe
          className="hidden"
          name="feedback-iframe"
        />

        <form
          action="https://docs.google.com/forms/d/1ji9XNn0RiJzuaRAtCObXhVi5_Pe54K2dHafOVytTpJ0/formResponse"
          method="POST"
          onSubmit={this.handleFeedbackSubmit}
          target="feedback-iframe"
        >
          <h4 className="modal-title">Feedback</h4>

          <div
            className={cn({
              hidden: isFormSubmitted,
            })}
          >
            <p className="feedback-modal-instructions">
              If you have any improvements or suggestions for the GO-FAR calculator or
              are experiencing any issues, please submit your feedback using the form below. If you supply your
              name and email, I will be sure to get back to you in a timely manner. Thanks!
            </p>
            <div className="form-group">
              <label
                className="control-label"
                htmlFor="feedback-name"
              >
                Name:
              </label>
              <input
                className="form-control"
                id="feedback-name"
                name="entry.468931824"
                type="text"
              />
            </div>
            <div className="form-group">
              <label
                className="control-label"
                htmlFor="feedback-email"
              >
                Email:
              </label>
              <input
                className="form-control"
                id="feedback-email"
                name="entry.455716436"
                type="text"
              />
            </div>
            <div className="form-group">
              <label
                className="control-label"
                htmlFor="feedback-text"
              >
                Feedback:
              </label>
              <textarea
                className="form-control"
                id="feedback-text"
                name="entry.612948227"
                onChange={this.handleChangeFeedback}
                rows="6"
                value={feedback}
              ></textarea>
            </div>
          </div>

          <div
            className={cn({
              hidden: !isFormSubmitted,
            })}
          >
            <p className="bg-success padding">
              Thanks for your feedback! If you have provided contact information, I will get back to you as
              soon as possible.
            </p>
          </div>

          <div className="modal-footer">
            <Button
              isDisabled={isFormSubmitted || _.isEmpty(_.trim(feedback))}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

FeedbackModal.propTypes = {
  completedForm: PropTypes.func.isRequired,
}

export default FeedbackModal
