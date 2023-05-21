const { GraphQLScalarType, Kind } = require('graphql');

exports.DateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'A date string in ISO 8601 format (YYYY-MM-DD)',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.toISOString().split('T')[0]; // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

exports.Time12HourScalarType = new GraphQLScalarType({
  name: 'Time12Hour',
  description: 'A time string in 12-hour format (hh:mm A or hh:mm P)',

  parseValue(value) {
    const regex = /^(0[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i;
    if (!regex.test(value)) {
      throw new Error('Invalid time format. Expected hh:mm A or hh:mm P.');
    }
    return value; // value from the client
  },

  serialize(value) {
    const regex = /^(0[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i;
    if (!regex.test(value)) {
      throw new Error('Invalid time format. Expected hh:mm A or hh:mm P.');
    }
    return value; // value sent to the client
  },

  parseLiteral(ast) {
    const regex = /^(0[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i;
    if (ast.kind === Kind.STRING && regex.test(ast.value)) {
      return ast.value; // ast value is always in string format
    }
    return null;
  },
});

