# School Public Board

![alt text](1.png)

## Development

`npm i` 로 초기에 필요한 node_modules를 설치 할 수 있습니다.  
`npm run-script start` 로 웹 사이트를 실행 할 수 있습니다.(코드 변경시 자동 적용)  
`npm run-script build` 로 Production에서 사용할 웺 사이트를 빌드 할 수 있습니다.

## Production

`npx serve build` 로 빌드한 웹 사이트를 실행합니다.

## 기능

- [x] 현재 시간 표시
- [x] 집 갈 때 까지 남은 시간 표시
- [ ] 집 가는 시간 자동 설정
- [x] 급식 표시

## 이슈

- `npm i`를 **라즈베리파이** 환경에서 설치하는 것은 아주 오래 걸리고 설치가 자주 실패합니다.  
  라즈베리파이에 개발환경을 설치하는 대신 `npx serve build`로 빌드한 웹 사이트만 실행 하는걸 권장합니다.
- `String.prototype.replaceAll` 함수가 **라즈베리파이**에서는 존재 하지 않습니다.  
  replaceAll(**'A'**, **'B'**) 꼴의 함수를 replace(**/A/**, **'B'**) 로 대신해 주세요.
- `open_api_key`가 없으면 급식의 정보가 일부(조식)만 표시 될 수도 있습니다.
