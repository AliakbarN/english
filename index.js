require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mainClientRouter = require('./server/client/router/main');
const mainApiRouter = require('./server/api/router/main');
const bodyParser = require('body-parser');

mongoose
  .connect(process.env['DB_URL'], { useNewUrlParser: true, useUnifiedTopology: true })
  .then( res => console.log('Conected to DB'))
  .catch( err => console.log(err));

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use('/', mainClientRouter)
  .use('/api', mainApiRouter)
  .use(require('./server/client/controller/main').notFound);


