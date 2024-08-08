import {DEFAULT_HOST} from './common/constants';
import createRequestInstance, {type RequestInstance} from './common/request';

// Import all API functions
import {auth} from './lib/auth'; // 인증 관련 API
import {payments} from './lib/payments'; // 결제 관련 API
import {escrow} from './lib/escrow'; // 에스크로 관련 API
import {paymentSchedules} from './lib/payment-schedules'; // 결제 예약 관련 API
import {billingKeys} from './lib/billing-keys'; // 빌링키 관련 API
import {cashReceipts} from './lib/cash-receipts'; // 현금 영수증 관련 API
import {identityVerifications} from './lib/identity-verifications'; // 본인인증 관련 API
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
 * const portOne = new PortOne()
 */
export class PortOne {
  host: string;
  authorization?: {
    type: 'SECRET' | 'ACCESS_TOKEN';
    secret: string;
  };
  storeId?: string;

  public declare auth: ReturnType<typeof auth>;
  public declare payments: ReturnType<typeof payments>;
  public declare escrow: ReturnType<typeof escrow>;
  public declare paymentSchedules: ReturnType<typeof paymentSchedules>;
  public declare billingKeys: ReturnType<typeof billingKeys>;
  public declare cashReceipts: ReturnType<typeof cashReceipts>;
  public declare identifyVerifications: ReturnType<
    typeof identityVerifications
  >;
  public declare forSpecificPg: ReturnType<typeof forSpecificPg>;

  private declare _request: RequestInstance;

  constructor(options?: {host: string}) {
    this.host = options?.host || DEFAULT_HOST;
    this._request = createRequestInstance(
      this.host,
      undefined,
      true // withoutAuthorization
    );

    this._init();
  }

  private _init() {
    // init all API functions
    const initializationParams = {
      storeId: this.storeId || undefined,
    };

    this.auth = auth(this._request);
    this.payments = payments(this._request, initializationParams);
    this.escrow = escrow(this._request, initializationParams);
    this.paymentSchedules = paymentSchedules(
      this._request,
      initializationParams
    );
    this.billingKeys = billingKeys(this._request, initializationParams);
    this.cashReceipts = cashReceipts(this._request, initializationParams);
    this.identifyVerifications = identityVerifications(
      this._request,
      initializationParams
    );
    this.forSpecificPg = forSpecificPg(this._request);
  }

  public async login(options: {
    authorization: {
      type: 'SECRET' | 'ACCESS_TOKEN';
      secret: string;
    };
    storeId?: string;
  }) {
    /**
     * Set default values.
     */

    this.storeId = options.storeId;

    if (options.authorization.type === 'ACCESS_TOKEN') {
      const token = await this._request.POST('/login/api-secret', {
        body: {
          apiSecret: options.authorization.secret,
        },
      });

      if (!token.data?.accessToken || token.error)
        throw new Error(
          token.error
            ? `${token.error?.type}: ${token.error?.message}`
            : 'Failed to get access token'
        );

      this.authorization = {
        secret: token.data.accessToken,
        type: options.authorization.type || 'SECRET',
      };

      this._request = createRequestInstance(
        this.host,
        `Bearer ${this.authorization.secret}`
      );
    } else {
      this.authorization = options.authorization;
      this._request = createRequestInstance(
        this.host,
        `PortOne ${this.authorization.secret}`
      );
    }

    this._init();
  }
}

export default PortOne;
