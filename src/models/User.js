const bcrypt = require('bcryptjs');

// Simulación de base de datos de usuarios (en producción usar BD real)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    // password: 'admin123' (hasheado)
    password: '$2a$10$X8qJ3Z9qZ9qZ9qZ9qZ9qZOYvYvYvYvYvYvYvYvYvYvYvYvYvYvYv'
  }
];

class User {
  static async findByUsername(username) {
    return users.find(user => user.username === username);
  }

  static async findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: users.length + 1,
      username: userData.username,
      email: userData.email,
      password: hashedPassword
    };
    users.push(newUser);
    return newUser;
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
