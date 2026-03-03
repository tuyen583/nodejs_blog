const path = require('path');
const { engine } = require('express-handlebars');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const route = require('./route');
const db = require('./config/db');

//connect to db
db.connect();
//Http logger
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//teamplate engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// console.log(path.join(__dirname, 'resources', 'views'));

console.log('Path:', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
