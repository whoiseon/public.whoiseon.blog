import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import process from 'process';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const isThumbnail = formData.get('isThumbnail') as string;

  if (!file) {
    return NextResponse.json(
      {
        error: 'No file received.',
        path: null,
      },
      {
        status: 201,
      },
    );
  }

  const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const buffer = Buffer.from(await file.arrayBuffer());
  const uuid = uuidv4();
  const fileName = `image.${getFileExtension(file.name)}`;
  try {
    let filePath = `${process.env.IMAGE_FILE_PATH}/${uuid}/${fileName}`;

    if (isThumbnail === 'true') {
      filePath = `${process.env.IMAGE_THUMBNAIL_PATH}/${uuid}/${fileName}`;
    }

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }

    await fs.writeFileSync(filePath, buffer);

    return NextResponse.json(
      {
        error: '',
        path:
          isThumbnail === 'true'
            ? `https://imslow.me/images/blog/thumbnail/${uuid}/${fileName}`
            : `https://imslow.me/images/blog/post/${uuid}/${fileName}`,
      },
      {
        status: 201,
      },
    );
  } catch (e) {
    console.log('error', e);
    return NextResponse.json(
      {
        error: 'Failed',
        path: null,
      },
      {
        status: 201,
      },
    );
  }
}
