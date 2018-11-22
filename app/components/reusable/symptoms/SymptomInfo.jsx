import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { offset } from '@jrubins/utils/lib/dom'
import _ from 'lodash'
import cn from 'classnames'

import { customEvent } from '../../../utils/analytics'

import InfoIcon from '../icons/InfoIcon'

/**
 * The width of the info text container (in pixels).
 *
 * @type {Number}
 */
const INFO_TEXT_WIDTH = 250

const SymptomInfo = ({ infoText }) => {
  const symptomInfoContainer = useRef(null)
  const [arrowLeft, setArrowLeft] = useState('50%')
  const [containerLeft, setContainerLeft] = useState(0)
  const [showInfoText, setShowInfoText] = useState(false)
  const throttledCalculateLeftShift = _.throttle(calculateLeftShift, 300)
  let mouseOverInfoText = false
  let showInfoTextTimeout = null

  /**
   * Calculates the left shift for the info text box and its arrow indicator taking
   * into account the width of the user's viewport.
   */
  function calculateLeftShift() {
    const containerOffset = offset(symptomInfoContainer.current)
    const halfInfoTextWidth = INFO_TEXT_WIDTH / 2

    // Window bounds are adjusted so the info text boxes don't ride up against the side of the screen.
    const windowRightBound = window.innerWidth - 15
    const windowLeftBound = 15

    let leftShift = -1 * halfInfoTextWidth
    if (containerOffset.left + halfInfoTextWidth > windowRightBound) {
      // Subtract the overlap of the info text box from where the box was going to be positioned.
      const windowOverlap =
        containerOffset.left + halfInfoTextWidth - windowRightBound
      leftShift = -1 * (halfInfoTextWidth + windowOverlap)
    } else if (containerOffset.left - halfInfoTextWidth < windowLeftBound) {
      // Position the info text box so its "left" coordinate is 15.
      leftShift = -1 * (containerOffset.left - 15)
    }

    setArrowLeft(leftShift * -1)
    setContainerLeft(leftShift)
  }

  /**
   * Handles when a user clicks the info text to show the info text box.
   *
   * @param {Event} event
   */
  function handleInfoTextClick(event) {
    event.preventDefault()
    event.stopPropagation()

    setShowInfoText(!showInfoText)
  }

  /**
   * Handles when a user moves their mouse over the info text container.
   *
   * @param {Event} event
   */
  function handleInfoTextMouseEnter() {
    mouseOverInfoText = true

    // Delay showing the info text box so it's not annoying.
    showInfoTextTimeout = window.setTimeout(() => {
      if (mouseOverInfoText) {
        customEvent('Info Text', 'Shown')

        setShowInfoText(true)
      }
    }, 350)
  }

  /**
   * Handles when a user moves their mouse outside of the info text container.
   *
   * @param {Event} event
   */
  function handleInfoTextMouseLeave() {
    mouseOverInfoText = false
    setShowInfoText(false)
  }

  /**
   * Handles any window resizes.
   */
  function handleWindowResize() {
    throttledCalculateLeftShift()
  }

  useEffect(
    () => {
      throttledCalculateLeftShift()
      window.addEventListener('resize', handleWindowResize)

      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    },
    [symptomInfoContainer.current]
  )

  useEffect(() => {
    return () => {
      if (showInfoTextTimeout) {
        window.clearTimeout(showInfoTextTimeout)
      }
    }
  })

  return (
    <div
      ref={symptomInfoContainer}
      className="symptom-info-container"
      onMouseEnter={handleInfoTextMouseEnter}
      onMouseLeave={handleInfoTextMouseLeave}
    >
      <span onClick={handleInfoTextClick}>
        <InfoIcon />
      </span>

      <div
        className={cn('symptom-info-content-container', {
          hidden: !showInfoText,
        })}
        style={{
          left: containerLeft,
        }}
      >
        <div
          className="symptom-info-arrow-indicator"
          style={{
            left: arrowLeft,
          }}
        />
        <div className="symptom-info-content">{infoText}</div>
      </div>
    </div>
  )
}

SymptomInfo.propTypes = {
  infoText: PropTypes.string.isRequired,
}

export default SymptomInfo
