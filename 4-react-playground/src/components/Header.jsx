import { memo } from 'react';

const Header = () => {
  return (
    <header>
      <h1>header</h1>
    </header>
  );
};

// 고차 컴포넌트 (Higher Order Component - HOC)
const memoizedHeader = memo(Header, (prevProps, nextProps) => {
  if (prevProps.a) {
    return false; // 리렌더링
  } else {
    return true; // 리렌더링 하지 않음
  }
});

export default memoizedHeader;
