import {DEFAULT_HOST} from './common/constants';
import createRequestInstance from './common/request';

// Import all API functions
import {auth} from './lib/auth'; // Authorization
import {payments} from './lib/payments'; // Payments Management
import {escrow} from './lib/escrow'; // Escrow Secure Payments
import {paymentSchedules} from './lib/payment-schedules'; // Scheduled Payments Management
import {billingKeys} from './lib/billing-keys'; // Billing Key Management
import {cashReceipts} from './lib/cash-receipts'; // Cash Receipts Management

/**
 * PortOne RestAPI v2 SDK Class.
 *
 * @param {object} authorization - Object that includes authorization data.
 * @param {string} authorization.type - Type of authorization.
 * @param {string} authorization.secret - Secret key or access token.
 * @param {string} host - Host URL.
 *
 * @default authorization.type = "SECRET"
 * @default host = "https://api.portone.io"
 *
 * @example
 * const portOne = new PortOne({
 *    authorization: {
 *       type: "SECRET",
 *       secret: "MY_API_SECRET"
 *    }
 * })
 */
export class PortOne {
  private _request = createRequestInstance(
    this.host,
    `PortOne ${this.authorization.secret}`
  );

  constructor(
    public host: string,
    public authorization: {
      type: 'SECRET' | 'ACCESS_TOKEN';
      secret: string;
    },
    public storeId?: string
  ) {
    /**
     * Set default values.
     */
    this.authorization.type = this.authorization.type || 'SECRET';
    this.host = this.host || DEFAULT_HOST;
    this._init();
  }

  private async _init() {
    if (this.authorization.type === 'ACCESS_TOKEN') {
      const token = await this.auth.token({
        apiSecret: this.authorization.secret,
      });

      if (!token.data?.accessToken || token.error)
        throw new Error(
          token.error
            ? `${token.error?.type}: ${token.error?.message}`
            : 'Failed to get access token'
        );

      this.authorization.secret = token.data.accessToken;
      this._request = createRequestInstance(
        this.host,
        `Bearer ${this.authorization.secret}`
      );
    }
  }

  public readonly auth = auth(this._request);
  public readonly payments = payments(this._request, {
    storeId: this.storeId || undefined,
  });
  public readonly escrow = escrow(this._request, {
    storeId: this.storeId || undefined,
  });
  public readonly paymentSchedules = paymentSchedules(this._request, {
    storeId: this.storeId || undefined,
  });
  public readonly billingKeys = billingKeys(this._request, {
    storeId: this.storeId || undefined,
  });
  public readonly cashReceipts = cashReceipts(this._request, {
    storeId: this.storeId || undefined,
  });
}
