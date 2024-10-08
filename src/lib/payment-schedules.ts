import type {RequestInstance} from '../common/request';
import type {components, paths} from '../types/v2'; // generated by openapi-typescript

/**
 * 결제 예약 관련 API
 *
 * @description 결제 예약과 관련된 API 기능을 제공합니다.
 */
export const paymentSchedules = (
  _request: RequestInstance,
  options?: {storeId?: string}
): {
  getPaymentSchedule: (
    params: paths['/payment-schedules/{paymentScheduleId}']['get']['parameters']['path']
  ) => ReturnType<RequestInstance['GET']>;
  getPaymentSchedules: (
    body?: components['schemas']['GetPaymentSchedulesBody']
  ) => ReturnType<RequestInstance['GET']>;
  revokePaymentSchedule: (
    body: components['schemas']['RevokePaymentSchedulesBody']
  ) => ReturnType<RequestInstance['DELETE']>;
  schedulePayment: (
    body: paths['/payments/{paymentId}/schedule']['post']['parameters']['path'] &
      paths['/payments/{paymentId}/schedule']['post']['requestBody']['content']['application/json']
  ) => ReturnType<RequestInstance['POST']>;
} => {
  return {
    /**
     * 결제 예약 단건 조회
     *
     * @description 결제 예약 단건 조회
     * 주어진 아이디에 대응되는 결제 예약 건을 조회합니다.
     */
    getPaymentSchedule: (
      params: paths['/payment-schedules/{paymentScheduleId}']['get']['parameters']['path']
    ) => {
      return _request.GET('/payment-schedules/{paymentScheduleId}', {
        params: {
          path: {paymentScheduleId: params.paymentScheduleId},
          query: {storeId: options?.storeId},
        },
      });
    },
    /**
     * 결제 예약 다건 조회
     *
     * @description 결제 예약 다건 조회
     * 주어진 조건에 맞는 결제 예약 건들을 조회합니다.
     */
    getPaymentSchedules: (
      body?: components['schemas']['GetPaymentSchedulesBody']
    ) => {
      const processedBody = body
        ? {
            page: {
              ...body.page,
            },
            filter: {
              ...body.filter,
              storeId: body.filter?.storeId || options?.storeId || undefined,
            },
          }
        : {};

      return _request.GET('/payment-schedules', {
        body: processedBody || {},
      });
    },
    /**
     * 결제 예약 취소
     *
     * @description 결제 예약 취소
     * 결제 예약 건을 취소합니다.
     */
    revokePaymentSchedule: (
      body: components['schemas']['RevokePaymentSchedulesBody']
    ) => {
      return _request.DELETE('/payment-schedules', {
        body: {
          ...body,
          storeId: body.storeId || options?.storeId || undefined,
        },
      });
    },
    /**
     * 결제 예약
     *
     * @description 결제 예약
     * 결제를 예약합니다.
     */
    schedulePayment: (
      body: paths['/payments/{paymentId}/schedule']['post']['parameters']['path'] &
        paths['/payments/{paymentId}/schedule']['post']['requestBody']['content']['application/json']
    ) => {
      const {paymentId, ...processedBody} = body;

      return _request.POST('/payments/{paymentId}/schedule', {
        params: {
          path: {paymentId},
        },
        body: {
          ...processedBody,
          payment: {
            ...processedBody.payment,
            storeId:
              processedBody.payment.storeId || options?.storeId || undefined,
          },
        },
      });
    },
  };
};
