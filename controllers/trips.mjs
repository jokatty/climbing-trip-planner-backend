// db is an argument to this function so
// that we can make db queries inside
export default function initTripsController(db) {
  const index = (request, response) => {
    console.log('trips route request came in');
    db.Trip.findAll()
      .then((trips) => {
        response.send({ trips });
      })
      .catch((error) => console.log(error));
  };
  // create a new trip
  const create = async (request, response) => {
    const { tripName } = request.body;
    try {
      const postResponse = await db.Trip.create({
        name: tripName,
      });
      response.send(postResponse);
    } catch (error) {
      console.log(error);
    }
  };

  //  get all the routes for one trip id
  const show = (request, response) => {
    const tripId = request.params.id;
    db.Route.findAll({
      where: {
        tripId,
      },
    }).then((tripRoutes) => {
      console.log(tripRoutes);
      response.send({ tripRoutes });
    }).catch((error) => console.log(error));
  };

  // add a route to a trip using that trip's trip id
  const createRoute = async (request, response) => {
    const { routeName, difficulty } = request.body;
    try {
      const postResponse = await db.Route.create({
        name: routeName,
        difficulty,
        isCompleted: false,
      });
      response.send(postResponse);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    show,
    create,
    createRoute,
  };
}
