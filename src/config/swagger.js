const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST con Autenticación JWT',
      version: '1.0.0',
      description: 'API REST desarrollada con Node.js, Express y JWT para autenticación de usuarios',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'https://backclinica.azurewebsites.net',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT obtenido del login'
        }
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario',
              example: 'admin'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario',
              example: 'admin123'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario',
              example: 'newuser'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario',
              example: 'user@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Contraseña del usuario (mínimo 6 caracteres)',
              example: 'password123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Login exitoso'
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token JWT de autenticación',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1
                    },
                    username: {
                      type: 'string',
                      example: 'admin'
                    },
                    email: {
                      type: 'string',
                      example: 'admin@example.com'
                    }
                  }
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error en la operación'
            }
          }
        },
        VerifyResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Token válido'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints de autenticación y gestión de usuarios'
      },
      {
        name: 'Clients',
        description: 'Gestión de clientes'
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios del sistema'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
