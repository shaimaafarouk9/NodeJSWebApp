const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter = require('./src/routers/productsRouter');
const homeRouter = require('./src/routers/homeRouter');

app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);
app.use('/home', homeRouter);

app.get('/Home', (req, res) => {
  res.render('home', { title: 'Products' });
  });
  app.get('/products/:id', (req, res) => {
    res.render('product', { title: 'Product' });
  });


app.get('/', (req, res) => {
  res.redirect("/Home");
});



app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
