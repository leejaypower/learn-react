import '../App.css';
import './Header';
// vite는 확장자 안 써도됨
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Button from './Button';
// import Button from './Button';

function App() {
  const buttonProps = {
    text: '롸롸',
    color: 'light-blue',
    a: 1,
    b: 2,
    c: 3,
  };

  return (
    <>
      <Button {...buttonProps}></Button>
      <Button text={'카페'}></Button>
      <Button text={'블로그'}>
        {/* children props */}
        <div>자식 요소</div>
        <Header></Header>
      </Button>
    </>
  );
}

export default App;
