const express = require('express');
const router = express.Router();

let recipes = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(recipes);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

router.post('/', (req, res) => {
  const { name, description = '', ingredients = [], steps = [] } = req.body;
  if (!name || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid recipe payload. "name" and "ingredients" required.' });
  }
  const newRecipe = { id: nextId++, name, description, ingredients, steps };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = recipes.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });
  const { name, description = '', ingredients = [], steps = [] } = req.body;
  if (!name || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid recipe payload. "name" and "ingredients" required.' });
  }
  const updated = { id, name, description, ingredients, steps };
  recipes[idx] = updated;
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = recipes.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });
  recipes.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;

