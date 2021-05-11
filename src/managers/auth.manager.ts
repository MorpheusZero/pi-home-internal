import { ParserLib } from "../util/parser.lib";
import { Db } from "../db/db";
import { CryptoLib } from "../util/crypto.lib";
import { JWTLib } from "../util/jwt.lib";

/**
 * Handles all Auth related tasks.
 */
export class AuthManager {
  /**
   * Validates the client login credentials and issues a JWT for accessing the other routes for events.
   * @param authorizationHeaders The auth headers that were passed from the client.
   */
  public static async login(authorizationHeaders: string): Promise<string> {
    const credentials = ParserLib.parseAuthCredentials(authorizationHeaders);
    if (!credentials || !credentials.clientId || !credentials.clientSecret) {
      throw new Error(
        "Client Credentials could not be determined from the given payload!"
      );
    }

    // Attempt to retrieve the client information from the database.
    const client = await Db.getClientById(credentials.clientId);
    if (!client) {
      throw new Error("No Client was found! Please try again!");
    }

    // Verify the hash
    const isValid = await CryptoLib.compare(
      client.clientSecret,
      credentials.clientSecret
    );

    if (!isValid) {
      throw new Error(
        "The provided clientSecret was incorrect! Please try again!"
      );
    }

    // Issue an accessToken
    return JWTLib.generateNewAccessToken(client.clientId);
  }
}
