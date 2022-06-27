import type { ButtonHTMLAttributes } from 'react'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: boolean
}

export default function Button({ asLink, ...rest }: Props): JSX.Element {
  const classes = asLink
    ? 'text-blue-600 hover:text-blue-800 hover:underline'
    : 'cursor-pointer rounded bg-blue-400 py-2 px-4 text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-200'

  return <button className={classes} {...rest} />
}
