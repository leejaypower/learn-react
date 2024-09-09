const Button = ({ text, color, children }) => {
  return (
    <button
      style={{
        color: color,
      }}
      onClick={(e) => {
        console.log(text, e);
        // e: Synthetic Base Event: 합성 이벤트; 모든 웹 브라우저의 이벤트 객체를 하나로 통일한 형태
        // 여러 브라우저 규격을 참고해서 하나의 통일된 규격으로 이벤트 객체를 포맷팅 해줘서 크로스 브라우징 이슈를 해결함
      }}
    >
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

// props에 기본값 설정
Button.defaultProps = {
  color: 'black',
};

export default Button;
