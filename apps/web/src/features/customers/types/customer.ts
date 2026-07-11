/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Customer
 * ============================================================
 */

export interface Customer {
  /**
   * Internal Identifier
   */
  id: string;


  /**
   * Owner Organization
   */
organizationId: string;

  /**
   * Personal Information
   */
  firstName: string;

  lastName: string;

  /**
   * Contact Information
   */
  mobile: string;

  email: string;

  /**
   * Display Code
   * Example:
   * ebrahim
   */
  code: string;

  /**
   * Is customer active?
   */
  enabled: boolean;

  archived: boolean;
  
  /**
   * Audit
   */
  createdAt: Date;

  updatedAt: Date;
}