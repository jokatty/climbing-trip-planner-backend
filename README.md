Api calls:

GET Data:

<!-- Get the trips from db. Not filtered by the user id -->

app.get('/trips');

<!-- get all the routes from a particular trip id -->

app.get('/trip/:id');

POST Data:

<!-- Create a new trip -->

app.post('/trips',
{
tripName,

<!-- tripStart,
updatedAt, -->

}
);

<!-- Create a new route in a trip -->

app.post('/trip/:id', {
routeName,

<!-- difficulty,
isCompleted:false -->

});
