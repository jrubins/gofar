import type { TextareaHTMLAttributes } from 'react'

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea(props: Props): JSX.Element {
  return (
    <textarea
      className="w-full rounded border border-gray-300 p-2"
      rows={3}
      {...props}
    />
  )
}
