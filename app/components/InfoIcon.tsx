import type { SVGAttributes } from 'react'

export default function InfoIcon(
  props: Omit<
    SVGAttributes<SVGElement>,
    'fill' | 'stroke' | 'viewBox' | 'xmlns'
  >
): JSX.Element {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
