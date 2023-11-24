import dbConnect from "./lib/connectors/mongodb/mongoose-connector";
import { STATES } from "mongoose";
let dbConnection: any;

async function init() {
  dbConnection = await dbConnect(process.env.MONGO_DB_DEBUG_ENABLED === 'true');
  return {
    dbConnectionState: STATES[dbConnection.connection.readyState],
  };
}

export { init };
