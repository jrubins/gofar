import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import invariant from 'tiny-invariant'

import tailwindStylesheetUrl from './tailwind.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

export const loader: LoaderFunction = () => {
  invariant(
    process.env.SEGMENT_WRITE_KEY,
    'SEGMENT_WRITE_KEY environment variable not set.'
  )

  const ENV: Window['ENV'] = {
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
  }

  return json({ ENV })
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  description:
    'GO-FAR calculator to estimate the chance of good outcomes following CPR in the hospital.',
  title: 'GO-FAR Calculator',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  const data = useLoaderData()

  return (
    <html className="h-full" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-50">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
