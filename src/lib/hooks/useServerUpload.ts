'use client';

import { useCallback, useState } from 'react';

export function useServerUpload() {
  const [image, setImage] = useState<string | null>(null);

  const upload = useCallback(async (file: File) => {
    console.log('server upload', file);
  }, []);

  return {
    image,
    upload,
  };
}
