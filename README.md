# [PortOne](https://portone-landing.vercel.app/korea/ko) v2 API SDK &middot; [![Apache 2.0 License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](./LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md)

이 라이브러리는 [PortOne](https://portone-landing.vercel.app/korea/ko)에서 제공하는 v2 API를 쉽게 이용할 수 있는 TypeScript/JavaScript SDK이에요.<br />B2B 서비스 API(Alpha)를 제외한 모든 최신 v2 API에 대한 요청을 지원해요.

## 설치하기
```sh
$ npm install --save portone
```

## 사용 방법 (예제)
```ts
import { PortOne } from "portone"

const portOne = new PortOne({
    storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
    authorization: {
        type: "SECRET",
        secret: "MY_API_SECRET"
    }
})

// ...

const payment = await portOne.payments.getPayment({
    paymentId: "79dfbd22-d66b-4cc4-b350-ffa2fe2fec42"
})

if (payment.data) {
    // 데이터 처리
} else {
    // 에러 핸들링
}
```

## 기여하기

이 라이브러리는 누구나 기여할 수 있어요. 라이브러리에 기여하고 싶다면 아래 문서를 참고해주세요. [(기여 가이드라인)](./.github/CONTRIBUTING.md)

## 라이선스

Apache License 2.0. [LICENSE](./LICENSE) 파일을 참고하세요.
