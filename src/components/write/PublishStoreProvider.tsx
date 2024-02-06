'use client';

import {
  initializeStore,
  Provider,
  PublishStoreInterface,
  PublishStoreType,
} from '@/lib/store/modules/usePublish';
import { PropsWithChildren, useRef } from 'react';

export interface PreloadedPublishStoreInterface
  extends Pick<PublishStoreInterface, 'post'> {}

export default function PublishStoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedPublishStoreInterface>) {
  const publishStoreRef = useRef<PublishStoreType>();

  if (!publishStoreRef.current) {
    publishStoreRef.current = initializeStore(props);
  }

  return <Provider value={publishStoreRef.current}>{children}</Provider>;
}
