import { compare, hash } from "bcrypt";

/**
 * Handles encryption and verification of hashes.
 */
export class CryptoLib {
  /**
   * Create a new hash with the given string value.
   * @param val The value we want to hash.
   */
  public static async hash(val: string): Promise<string> {
    try {
      return hash(val, 12);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  /**
   * Compares a hash to a given plain text password and determine if the hashes match.
   * @param hash The real hash.
   * @param password The password we want to check.
   */
  public static async compare(
    hash: string,
    password: string
  ): Promise<boolean> {
    try {
      return compare(password, hash);
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
