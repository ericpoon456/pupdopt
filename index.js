// Dependencies Index
const express = require('express'); //Express
const app = express();
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config({ path: '.env' }); //DotENV
//  MongoDB/Mongoose configurations 
const mongodb = require('./config/mongodb');
// Enable express.json() and send data by url-encoded
app.use(express.json({ extended: true, limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' })); 
app.use(helmet());
app.use(cors());
//routes import
const routes = require('./routes/routes');
// Ruta de inicio
app.get('/api', (req, res) => res.json({
  status: 200,
  msg: `Bienvenido a AdoptaPY API, actualmente estamos en la version ${process.env.API_VERSION} !`
}));
// Mascot Routes
app.use('/api', routes.adoptionRouter);
app.use('/api', routes.foundRouter);
app.use('/api', routes.lostRouter);
// User Routes
app.use('/api', routes.adminRouter);
app.use('/api', routes.organizationRouter);
app.use('/api', routes.rescueRouter);
//server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  mongodb();
  console.log(`Server is running on port ${PORT}.`);
});