'use client';

import { useCallback, useState } from 'react';
import { uploadImage } from '@/lib/api/files';

export function useServerUpload() {
  const [image, setImage] = useState<string | null>(null);

  const upload = useCallback(async (file: File) => {
    const response = await uploadImage(file);
    setImage(response.path);
    return response.path;
  }, []);

  return {
    image,
    upload,
  };
}
