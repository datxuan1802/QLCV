export default () => ({
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  email: {
    transport: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, //set to true for SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      defaults: {
        from: process.env.SMTP_USER,
      },
    },
  },
});
