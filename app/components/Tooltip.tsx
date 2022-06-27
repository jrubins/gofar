import type { CSSProperties, ReactElement, ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'

import InfoIcon from './InfoIcon'

let tooltipRoot: HTMLElement | null | undefined
if (typeof document !== 'undefined') {
  tooltipRoot = document.getElementById('tooltip-root')
  if (!tooltipRoot) {
    tooltipRoot = document.createElement('div')
    tooltipRoot.setAttribute('id', 'tooltip-root')
    document.body.appendChild(tooltipRoot)
  }
}

function getArrowAdjustment(placement: string): CSSProperties {
  if (placement.startsWith('top')) {
    return { bottom: -4 }
  } else if (placement.startsWith('bottom')) {
    return { top: -4 }
  } else if (placement.startsWith('left')) {
    return { right: -4 }
  } else if (placement.startsWith('right')) {
    return { left: -4 }
  }

  return {}
}

const Tooltip = ({
  alwaysShow = false,
  children,
  initialShow = false,
  placement = 'top',
  showDelay = 200,
  trigger,
}: {
  alwaysShow?: boolean
  children: ReactNode
  initialShow?: boolean
  placement?: 'right' | 'top'
  showDelay?: number
  trigger?: ReactElement
}): JSX.Element => {
  const isHovering = useRef(false)
  const showTooltipTimeout = useRef<number | null>(null)

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null)
  const [showTooltip, setShowTooltip] = useState(alwaysShow || initialShow)

  /**
   * This delays showing the tooltip. This is useful so we don't immediately show the tooltip if the user
   * quickly moves their mouse over the trigger point on their way to some other element.
   */
  function triggerDelayedShow() {
    if (showTooltipTimeout.current) {
      window.clearTimeout(showTooltipTimeout.current)
    }

    showTooltipTimeout.current = window.setTimeout(() => {
      if (!isHovering.current) {
        return
      }

      setShowTooltip(true)
    }, showDelay)
  }

  useEffect(() => {
    return () => {
      if (showTooltipTimeout.current) {
        window.clearTimeout(showTooltipTimeout.current)
      }
    }
  }, [])

  const triggerProps = {
    ref: setReferenceElement,
    onMouseEnter: () => {
      isHovering.current = true
      triggerDelayedShow()
    },
    onMouseLeave: () => {
      if (alwaysShow) {
        return
      }

      isHovering.current = false
      setShowTooltip(false)
    },
  }
  const resolvedTrigger = trigger ? (
    React.cloneElement(trigger, triggerProps)
  ) : (
    <div className="h-4 w-4" {...triggerProps}>
      <InfoIcon strokeWidth={2} />
    </div>
  )

  return (
    <>
      {resolvedTrigger}

      {showTooltip && (
        <TooltipBody placement={placement} referenceElement={referenceElement}>
          {children}
        </TooltipBody>
      )}
    </>
  )
}

export default Tooltip

const TooltipBody = ({
  children,
  placement,
  referenceElement,
}: {
  children: ReactNode
  placement: 'right' | 'top'
  referenceElement: HTMLElement | null
}): JSX.Element | null => {
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )

  const { attributes, styles } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    placement,
  })

  const sharedArrowClasses = 'absolute w-2 h-2 -z-10'

  return tooltipRoot
    ? ReactDOM.createPortal(
        <div
          ref={setPopperElement}
          className="z-40 max-w-[400px] rounded border border-gray-200 shadow-lg md:max-w-xs"
          role="tooltip"
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="rounded-sm bg-white">{children}</div>
          <div
            ref={setArrowElement}
            className={sharedArrowClasses}
            style={{
              ...styles.arrow,
              ...getArrowAdjustment(
                attributes.popper
                  ? attributes.popper['data-popper-placement']
                  : ''
              ),
            }}
          >
            <div
              className={`${sharedArrowClasses} border-light-grey top-0 left-0 rotate-45 border bg-white`}
            />
          </div>
        </div>,
        tooltipRoot
      )
    : null
}
