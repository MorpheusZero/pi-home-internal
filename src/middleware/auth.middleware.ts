import { ParserLib } from "../util/parser.lib";
import { JWTLib } from "../util/jwt.lib";

/**
 * Various auth middleware.
 */
export class AuthMiddleware {
  /**
   * Checks a request to see if the client is authorized to make the request.
   */
  public static async validateBearerTokenHttp(req, res, next) {
    const headerValue = req.header("Authorization", null);
    if (!headerValue) {
      res.status(401);
      next(new Error("This client is not authorized to access this resource!"));
    } else {
      const accessToken = ParserLib.parseAuthBearerToken(headerValue);
      if (!accessToken) {
        res.status(401);
        next(
          new Error("This client is not authorized to access this resource!")
        );
      } else {
        // Attempt to verify the access token
        const clientId = JWTLib.verifyAccessToken(accessToken);
        if (!clientId) {
          res.status(401);
          next(
            new Error("This client is not authorized to access this resource!")
          );
        } else {
          req.clientId = clientId;
          next();
        }
      }
    }
  }
}
