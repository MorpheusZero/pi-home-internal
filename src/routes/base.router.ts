/**
 * All routers should inherit from this BaseRouter.
 */
export class BaseRouter {
  /**
   * This prefix gets applied to all routes within a router.
   */
  public prefix: string;

  /**
   * Default Constructor
   * @param prefix
   */
  constructor(prefix: string) {
    this.prefix = prefix;
  }
}
