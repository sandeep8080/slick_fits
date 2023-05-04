import 'dotenv/config'; // To use the Env Variables define in .env file
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { ProductImage } from './schemas/ProductImages';
import { insertSeedData } from './seed-data';
import { sendPasswordResetToken } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations';

const dataBaseURL = process.env.DATABASE_URL || 'mongoDB://localhost/keystone';
console.log(dataBaseURL);

// Session setting - to authenticate the user

const sessionConfig = {
  maxAge: 60 * 60 * 24,
  secret: process.env.COOKIE_SECRET,
};

// Setting Auth

const { withAuth } = createAuth({
  listKey: 'User', // Defining the Schema used for Authentication purpose
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO:Add in initail roles
  },
  passwordResetLink: {
    async sendToken(args) {
      // console.log(args);
      await sendPasswordResetToken(args.token, args.identity);
    },
  },
});

// Bolier plate code for setting the config
export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: dataBaseURL,
      async onConnect(keystone) {
        console.log('DataBase is connect now!!..');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
      // TODO Add data seeding here
    },
    lists: createSchema({
      // Schema items go here
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO change it for roles
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // Graph QL query
      User: 'id,name,email',
    }),
  })
);
