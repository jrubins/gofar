import type { LabelHTMLAttributes, ReactNode } from 'react'

export default function Label({
  children,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return (
    <label className="mb-1 block text-sm uppercase text-gray-600" {...rest}>
      {children}
    </label>
  )
}
