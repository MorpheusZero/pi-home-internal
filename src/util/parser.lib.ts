/**
 * Handles various parsing things we want.
 */
export class ParserLib {
  /**
   * Handles reading the credentials from the Basic Auth Headers and parsing out the data we want to use.
   * // TODO: Add typing here for return
   * @param authorizationCredentials The auth header as passed from the client.
   */
  public static parseAuthCredentials(
    authorizationCredentials: string
  ): { clientId: string; clientSecret: string } {
    try {
      // Only get the text after the word "Basic"
      const encodedCredentials = authorizationCredentials.substring(
        authorizationCredentials.indexOf(" ") + 1
      );

      // Decode the string
      const decodedString = Buffer.from(encodedCredentials, "base64").toString(
        "utf8"
      );

      // Split on the semi-colon
      const arr = decodedString.split(":");

      return {
        clientId: arr[0],
        clientSecret: arr[1],
      };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  /**
   * Handles parsing the bearer token from the Auth Header.
   * @param bearerTokenString The auth header (bearer token) as passed from the client.
   */
  public static parseAuthBearerToken(bearerTokenString: string): string {
    try {
      // Only get the text after the word "Bearer"
      return bearerTokenString.substring(bearerTokenString.indexOf(" ") + 1);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}
