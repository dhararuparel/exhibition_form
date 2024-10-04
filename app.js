const express = require('express');
const app = express();
const visitorsRoutes = require('./routes/UserRoutes.js');

app.use(express.json()); // Parses incoming JSON requests
app.use('/api', visitorsRoutes); // Prefix routes with `/api`

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
