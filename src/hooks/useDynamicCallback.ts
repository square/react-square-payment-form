import { useRef, useLayoutEffect, useCallback } from 'react';

const useDynamicCallback = (callback: any) => {
  const ref = useRef(callback);
  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);
  return useCallback((...args) => ref.current(...args), []);
}

export default useDynamicCallback;