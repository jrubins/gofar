import type { InputHTMLAttributes } from 'react'

export type Props = InputHTMLAttributes<HTMLInputElement>

export default function Input(props: Props): JSX.Element {
  return (
    <input
      className="h-10 w-full rounded border border-gray-300 px-2"
      {...props}
    />
  )
}
