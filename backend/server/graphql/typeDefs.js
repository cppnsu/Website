const { gql } = require('@apollo/server')
const { Event, Links } = require("../db/models/Models")
const { DateScalarType, Time12HourScalarType } = require("./DateScalarType")

const typeDefs = `
  scalar Date
  scalar Time12Hour

  # EVENT OBJECT 
  type Event {
    _id: ID!
    Name: String!
    Date_Start: Date!
    Date_End: Date
    Time_Start: Time12Hour!
    Time_End: Time12Hour
    Location: String!
    More_Info: String!
    Photo_url: String!
    Member_Price: Int!
    Non_Member_Price: Int!
    Sign_up_form: String!
  }
  input addEventInput {
  _id: ID
  Name: String!
  Date_Start: String!
  Date_End: String
  Time_Start: Time12Hour!
  Time_End: Time12Hour
  Location: String!
  More_Info: String!
  Photo_url: String!
  Member_Price: Int!
  Non_Member_Price: Int!
  Sign_up_form: String!
  }
  input updateEventInput {
  _id: ID
  Name: String
  Date_Start: String
  Date_End: String
  Time_Start: Time12Hour
  Time_End: Time12Hour
  Location: String
  More_Info: String
  Photo_url: String
  Member_Price: Int
  Non_Member_Price: Int
  Sign_up_form: String
  }
  
  # LINKS
  type linkObject {
    Placeholder: String!
    Link: String!
  }
  type Links {
    _id: ID!
    link_objects: [linkObject!]!
    Name: String!  
  }

  input linkObjectInput {
    Placeholder: String!
    Link: String!
  }
  input LinksInput {
    Name: String
    link_objects: [linkObjectInput]
  }

  type Query {
    upcomingEvents: [Event!]
    threeUpcomingEvents: [Event!]
    getLinksList: [Links!]!
  }

  type Mutation {
    addEvent(input: addEventInput!): Event
    updateEvent( name: String!, input: updateEventInput): Event
    deleteEvent(name: String!): Event
    addLink(input: LinksInput): linkObject
    updateLink(name: String!, index: Int!, args: linkObjectInput!): Links
    updateManyLinks(input: LinksInput): Links
    # Just enter the name for the link and it would delete
    deleteLink(input: String!): Links
    deleteManyLinks(input: LinksInput): Links
    deleteLinkSection(input: String!): Links
  }
`;

module.exports = typeDefs;
