const { gql } = require('@apollo/server')
//const { Event, Links, CultureNight, About } = require("../db/models/Models")
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
  _id: ID!
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

  # CULTURE NIGHT
  type cultureNight {
  _id: ID!
  Summary: String
  CN_Date: Date
  Time_start: String
  Price: Float
  Featured: [String]
  Description: String
  Japanese_title: String
  English_definition: String
  English_romaji: String
  Gallery: [String]
  more_info_pdf: String
}
  input updateCultureNight {
  _id: ID
  Summary: String
  CN_Date: Date
  Time_start: String
  Time_end: String
  Price: Float
  Featured: [String]
  Description: String
  Japanese_title: String
  English_definition: String
  English_romaji: String
  Gallery: [String]
  more_info_pdf: String
}

  # ABOUT 
  type About {
  _id: ID!
  Description: String
  Signup_Link: String
  Splash_photo_link: String
  Splash_photo_ID: String
  Board_Members: [boardMember]
  Gallery: [String]
}
type boardMember {
  Name: String
  Position: String
  Year: String
  Major: String
  Headshot_Link: String
}
input boardMemberInput {
  Name: String
  Position: String
  Year: String
  Major: String
  Headshot_Link: String
}
  input updateAbout {
  _id: ID!
  Description: String
  Signup_Link: String
  Splash_photo_link: String
  Splash_photo_ID: String
  Board_Members: [boardMemberInput]
  Gallery: [String]
  }

  type Query {
    upcomingEvents: [Event!]
    threeUpcomingEvents: [Event!]
    getLinksList: [Links!]!
    getCultureNight: [cultureNight!]
    getAbout: [About!]
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
    updateCultureNight(input: ID): cultureNight
    updateAbout(input: ID): About
  }
`;

module.exports = typeDefs;
