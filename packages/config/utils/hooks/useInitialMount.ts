import { useRef } from 'react';

export const useInitialMount = () => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;
};
