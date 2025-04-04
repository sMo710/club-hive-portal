
// Simple Express server for ClubHive
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated database (in-memory storage)
const db = {
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Student User',
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
  ],
  clubs: [
    {
      id: '1',
      name: 'Coding Club',
      description: 'A club for programming enthusiasts',
      members: ['1', '2'],
      adminId: '1',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    },
    {
      id: '2',
      name: 'Photography Club',
      description: 'Capture beautiful moments',
      members: ['2'],
      adminId: '1',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    },
  ],
  events: [
    {
      id: '1',
      title: 'Coding Workshop',
      description: 'Learn to code with React',
      clubId: '1',
      date: '2023-05-15T18:00:00',
      location: 'Room 101',
      registeredUsers: ['2'],
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
    },
    {
      id: '2',
      title: 'Photo Walk',
      description: 'Explore the city with your camera',
      clubId: '2',
      date: '2023-05-20T10:00:00',
      location: 'City Park',
      registeredUsers: [],
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
    },
  ],
  eventRegistrations: [],
};

// AUTH ROUTES
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(
    u => u.email === email && u.password === password
  );
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (db.users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already in use' });
  }
  
  const newUser = {
    id: String(db.users.length + 1),
    name,
    email,
    password,
    role,
    avatar: `https://i.pravatar.cc/150?img=${db.users.length + 3}`,
  };
  
  db.users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ user: userWithoutPassword });
});

// CLUBS ROUTES
app.get('/api/clubs', (req, res) => {
  res.json(db.clubs);
});

app.get('/api/clubs/:id', (req, res) => {
  const club = db.clubs.find(c => c.id === req.params.id);
  
  if (!club) {
    return res.status(404).json({ error: 'Club not found' });
  }
  
  res.json(club);
});

app.post('/api/clubs', (req, res) => {
  const { name, description, adminId, image } = req.body;
  
  const newClub = {
    id: String(db.clubs.length + 1),
    name,
    description,
    members: [adminId],
    adminId,
    image: image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
  };
  
  db.clubs.push(newClub);
  res.status(201).json(newClub);
});

// EVENTS ROUTES
app.get('/api/events', (req, res) => {
  res.json(db.events);
});

app.get('/api/events/:id', (req, res) => {
  const event = db.events.find(e => e.id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  res.json(event);
});

app.post('/api/events', (req, res) => {
  const { title, description, clubId, date, location, image } = req.body;
  
  const newEvent = {
    id: String(db.events.length + 1),
    title,
    description,
    clubId,
    date,
    location,
    registeredUsers: [],
    image: image || 'https://images.unsplash.com/photo-1511578314322-379afb476865',
  };
  
  db.events.push(newEvent);
  res.status(201).json(newEvent);
});

// EVENT REGISTRATION
app.post('/api/events/:id/register', (req, res) => {
  const { userId, answers } = req.body;
  const eventId = req.params.id;
  
  const event = db.events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  if (event.registeredUsers.includes(userId)) {
    return res.status(400).json({ error: 'User already registered for this event' });
  }
  
  event.registeredUsers.push(userId);
  
  const registration = {
    id: String(db.eventRegistrations.length + 1),
    eventId,
    userId,
    answers,
    timestamp: new Date().toISOString(),
  };
  
  db.eventRegistrations.push(registration);
  res.status(201).json({ success: true, registration });
});

app.get('/api/events/:id/registrations', (req, res) => {
  const eventId = req.params.id;
  const registrations = db.eventRegistrations.filter(r => r.eventId === eventId);
  res.json(registrations);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
