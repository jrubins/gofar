import type { SVGAttributes } from 'react'

const XIcon = (
  props: Omit<
    SVGAttributes<SVGElement>,
    'fill' | 'stroke' | 'viewBox' | 'xmlns'
  >
): JSX.Element => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

export default XIcon
