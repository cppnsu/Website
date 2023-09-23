require("dotenv").config({ override: true, debug: true, path: __dirname + "/../.env" });
const jwt = require('jsonwebtoken')
const DateScalarType = require('./DateScalarType')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require("uuid");
const {
  Event,
  Links, 
  CultureNight, 
  About,
  User,
  RefreshToken
} = require("../db/models/Models")

function generateAccessToken(user) {
  return jwt.sign({email: user.email, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"})
}

// Assuming school year always ends on june 1st, so we just need seconds until upcoming june 1st
// Also doing this so everyone gets logged out on june 1st (refresh token gets expired)
function secondsTillEndOfCurrentSchoolYear() {
  const currDate = new Date()
  if(currDate.getMonth() >= 5) {
    const upcomingJune = new Date(currDate.getFullYear() + 1, 5, 1)
    return Math.floor((upcomingJune - currDate) / 1000)
  }
  const upcomingJune = new Date(currDate.getFullYear(), 5, 1)
  return Math.floor((upcomingJune - currDate) / 1000)
}

function validateUserIsAdmin(context) {
  if(!context.userInfo || context.userInfo.role !== "admin") {
    throw new Error("Inadequete permissions, only admins can perform this action")
  }
}


const resolvers = {
  Date: DateScalarType,
  Query: {
    threeUpcomingEvents: async () => {
      try {
        const threeEvents = await Event.find({ Date_Start: { $gt: Date.now() } }).sort({ Date_Start: 1 }).limit(3);
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
    getCultureNight: async () => {
      try {
        const cultureNight = await CultureNight.find({});
        return cultureNight;
      } catch (err) {
        console.error(err);
        throw new Error("Could not fetch culture night")
      }
    },
    getAbout: async () => {
      try {
        const about = await About.find({});
        console.log(about)
        return about;
      } catch (err) {
        console.error(err);
        throw new Error("Could not fetch about")
      }
    },
  },
  Mutation: {
    addEvent: async (_, args, context) => {
      try {
        validateUserIsAdmin(context)
        const newEvent = new Event(args.input)
        const savedEvent = await newEvent.save()
        return savedEvent
      } catch (err) {
        console.error(err);
        throw new Error(`An error occured: ${err}`)
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
        return "There was an error updating this event";
      }
    },
    deleteEvent: async (_, { name }) => {
      try {
        const deletedEvent = await Event.findOneAndDelete({ Name: name });
        return deletedEvent;
      } catch (err) {
        console.error(err);
        return "There was an error deleting this event";
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
        return "There was an error updating the link";
      }
    },
    signUserUp: async (_, args) => {
      try {
        const {email, password} = args.input;

        // Checking to see if user already exists in db
        const currUser = await User.find({email: email})
        if(currUser.length >= 1) {
          throw new Error("user already exists")
        }

        // Hashing a unique password for every user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

        // Create an entry with the new user
        const newUser = new User({
          id: uuidv4(),
          email: email,
          password: hashedPassword,
          role: "admin"
        })
        const savedNewUser = newUser.save()
        return savedNewUser;

      } catch (err) {
        console.error(err)
        throw new Error(`Could not sign up user: ${err}`) 
      }
    },
    logUserIn: async (_, args) => {
      try {
        const {email, password} = args.input;

        // Should only return true if we have a valid combination of email and password
        const currUser = await User.find({email: email})

        // Using length since currUser will return an array of users
        if(currUser.length === 0) {
          throw new Error("User not found")
        }

        const {id: currUserId, email: currUserEmail, password: currUserPass, role: currUserRole} = currUser[0];

        // Send error if wrong password, otherwise send JWT
        const isPasswordValid = await bcrypt.compare(password, currUserPass)
        if(!isPasswordValid) {
          throw new Error("Invalid Password")
        }

        // Want email for refresh token, and role for website verification
        const accessToken = generateAccessToken(currUser[0])
        // When the refresh is returned, we should also store this token in the cookies of the website, to make sure that they still have access
        const refreshToken = jwt.sign({email: currUserEmail, role: currUserRole }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: secondsTillEndOfCurrentSchoolYear()})
        const createNewRefreshToken = new RefreshToken({token: refreshToken}).save()
        return {
          accessToken: accessToken,
          refreshToken: refreshToken
        }

      } catch (err) {
        console.error(err)
        throw new Error("Did not find a valid user") 
      }
    },
    updateAccessToken: async (_, args) => {
      try {
        const {refreshToken} = args.input;

        // Checking for refresh token in database
        const currRefreshToken = await RefreshToken.find({token: refreshToken}) 
        if(currRefreshToken.length == 0) {
          throw new Error("Token does not exist")
        }
        // Make sure jwt not tampered with or expired
        const userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => {
          if(err) {
            throw new Error(err)
          }
          return userInfo
         })
         // Send access token only if token completely valid
        const accessToken = generateAccessToken(userInfo)
        return {
          accessToken: accessToken,
        }
      } catch (err) {
        throw new Error(`ERROR: ${err}`) 
      }
    }
  },
};

module.exports = resolvers
