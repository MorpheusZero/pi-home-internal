import { AppServer } from "./server";

/**
 * The main entry-point to the application.
 */
const srv = AppServer.init();
console.log("Server is listening at [%s]", srv._connectionKey);
