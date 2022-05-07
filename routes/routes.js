// Pet Routes
const adoptionRouter = require('./mascot/PetAdoptionRoute');
const foundRouter = require('./mascot/PetFoundRoute');
const lostRouter = require('./mascot/PetLostRoute');
const rescueRouter = require('./mascot/PetRescueRoutes');
// User Routes
const adminRouter = require('./user/AdminRoute');
const organizationRouter = require('./user/OrganizationRoute');

module.exports = {
  adoptionRouter,
  foundRouter,
  lostRouter,
  adminRouter,
  organizationRouter,
  rescueRouter
}