# learn-react
만들고 비교하며 학습하는 리액트를 보면서 학습한 내용과 학습 playGround 레포입니다!

```
npx lite-server --baseDir ${폴더 이름}

휵은 http-server or live-server 이용해서 결과물 확인
```

1. 순수 자바스크립트와 MVC 디자인 패턴으로 결과물을 만들며 UI 라이브러리의 필요성을 깨달아보기
    - view는 dom을 조작해 실제로 화면을 그리고, 이벤트를 발행한다.
    - model은 store 로 구현하였고, 데이터를 관리한다. view를 제어하는데 사용할 상태 변수도 가지고 있다.
    - controller는 store의 데이터를 view로 전달하거나 view에서 보내는 이벤트를 보고 store의 데이터를 갱신하는 방식으로 화면을 제어한다.
     