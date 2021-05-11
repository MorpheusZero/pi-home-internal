import { BaseRouter } from "./base.router";
import { Server } from "restify";
import { AuthManager } from "../managers/auth.manager";

/**
 * Handles all authentication routes.
 */
export class AuthRouter extends BaseRouter {
  /**
   * Default Constructor
   * @param prefix
   */
  constructor(prefix: string) {
    super(prefix);
  }

  /**
   * Initializes the routes for this handler.
   * @param server A reference to the active RestifyServer instance that the application is using.
   */
  public init(server: Server): void {
    server.post(this.prefix + "/token", AuthRouter.basicLogin.bind(this));
  }

  /**
   * The basic login route for authenticating with the piHomeInternal Server.
   * @private
   */
  private static async basicLogin(req, res, next) {
    try {
      const authorizationHeader = req.header("Authorization", null);
      if (authorizationHeader) {
        const accessToken = await AuthManager.login(authorizationHeader);
        res.send({
          accessToken,
        });
      } else {
        res.status(401);
        res.send({
          status: 401,
          message: "No client credentials were present in the request!",
        });
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}
