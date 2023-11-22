import dbConnect from "./lib/connectors/mongodb/mongoose-connector";

async function _getConnection() {
  await dbConnect();
}

async function connect() {
  await _getConnection();
}

export default connect
