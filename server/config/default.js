module.exports = {
  port: 3000,
  mongoUri: 'mongodb+srv://Siusarna:Rz4KOQ5cyAFYBL1K@cluster0-e51fg.mongodb.net/test?retryWrites=true&w=majority',
  jwt: {
    secret: 'Siusarna',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '30m',
      },
      refresh: {
        type: 'refresh',
        expiresIn: '40m',
      },
    },
  },
  minimumTeacherAge: 25,
};
