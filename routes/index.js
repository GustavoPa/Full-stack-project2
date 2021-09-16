////////////////////////////////////////////////
///////// CONTROLLERS / API / INDEX ////////////
//////////// PACKAGING API ROUTES //////////////
////////////////////////////////////////////////

const router = require('express').Router();

const artistRoutes = require('./artist-routes');

router.use('/artists', artistRoutes);





module.exports = router;