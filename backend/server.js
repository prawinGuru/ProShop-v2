import express from 'express';

// setting up server to read environment variables from .env file
import dotenv from 'dotenv';

// reads the .env file and loads the variable into process.env (global object that contains env variables for current process)
dotenv.config();
import products from './data/products.js';

const port = process.env.PORT || 5000;
const app = express();

// (URL/ API endpoints, (req, res as arrow function))
app.get('/', (req, res) => {
res.send('API is running...');
});

app.get('/api/products', (req, res) => {
res.json(products);
});

// :id is the placeholder or route parameter
//params.id == :id
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product);
});

// starts the express server and listens to the port.
// Once the port starts, it this message is shoen in console
app.listen(port, () => console.log(`Server running on port ${port}`));