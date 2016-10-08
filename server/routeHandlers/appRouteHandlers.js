import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import configureStore from 'store/configureStore';
import routes from 'routes';

export default function appRouteHandlers(app) {
  // We use React Router to decide which component to show for which route.
  app.get('*', (req, res) => {
    match({
      routes,
      location: req.url,
    }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        console.log('Redirecting...', redirectLocation);
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // Create our server store.
        const store = configureStore({});

        // Render our React components to a string that we insert into our Pug index template.
        const html = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        // Get our final state.
        const storeState = store.getState();

        res.status(200).render('index', {
          html: html,
          state: storeState,
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  });
}
