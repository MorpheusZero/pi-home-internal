import { sign, verify } from "jsonwebtoken";

/**
 * Handles signing and verifying JWTs.
 */
export class JWTLib {
  /**
   * Who want to consume this accessToken.
   * @private
   */
  private static readonly audience: string = "piHomeClients";

  /**
   * The app that issued this accessToken.
   * @private
   */
  private static readonly issuer: string = "piHomeInternal";

  /**
   * Generates a new access token to be consumed by the client.
   * The accessToken will last for 1 hour and then a new one will need to be obtained.
   * @param clientId The client ID that we are issuing the access token for.
   */
  public static generateNewAccessToken(clientId: string): string {
    try {
      return sign(
        {
          data: {
            clientId,
            expiresAt: Math.floor(Date.now() / 1000) + 60 * 60,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
          audience: JWTLib.audience,
          issuer: JWTLib.issuer,
        }
      );
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  /**
   * Given an accessToken, will verify that it is valid and then return the ClientID associated with it.
   * @param accessToken The access token we want to test.
   */
  public static verifyAccessToken(accessToken: string): string {
    try {
      const decoded = <any>verify(accessToken, process.env.JWT_SECRET, {
        audience: JWTLib.audience,
        issuer: JWTLib.issuer,
      });
      if (decoded && decoded.data && decoded.data.clientId) {
        return decoded.data.clientId as string;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}
