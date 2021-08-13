import db from './models/index.mjs';

// import your controllers here
// import initRoutesController from './controllers/routes.mjs';
import initTripsController from './controllers/trips.mjs';

export default function bindRoutes(app) {
  // pass in the db for all items callbacks
  // const RoutesController = initRoutesController(db);
  const TripsController = initTripsController(db);

  // app.get('/routes', RoutesController.index);
  app.get('/trips', TripsController.index);
  app.post('/trips', TripsController.create);
  app.get('/trip/:id', TripsController.show);
  // create a new route(location) under a trip id.
  app.post('/trip/:id', TripsController.createRoute);
  app.get('/', (req, res) => {
    console.log('root route request came in');
    res.send('this os working');
  });
}
