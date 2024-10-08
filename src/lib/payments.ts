import type {RequestInstance} from '../common/request';
import type {components, paths} from '../types/v2'; // generated by openapi-typescript

/**
 * 결제 관련 API
 *
 * @description 결제와 관련된 API 기능을 제공합니다.
 */
export const payments = (
  _request: RequestInstance,
  options?: {storeId?: string}
): {
  preRegisterPayment: (
    body: paths['/payments/{paymentId}/pre-register']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/pre-register']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
  getPayment: (
    params: paths['/payments/{paymentId}']['get']['parameters']['path']
  ) => ReturnType<RequestInstance['GET']>;
  getPayments: (
    body?: components['schemas']['GetPaymentsBody']
  ) => ReturnType<RequestInstance['GET']>;
  getPaymentsByCursor: (
    body?: components['schemas']['GetAllPaymentsByCursorBody']
  ) => ReturnType<RequestInstance['GET']>;
  cancelPayment: (
    body: paths['/payments/{paymentId}/cancel']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/cancel']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
  payWithBillingKey: (
    body: paths['/payments/{paymentId}/billing-key']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/billing-key']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
  keyInPayment: (
    body: paths['/payments/{paymentId}/instant']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/instant']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
  closeVbank: (
    params: paths['/payments/{paymentId}/virtual-account/close']['post']['parameters']['path']
  ) => ReturnType<RequestInstance['POST']>;
  resendWebhook: (
    body: paths['/payments/{paymentId}/resend-webhook']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/resend-webhook']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
  registerStoreReceipt: (
    body: paths['/payments/{paymentId}/register-store-receipt']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/register-store-receipt']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
} => {
  return {
    /**
     * 결제 정보 사전 등록
     *
     * @description 결제 정보 사전 등록
     * 결제 정보를 사전 등록합니다.
     */
    preRegisterPayment: (
      body: paths['/payments/{paymentId}/pre-register']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/pre-register']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/pre-register', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          storeId: processedBody.storeId || options?.storeId || undefined,
        },
      });
    },
    /**
     * 결제 단건 조회
     *
     * @description 결제 단건 조회
     * 주어진 아이디에 대응되는 결제 건을 조회합니다.
     */
    getPayment: (
      params: paths['/payments/{paymentId}']['get']['parameters']['path']
    ) => {
      return _request.GET('/payments/{paymentId}', {
        params: {
          path: {paymentId: params.paymentId},
          query: {storeId: options?.storeId},
        },
      });
    },
    /**
     * 결제 다건 조회(페이지 기반)
     *
     * @description 결제 다건 조회(페이지 기반)
     * 주어진 조건에 맞는 결제 건들을 페이지 기반으로 조회합니다.
     */
    getPayments: (body?: components['schemas']['GetPaymentsBody']) => {
      return _request.GET('/payments', {
        body: body
          ? {
              page: {
                ...body.page,
              },
              filter: {
                ...body.filter,
                storeId: body.filter?.storeId || options?.storeId || undefined,
              },
            }
          : {},
      });
    },
    /**
     * 결제 대용량 다건 조회(커서 기반)
     *
     * @description 결제 대용량 다건 조회(커서 기반)
     * 기간 내 모든 결제 건을 커서 기반으로 조회합니다. 결제 건의 생성일시를 기준으로 주어진 기간 내 존재하는 모든 결제 건이 조회됩니다.
     *
     * @unstable 이 API는 현재 테스트 중인 API로, 불안정할 수 있습니다.
     */
    getPaymentsByCursor: (
      body?: components['schemas']['GetAllPaymentsByCursorBody']
    ) => {
      return _request.GET('/payments-by-cursor', {
        body: body
          ? {
              ...body,
              storeId: body.storeId || options?.storeId || undefined,
            }
          : {},
      });
    },
    /**
     * 결제 취소
     *
     * @description 결제 취소
     * 결제 취소를 요청합니다.
     */
    cancelPayment: (
      body: paths['/payments/{paymentId}/cancel']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/cancel']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/cancel', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          storeId: processedBody.storeId || options?.storeId || undefined,
        },
      });
    },
    /**
     * 빌링키 결제
     *
     * @description 빌링키 결제
     * 빌링키로 결제를 진행합니다.
     */
    payWithBillingKey: (
      body: paths['/payments/{paymentId}/billing-key']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/billing-key']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/billing-key', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          storeId: processedBody.storeId || options?.storeId || undefined,
        },
      });
    },
    /**
     * 수기 결제
     *
     * @description 수기 결제
     * 수기 결제를 진행합니다.
     */
    keyInPayment: (
      body: paths['/payments/{paymentId}/instant']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/instant']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/instant', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          storeId: processedBody.storeId || options?.storeId || undefined,
        },
      });
    },
    /**
     * 가상계좌 말소
     *
     * @description 가상계좌 말소
     * 발급된 가상계좌를 말소합니다.
     */
    closeVbank: (
      params: paths['/payments/{paymentId}/virtual-account/close']['post']['parameters']['path']
    ) => {
      return _request.POST('/payments/{paymentId}/virtual-account/close', {
        params: {
          path: {paymentId: params.paymentId},
          query: {storeId: options?.storeId},
        },
      });
    },
    /**
     * 웹훅 재발송
     *
     * @description 웹훅 재발송
     * 웹훅을 재발송합니다.
     */
    resendWebhook: (
      body: paths['/payments/{paymentId}/resend-webhook']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/resend-webhook']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/resend-webhook', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          storeId: processedBody.storeId || options?.storeId || undefined,
        },
      });
    },
    /**
     * 영수증 내 하위 상점 거래 등록 API
     *
     * @description 영수증 내 하위 상점 거래 등록 API
     * 결제 내역 매출전표에 하위 상점의 거래를 등록할 수 있는 API입니다.
     * 지원되는 PG사:
     * KG이니시스(이용 전 콘솔 -&gt; 결제연동 탭에서 INIApi Key 등록 필요)
     */
    registerStoreReceipt: (
      body: paths['/payments/{paymentId}/register-store-receipt']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/register-store-receipt']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/register-store-receipt', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          storeId: processedBody.storeId || options?.storeId || undefined,
        },
      });
    },
  };
};
