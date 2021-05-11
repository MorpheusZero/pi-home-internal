import { Server } from "restify";
import { AuthRouter } from "./auth.router";
import { AuthMiddleware } from "../middleware/auth.middleware";

/**
 * Handles managing all of the routes that the application will use.
 */
export class RouteManager {
  /**
   * Initialize all of the routes the application will use.
   * @param server A reference to the active RestifyServer instance that we are using.
   */
  public static initializeRoutes(server: Server) {
    new AuthRouter("/auth").init(server);

    server.get(
      "/test",
      AuthMiddleware.validateBearerTokenHttp.bind(this),
      (_req, res, _next) => {
        res.send({
          status: 200,
          message: "ok",
        });
      }
    );
  }
}
