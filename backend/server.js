const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = './users.json';

app.use(cors());
app.use(express.json());

// Read users from file
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Write users to file
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.json({ message: 'User already exists' });
  }

  users.push({ username, password }); // Later, we'll hash passwords
  saveUsers(users);

  res.json({ message: 'Signup successful' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.json({ message: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});