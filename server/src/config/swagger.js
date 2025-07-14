import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cinema Booking API',
      version: '1.0.0',
      description: 'API documentation for Cinema Booking System using Node.js, Sequelize, Docker and Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local server',
      },
    ],
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Cinema Chains', description: 'Cinema chain management endpoints' },
      { name: 'Cinema Clusters', description: 'Cinema cluster management endpoints' },
      { name: 'Cinemas', description: 'Cinema management endpoints' },
      { name: 'Movies', description: 'Movie management endpoints' },
      { name: 'Showtimes', description: 'Showtime management endpoints' },
      { name: 'Seats', description: 'Seat management endpoints' },
      { name: 'Orders', description: 'Order management endpoints' },
      //{ name: 'Tickets', description: 'Ticket management endpoints' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: { type: 'string', description: 'Unique ID of the user' },
            username: { type: 'string', description: 'Username' },
            email: { type: 'string', description: 'User email' },
            phone: { type: 'string', description: 'User phone number' },
            user_role: { type: 'string', enum: ['admin', 'user'], description: 'User role' },
          },
          required: ['user_id', 'username', 'email', 'phone', 'user_role'],
        },
        CinemaChain: {
          type: 'object',
          properties: {
            chain_id: { type: 'string', description: 'Unique ID of the cinema chain' },
            chain_name: { type: 'string', description: 'Name of the cinema chain' },
            logo: { type: 'string', description: 'URL of the chain logo' },
          },
          required: ['chain_id', 'chain_name'],
        },
        CinemaCluster: {
          type: 'object',
          properties: {
            cluster_id: { type: 'string', description: 'Unique ID of the cinema cluster' },
            cluster_name: { type: 'string', description: 'Name of the cinema cluster' },
            address: { type: 'string', description: 'Address of the cluster' },
            chain_id: { type: 'string', description: 'ID of the associated cinema chain' },
          },
          required: ['cluster_id', 'cluster_name', 'address', 'chain_id'],
        },
        Cinema: {
          type: 'object',
          properties: {
            cinema_id: { type: 'string', description: 'Unique ID of the cinema' },
            cinema_name: { type: 'string', description: 'Name of the cinema' },
            cluster_id: { type: 'string', description: 'ID of the associated cinema cluster' },
            rowCount: { type: 'integer', description: 'Number of seat rows' },
            columnCount: { type: 'integer', description: 'Number of seat columns' },
          },
          required: ['cinema_id', 'cinema_name', 'cluster_id', 'rowCount', 'columnCount'],
        },
        Movie: {
          type: 'object',
          properties: {
            movie_id: { type: 'string', description: 'Unique ID of the movie' },
            title: { type: 'string', description: 'Movie title' },
            country: { type: 'string', description: 'Country of origin' },
            genre: { type: 'string', description: 'Movie genre' },
            duration: { type: 'integer', description: 'Movie duration in minutes' },
            release_date: { type: 'string', format: 'date', description: 'Release date' },
            age_limit: { type: 'string', description: 'Age restriction' },
            director: { type: 'string', description: 'Director name' },
            cast: { type: 'string', description: 'Cast list' },
            description: { type: 'string', description: 'Movie description' },
            linkTrailer: { type: 'string', description: 'Trailer URL' },
            poster: { type: 'string', description: 'Poster URL' },
            status: { type: 'string', enum: ['Coming Soon', 'Now Showing'], description: 'Movie status' },
          },
          required: ['movie_id', 'title', 'country', 'genre', 'duration', 'release_date', 'status'],
        },
        Showtime: {
          type: 'object',
          properties: {
            showtime_id: { type: 'string', description: 'Unique ID of the showtime' },
            showtime_date: { type: 'string', format: 'date', description: 'Showtime date' },
            showtime_starttime: { type: 'string', description: 'Start time (HH:mm)' },
            showtime_endtime: { type: 'string', description: 'End time (HH:mm)' },
            price: { type: 'number', description: 'Ticket price' },
            movie_id: { type: 'string', description: 'ID of the associated movie' },
            cinema_id: { type: 'string', description: 'ID of the associated cinema' },
          },
          required: ['showtime_id', 'showtime_date', 'showtime_starttime', 'price', 'movie_id', 'cinema_id'],
        },
        Seat: {
          type: 'object',
          properties: {
            seat_id: { type: 'string', description: 'Unique ID of the seat' },
            cinema_id: { type: 'string', description: 'ID of the associated cinema' },
            row: { type: 'integer', description: 'Row number' },
            column: { type: 'integer', description: 'Column number' },
            type: { type: 'string', enum: ['VIP', 'Normal'], description: 'Seat type' },
          },
          required: ['seat_id', 'cinema_id', 'row', 'column', 'type'],
        },
        OrderTable: {
          type: 'object',
          properties: {
            order_id: { type: 'string', description: 'Unique ID of the order' },
            user_id: { type: 'string', description: 'ID of the associated user' },
            order_date: { type: 'string', format: 'date-time', description: 'Order creation date' },
            total_amount: { type: 'number', description: 'Total order amount' },
            payment_status: { type: 'string', enum: ['Pending', 'Completed', 'Canceled'], description: 'Payment status' },
          },
          required: ['order_id', 'user_id', 'order_date', 'total_amount', 'payment_status'],
        },
        Ticket: {
          type: 'object',
          properties: {
            ticket_id: { type: 'string', description: 'Unique ID of the ticket' },
            showtime_id: { type: 'string', description: 'ID of the associated showtime' },
            order_id: { type: 'string', description: 'ID of the associated order' },
            seat_id: { type: 'string', description: 'ID of the associated seat' },
            ticket_status: { type: 'string', enum: ['Booked', 'Used', 'Canceled'], description: 'Ticket status' },
            movie_id_snapshot: { type: 'string', description: 'Snapshot of movie ID' },
            movie_title_snapshot: { type: 'string', description: 'Snapshot of movie title' },
            chain_id_snapshot: { type: 'string', description: 'Snapshot of cinema chain ID' },
            chain_name_snapshot: { type: 'string', description: 'Snapshot of cinema chain name' },
            cluster_id_snapshot: { type: 'string', description: 'Snapshot of cinema cluster ID' },
            cluster_name_snapshot: { type: 'string', description: 'Snapshot of cinema cluster name' },
            address_snapshot: { type: 'string', description: 'Snapshot of cinema cluster address' },
            cinema_name_snapshot: { type: 'string', description: 'Snapshot of cinema name' },
            row_snapshot: { type: 'integer', description: 'Snapshot of seat row' },
            column_snapshot: { type: 'integer', description: 'Snapshot of seat column' },
            showtime_date_snapshot: { type: 'string', format: 'date', description: 'Snapshot of showtime date' },
            showtime_starttime_snapshot: { type: 'string', description: 'Snapshot of showtime start time' },
            showtime_endtime_snapshot: { type: 'string', description: 'Snapshot of showtime end time' },
            price_snapshot: { type: 'number', description: 'Snapshot of ticket price' },
          },
          required: ['ticket_id', 'showtime_id', 'order_id', 'seat_id', 'ticket_status'],
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };