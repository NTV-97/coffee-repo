import { useRef, MutableRefObject } from 'react';
import _ from 'lodash';

export const useDeepCompareEffect = <T>(value: T): MutableRefObject<T | undefined>['current'] => {
  const ref = useRef<T>();
  //Comparison 2 objects
  if (!_.isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};
