const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/exhibitions', async (req, res) => {
  const exhibition = await prisma.exhibition.create({
    data: req.body,
  });
  res.json(exhibition);
});

app.get('/exhibitions', async (req, res) => {
  const exhibitions = await prisma.exhibition.findMany();
  res.json(exhibitions);
});

app.put('/exhibitions/:id', async (req, res) => {
  const { id } = req.params;
  const exhibition = await prisma.exhibition.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.json(exhibition);
});

app.delete('/exhibitions/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.exhibition.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
