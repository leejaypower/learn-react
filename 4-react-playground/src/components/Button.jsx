const Button = ({ text, color, children }) => {
  return (
    <button
      style={{
        color: color,
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
