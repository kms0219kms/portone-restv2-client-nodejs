import type {RequestInstance} from '../common/request';
import type {components, paths} from '../types/v2'; // generated by openapi-typescript

/**
 * 빌링키 관련 API
 *
 * @description 빌링키와 관련된 API 기능을 제공합니다.
 */
export const billingKeys = (
  _request: RequestInstance,
  options?: {storeId?: string}
): {
  getBillingKey: (
    params: paths['/billing-keys/{billingKey}']['get']['parameters']['path']
  ) => ReturnType<RequestInstance['GET']>;
  deleteBillingKey: (
    params: paths['/billing-keys/{billingKey}']['delete']['parameters']['path']
  ) => ReturnType<RequestInstance['DELETE']>;
  getBillingKeys: (
    body: components['schemas']['GetBillingKeyInfosBody']
  ) => ReturnType<RequestInstance['GET']>;
  issueBillingKey: (
    body: paths['/billing-keys']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
} => {
  return {
    /**
     * 빌링키 단건 조회
     *
     * @description 빌링키 단건 조회
     * 주어진 빌링키에 대응되는 빌링키 정보를 조회합니다.
     */
    getBillingKey: (
      params: paths['/billing-keys/{billingKey}']['get']['parameters']['path']
    ) => {
      return _request.GET('/billing-keys/{billingKey}', {
        params: {
          path: {billingKey: params.billingKey},
          query: {storeId: options?.storeId},
        },
      });
    },
    /**
     * 빌링키 삭제
     *
     * @description 빌링키 삭제
     * 빌링키를 삭제합니다.
     */
    deleteBillingKey: (
      params: paths['/billing-keys/{billingKey}']['delete']['parameters']['path']
    ) => {
      return _request.DELETE('/billing-keys/{billingKey}', {
        params: {
          path: {billingKey: params.billingKey},
          query: {storeId: options?.storeId},
        },
      });
    },
    /**
     * 빌링키 다건 조회
     *
     * @description 빌링키 다건 조회
     * 주어진 조건에 맞는 빌링키들을 페이지 기반으로 조회합니다.
     */
    getBillingKeys: (body: components['schemas']['GetBillingKeyInfosBody']) => {
      return _request.GET('/billing-keys', {
        body: {
          ...body,
          filter: {
            ...body.filter,
            storeId: body.filter?.storeId || options?.storeId || undefined,
          },
        },
      });
    },
    /**
     * 빌링키 발급
     *
     * @description 빌링키 발급
     * 빌링키 발급을 요청합니다.
     */
    issueBillingKey: (
      body: paths['/billing-keys']['post']['requestBody']['content']['application/json']
    ) => {
      return _request.POST('/billing-keys', {
        body: {
          ...body,
          storeId: body.storeId || options?.storeId || undefined,
        },
      });
    },
  };
};
