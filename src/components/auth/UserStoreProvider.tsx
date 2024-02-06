'use client';

import {
  initializeStore,
  Provider,
  UserStoreInterface,
  UserStoreType,
} from '@/lib/store/modules/useUser';
import { PropsWithChildren, useRef } from 'react';

export interface PreloadedUserStoreInterface
  extends Pick<UserStoreInterface, 'user'> {}

export default function UserStoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedUserStoreInterface>) {
  const userStoreRef = useRef<UserStoreType>();

  if (!userStoreRef.current) {
    userStoreRef.current = initializeStore(props);
  }

  return <Provider value={userStoreRef.current}>{children}</Provider>;
}
