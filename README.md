# [PortOne](https://portone-landing.vercel.app/korea/ko) v2 API Client (Unofficial) &middot; [![Apache 2.0 License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](./LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md)

이 라이브러리는 [PortOne](https://portone-landing.vercel.app/korea/ko)에서 제공하는 v2 API를 쉽게 이용할 수 있는 TypeScript/JavaScript Client이에요.<br />
B2B 서비스 API(Alpha)를 제외한 모든 최신 v2 API에 대한 요청을 지원해요.

## 설치하기

```sh
$ npm install --save portone
```

## 사용 예제 ([전체 소스 확인](./examples/getPayment.ts))

```ts
// 포트원 API Client 임포트
import {PortOne} from 'portone';

// 클래스 정의
const portOne = new PortOne();

// ...

// API 시크릿으로 API 로그인
await portOne.login({
  storeId: 'store-e4038486-8d83-41a5-acf1-844a009e0d94',
  authorization: {
    type: 'SECRET',
    secret: 'MY_API_SECRET',
  }
})

// ...

// 결제 정보 불러오기 (예시)
const payment = await portOne.payments.getPayment({
  paymentId: '79dfbd22-d66b-4cc4-b350-ffa2fe2fec42',
});

if (payment.data) {
  // 데이터 처리
} else {
  // 에러 핸들링
}
```

## 기여하기

이 라이브러리는 누구나 기여할 수 있어요. 라이브러리에 기여하고 싶다면 아래 문서를 참고해주세요. [(기여 가이드라인)](./.github/CONTRIBUTING.md)

## 참고 사항

이 라이브러리는 PortOne에서 만든 공식 라이브러리가 아니며, 공정사용의 범위 내에서 비영리를 목적으로 제작되었습니다.<br />
`PortOne` 및 `포트원`은 (주)코리아포트원의 상표입니다.

## 라이선스

Apache License 2.0. [LICENSE](./LICENSE) 파일을 참고하세요.<br />
본 레포지토리를 상업적 용도로 Fork/재배포 하는 행위를 금합니다.
