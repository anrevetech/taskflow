const express = require('express');
const router = express.Router();
const supabase = require('../db/supabaseClient');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { title, due_date, source } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, due_date: due_date || null, source: source || 'app' }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { is_complete } = req.body;
  const { data, error } = await supabase
    .from('tasks')
    .update({ is_complete })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

module.exports = router;