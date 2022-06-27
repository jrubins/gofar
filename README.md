# GO-FAR

The GO-FAR calculator is an application to calculate a GO-FAR score based on the research done by Dr. Ebell.

- [https://gofarcalc.com](https://gofarcalc.com)

## Deployment

Deployment is handled via [Vercel](https://vercel.com/).

## Development

To run the application locally, make sure the project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Todo

- [ ] Delete Netlify project
- [ ] Set up Husky for pre-commit checks
- [ ] Set up Sentry for error monitoring
- [ ] Verify FullStory sessions are being captured correctly and delete Inspectlet account
- [ ] Add automated tests (unit and E2E)

## Technologies

This application uses the following technologies and third-parties:

- [Remix](https://remix.run/)
- [Vercel](https://vercel.com/)
- [Segment](https://segment.com/)
- [Google Analytics](https://analytics.google.com/)
- [FullStory](https://fullstory.com/)
