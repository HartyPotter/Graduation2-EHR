export default {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'EHR',
        version: '1.0.0',
        description: 'The API documentation of a RESTful APIs for EHR.',
        license: {
          name: 'MIT',
          url: 'https://choosealicense.com/licenses/mit/',
        },
        contact: {
          name: 'G1',
          url: 'https://github.com/AuroraaSan/Graduation2-EHR',
        },
      },
      basePath: '/api',
      servers: [
        {
          url: 'http://localhost:3000/api/',
        },
      ],
    },
    tags: [
      {
        "name": "User",
        "description": "API for users"
      }
    ],
    apis: [
      "src/models/*.js",
      "src/utils/helpers/*.js",
      "src/api/controllers/user/*.js",
      // "src/api/controllers/user/edit/*.js",
      // "src/api/controllers/user/auth/*.js"
    ]
  };