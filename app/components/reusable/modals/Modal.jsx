import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'

import { KEYCODES } from '../../../utils/keyboard'
import { MODAL_TYPES } from '../../../utils/modals'

import {
  getModalOpts,
  isModalOpen,
} from '../../../reducers'
import { closeModal } from '../../../actions/modal'

import FeedbackModal from './FeedbackModal'
import Overlay from '../overlays/Overlay'
import OverlayClose from '../overlays/OverlayClose'

class Modal extends Component {
  constructor(props) {
    super(props)

    this.previousScrollYPosition = 0

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps) {
    const { isOpen: prevIsOpen } = prevProps
    const { isOpen: newIsOpen } = this.props

    if (!prevIsOpen && newIsOpen) {
      this.previousScrollYPosition = window.pageYOffset
      window.scrollTo(0, 0)
    } else if (prevIsOpen && !newIsOpen) {
      window.scrollTo(0, this.previousScrollYPosition)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  /**
   * Handles a keydown event.
   *
   * @param {SyntheticEvent} event
   */
  handleKeyDown(event) {
    // Close our modal if the user pressed the Escape key. We don't want to close it if they pressed
    // that key on an input though because they were probably canceling something.
    if (event.target && event.target.tagName !== 'INPUT' && event.keyCode === KEYCODES.ESCAPE) {
      this.closeModal()
    }
  }

  /**
   * Renders modal content.
   *
   * @returns {React.Element}
   */
  renderModalContent() {
    const {
      modalOpts,
    } = this.props

    switch (modalOpts.type) {
      case MODAL_TYPES.FEEDBACK:
        return (
          <FeedbackModal
            completedForm={this.closeModal}
          />
        )

      default:
        return null
    }
  }

  /**
   * Closes the modal.
   */
  closeModal() {
    this.props.closeModal()
  }

  render() {
    const {
      isOpen,
    } = this.props

    return (
      <div
        className={cn({
          'modal-open': isOpen,
        })}
      >
        <Overlay
          handleClick={this.closeModal}
        />
        <div className="modal" onKeyPress={this.handleKeyUp}>
          <OverlayClose
            handleClick={this.closeModal}
          />

          <div className="modal-content">
            {this.renderModalContent()}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalOpts: PropTypes.object,
}

export default connect(state => ({
  isOpen: isModalOpen(state),
  modalOpts: getModalOpts(state),
}), {
  closeModal,
})(Modal)
