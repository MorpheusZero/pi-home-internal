import restify, { Server } from "restify";
import { RouteManager } from "./routes";

/**
 * Handles running the server.
 */
export class AppServer {
  /**
   * Handles initializing the server on startup.
   */
  public static init() {
    const server = restify.createServer();
    server.get("/health", (_req, res, _next) => {
      res.send({
        status: 200,
        message: "ok",
      });
    });
    AppServer.initializeRoutes(server);
    return server.listen(process.env.APP_PORT);
  }

  private static initializeRoutes(server: Server): void {
    RouteManager.initializeRoutes(server);
  }
}
