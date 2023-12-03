import dbConnect from "./app/lib/connectors/mongodb/mongoose-connector";
import { STATES } from "mongoose";
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

let dbConnection: any;

async function init() {
  dbConnection = await dbConnect(process.env.MONGO_DB_DEBUG_ENABLED === 'true');
  return {
    dbConnectionState: STATES[dbConnection.connection.readyState],
  };
}

export default NextAuth(authConfig).auth;
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export { init };
