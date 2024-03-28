import {DEFAULT_HOST} from './common/constants';
import createRequestInstance, {type RequestInstance} from './common/request';

// Import all API functions
import {auth} from './lib/auth'; // 인증 관련 API
import {payments} from './lib/payments'; // 결제 관련 API
import {escrow} from './lib/escrow'; // 에스크로 관련 API
import {paymentSchedules} from './lib/payment-schedules'; // 결제 예약 관련 API
import {billingKeys} from './lib/billing-keys'; // 빌링키 관련 API
import {cashReceipts} from './lib/cash-receipts'; // 현금 영수증 관련 API
import {identifyVerifications} from './lib/identify-verifications'; // 본인인증 관련 API
import {forSpecificPg} from './lib/pg-specific'; // 특정 PG사 관련 API (카카오페이)

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
  host: string;
  authorization: {
    type: 'SECRET' | 'ACCESS_TOKEN';
    secret: string;
  };
  storeId?: string;

  private _request!: RequestInstance;

  constructor(
    host: string,
    authorization: {
      type: 'SECRET' | 'ACCESS_TOKEN';
      secret: string;
    },
    storeId?: string
  ) {
    /**
     * Set default values.
     */

    this.host = host || DEFAULT_HOST;
    this.authorization = {
      ...authorization,
      type: authorization.type || 'SECRET',
    };
    this.storeId = storeId;

    this._request = createRequestInstance(
      this.host,
      `PortOne ${this.authorization.secret}`
    );

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
  public readonly identifyVerifications = identifyVerifications(this._request, {
    storeId: this.storeId || undefined,
  });
  public readonly forSpecificPg = forSpecificPg(this._request);
}

export default PortOne;
