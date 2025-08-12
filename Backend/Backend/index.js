const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const recipesRouter = require('./routes/recipes');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Flavour Fusion API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000', description: 'Local Server' }]
  },
  apis: ['./routes/*.js']
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.send({ message: 'Flavour Fusion API is running' }));
app.use('/recipes', recipesRouter);
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api-docs`));
