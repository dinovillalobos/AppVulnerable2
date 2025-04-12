const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUNAM', {
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

mongoose.connection.once('open', async () => {
  const existingUser = await User.findOne({ username: 'admin' });
  if (!existingUser) {
    await User.create({ username: 'admin', password: 'admin123' });
    console.log('Usuario de prueba creado: admin / admin123');
  } else {
    console.log('Usuario de prueba ya existe');
  }
});

app.post('/login', async (req, res) => {
  console.log('Intento de login con:', req.body);

  try {
    const user = await User.findOne(req.body); // Vulnerable a NoSQL Injection
    if (user) {
      res.send('Login exitoso!');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
