import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * Handles all database operations.
 */
export class Db {
  /**
   * Get a connection to the database.
   * @private
   */
  private static async openDBConnection(): Promise<any> {
    return open({
      filename: "pihome.db",
      driver: sqlite3.Database,
    });
  }

  /**
   * Attempt to retrieve a
   * @param clientId
   */
  public static async getClientById(
    clientId: string
  ): Promise<{
    clientId: string;
    clientSecret: string;
  }> {
    try {
      const conn = await Db.openDBConnection();
      const response = await conn.get(
        `SELECT secret from clients WHERE id = :clientId`,
        {
          ":clientId": clientId,
        }
      );
      if (response && response.secret) {
        return {
          clientId,
          clientSecret: response.secret,
        };
      } else {
        throw new Error(
          `A client with the specified ID could not be found! [${clientId}]`
        );
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}
