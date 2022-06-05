const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const homeRouter = require('./src/routers/homeRouter');
const productsRouter = require('./src/routers/productsRouter');


app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/home', homeRouter);
app.use('/products', productsRouter);



app.get('/Home', (req, res) => {
  res.render('home', { title: 'Products' });
  });
  
app.get('/', (req, res) => {
    res.redirect("/Home");
  });

app.get('/products', (req, res) => {
    res.render('products', { title: 'Products' });
    });
    
app.get('/products/:id', (req, res) => {
    res.render('product', { title: 'Product' });
  });



app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
