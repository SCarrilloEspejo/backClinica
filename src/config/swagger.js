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
        email: 'sergiocarrilloespejo@gmail.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local de desarrollo'
      },
      {
        url: 'https://backclinica.azurewebsites.net',
        description: 'Servidor de producción'
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
        },
        PaymentMethodRequest: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: {
              type: 'string',
              maxLength: 150,
              description: 'Nombre de la forma de pago',
              example: 'Tarjeta'
            },
            descripcion: {
              type: 'string',
              maxLength: 500,
              description: 'Descripción de la forma de pago',
              example: 'Pago mediante tarjeta de crédito'
            }
          }
        },
        PaymentMethodResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            nombre: {
              type: 'string',
              example: 'Tarjeta'
            },
            descripcion: {
              type: 'string',
              example: 'Pago mediante tarjeta de crédito'
            }
          }
        },
        TypologyRequest: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: {
              type: 'string',
              maxLength: 150,
              description: 'Nombre de la tipología',
              example: 'General'
            },
            descripcion: {
              type: 'string',
              maxLength: 500,
              description: 'Descripción de la tipología',
              example: 'Tipología para procedimientos generales'
            }
          }
        },
        TypologyResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            nombre: {
              type: 'string',
              example: 'General'
            },
            descripcion: {
              type: 'string',
              example: 'Tipología para procedimientos generales'
            }
          }
        },
        AppointmentRequest: {
          type: 'object',
          required: ['doctoraId', 'pacienteNombre', 'tipologiaId', 'formaPagoId', 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin'],
          properties: {
            doctoraId: {
              type: 'integer',
              description: 'ID de la doctora',
              example: 1
            },
            pacienteId: {
              type: 'integer',
              description: 'ID del paciente (opcional)',
              example: 1
            },
            pacienteNombre: {
              type: 'string',
              description: 'Nombre del paciente',
              example: 'María González'
            },
            pacienteTelefono: {
              type: 'string',
              description: 'Teléfono del paciente',
              example: '600111222'
            },
            pacienteEmail: {
              type: 'string',
              format: 'email',
              description: 'Email del paciente',
              example: 'maria@example.com'
            },
            tipologiaId: {
              type: 'integer',
              description: 'ID de la tipología',
              example: 1
            },
            formaPagoId: {
              type: 'integer',
              description: 'ID de la forma de pago',
              example: 1
            },
            tipo: {
              type: 'string',
              description: 'Tipo de cita',
              example: 'presencial'
            },
            ubicacion: {
              type: 'string',
              description: 'Ubicación',
              example: 'Consulta 1'
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'realizada', 'no_realizada'],
              description: 'Estado de la cita',
              example: 'pendiente'
            },
            motivo: {
              type: 'string',
              description: 'Motivo de la cita',
              example: 'Revisión anual'
            },
            notasClinicas: {
              type: 'string',
              description: 'Notas clínicas',
              example: 'Paciente con buena evolución'
            },
            duracionMinutos: {
              type: 'integer',
              description: 'Duración en minutos',
              example: 15
            },
            costo: {
              type: 'number',
              description: 'Costo de la cita',
              example: 50.00
            },
            moneda: {
              type: 'string',
              description: 'Moneda',
              example: 'EUR'
            },
            fechaInicio: {
              type: 'string',
              format: 'date',
              description: 'Fecha de inicio',
              example: '2026-02-07'
            },
            horaInicio: {
              type: 'string',
              description: 'Hora de inicio',
              example: '09:00'
            },
            fechaFin: {
              type: 'string',
              format: 'date',
              description: 'Fecha de fin',
              example: '2026-02-07'
            },
            horaFin: {
              type: 'string',
              description: 'Hora de fin',
              example: '09:15'
            }
          }
        },
        AppointmentResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            doctoraId: {
              type: 'integer',
              example: 1
            },
            pacienteId: {
              type: 'integer',
              example: 1
            },
            pacienteNombre: {
              type: 'string',
              example: 'María González'
            },
            pacienteTelefono: {
              type: 'string',
              example: '600111222'
            },
            pacienteEmail: {
              type: 'string',
              example: 'maria@example.com'
            },
            tipologiaId: {
              type: 'integer',
              example: 1
            },
            formaPagoId: {
              type: 'integer',
              example: 1
            },
            tipo: {
              type: 'string',
              example: 'presencial'
            },
            ubicacion: {
              type: 'string',
              example: 'Consulta 1'
            },
            estado: {
              type: 'string',
              example: 'pendiente'
            },
            motivo: {
              type: 'string',
              example: 'Revisión anual'
            },
            notasClinicas: {
              type: 'string',
              example: 'Paciente con buena evolución'
            },
            duracionMinutos: {
              type: 'integer',
              example: 15
            },
            costo: {
              type: 'number',
              example: 50.00
            },
            moneda: {
              type: 'string',
              example: 'EUR'
            },
            fechaInicio: {
              type: 'string',
              example: '2026-02-07'
            },
            horaInicio: {
              type: 'string',
              example: '09:00'
            },
            fechaFin: {
              type: 'string',
              example: '2026-02-07'
            },
            horaFin: {
              type: 'string',
              example: '09:15'
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
      },
      {
        name: 'FormasPago',
        description: 'Gestión de formas de pago'
      },
      {
        name: 'Tipologias',
        description: 'Gestión de tipologías'
      },
      {
        name: 'Appointments',
        description: 'Gestión de citas'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
