import dbConnect from "./lib/connectors/mongodb/mongoose-connector";

let dbConnection: any;

async function _getConnection(debug: boolean) {
  dbConnection = await dbConnect();
}

async function init(debug = false) {
  await _getConnection(debug);
  return {
    database: dbConnection,
  };
}

export { init };
