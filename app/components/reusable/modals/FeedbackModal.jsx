import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@jrubins/react-components/lib/forms/fields/Button'
import Modal from '@jrubins/react-components/lib/modals/Modal'
import _ from 'lodash'
import cn from 'classnames'

import { customEvent } from '../../../utils/analytics'

const FeedbackModal = ({ isOpen, setIsOpen }) => {
  const [feedback, setFeedback] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  return (
    <div className="feedback-modal">
      <Modal
        closeModal={() => {
          setIsFormSubmitted(false)
          setFeedback('')
          setIsOpen(false)
        }}
        isFluid={true}
        isOpen={isOpen}
      >
        {/* This is a hidden iFrame that is used to submit the feedback form data to the Google spreadsheet */}
        <iframe className="hidden" name="feedback-iframe" />

        <form
          action="https://docs.google.com/forms/d/1ji9XNn0RiJzuaRAtCObXhVi5_Pe54K2dHafOVytTpJ0/formResponse"
          method="POST"
          onSubmit={() => {
            customEvent('Feedback', 'Submitted')

            setIsFormSubmitted(true)
          }}
          target="feedback-iframe"
        >
          <h4 className="modal-title">Feedback</h4>

          <div
            className={cn({
              hidden: isFormSubmitted,
            })}
          >
            <p className="feedback-modal-instructions">
              If you have any improvements or suggestions for the GO-FAR
              calculator or are experiencing any issues, please submit your
              feedback using the form below. If you supply your name and email,
              I will be sure to get back to you in a timely manner. Thanks!
            </p>
            <div className="form-group">
              <label className="control-label" htmlFor="feedback-name">
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
              <label className="control-label" htmlFor="feedback-email">
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
              <label className="control-label" htmlFor="feedback-text">
                Feedback:
              </label>
              <textarea
                className="form-control"
                id="feedback-text"
                name="entry.612948227"
                onChange={event => setFeedback(event.target.value)}
                rows="6"
                value={feedback}
              />
            </div>
          </div>

          <div
            className={cn({
              hidden: !isFormSubmitted,
            })}
          >
            <p className="bg-success padding">
              Thanks for your feedback! If you have provided contact
              information, I will get back to you as soon as possible.
            </p>
          </div>

          <div className="modal-footer">
            {!isFormSubmitted && (
              <Button isDisabled={_.isEmpty(_.trim(feedback))} type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  )
}

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default FeedbackModal
