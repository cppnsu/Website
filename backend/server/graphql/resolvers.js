const Links = require('../db/models/Links')
const Event = require('../db/models/Event')
const DateScalarType = require('./DateScalarType')

const resolvers = {
  Date: DateScalarType,
  Query: {
    threeUpcomingEvents: async () => {
      try {
        const threeEvents = await Event.find({ Date_Start: { $lt: Date.now() } }).sort({ Date_Start: 1 }).limit(3);
        return threeEvents;
      } catch (err) {
        console.error(err);
        throw new Error("Could not fetch three upcoming events")
      }
    },
    upcomingEvents: async () => {
      try {
        const Events = await Event.find({});
        return Events;
      } catch (err) {
        console.error(err);
        throw new Error("Could not fetch upcoming events")
      }
    },
    getLinksList: async () => {
      try {
        const links = await Links.find({});
        return links;
      } catch (err) {
        console.error(err);
        throw new Error("Could not fetch links")
      }
    },
  },
  Mutation: {
    addEvent: async (_, args) => {
      try {
        const newEvent = new Event(args.input)
        const savedEvent = newEvent.save()
        return savedEvent
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    updateEvent: async (_, { name, input }) => {
      try {
        const updatedEvent = await Event.findOneAndUpdate(
          name,
          { $set: input },
          { new: true }
        );
        return updatedEvent;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    deleteEvent: async (_, { name }) => {
      try {
        const deletedEvent = await Event.findOneAndDelete({ Name: name });
        return deletedEvent;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    updateLink: async (_, { name, index, ...payload }) => {
      try {
        // find parent object by using name
        const parent = await Links.find({ Name: name })
        if (!parent) {
          throw new Error(`Could not find the section with the name: ${name}`)
        }

        // Here, the payload NEEDS to have both payload AND link
        parent[0].link_objects[index] = payload.args;

        // save changes
        await parent[0].save()
        return parent;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  },
};

module.exports = resolvers
