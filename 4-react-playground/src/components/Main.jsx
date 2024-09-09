import './Main.css';

const Main = () => {
  // JSX 주의 사항
  // 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다
  // 2. 숫자, 문자열, 배열 값만 렌더링 된다 (boolean, undefined, null 등은 안보임 객체 자체는 에러)
  const user = {
    name: '이제이',
    isLogin: true,
  };
  // return <>{user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}</>;

  if (user.isLogin) {
    // style 코드는 css와 완전히 같지 않다. 속성을 카멜케이스로 적어야함
    return <div className="logout">로그아웃</div>;
  } else {
    return <div>로그인</div>;
  }
};

export default Main;
