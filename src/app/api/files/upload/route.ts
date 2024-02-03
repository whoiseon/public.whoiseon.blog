import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import process from 'process';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(req: NextRequest, res: NextResponse) {
  // TODO: file upload logic in server
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json(
      {
        error: 'No file received.',
        path: null,
      },
      { status: 201 },
    );
  }

  const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const buffer = Buffer.from(await file.arrayBuffer());
  const uuid = uuidv4();
  const fileName = `image.${getFileExtension(file.name)}`;
  try {
    const filePath = `${process.env.IMAGE_FILE_PATH}/${uuid}/${fileName}`;
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }

    await fs.writeFileSync(filePath, buffer);

    return NextResponse.json(
      {
        error: '',
        path: `https://imslow.me/images/blog/post/${uuid}/${fileName}`,
      },
      { status: 201 },
    );
  } catch (e) {
    console.log('error', e);
    return NextResponse.json(
      {
        error: 'Failed',
        path: null,
      },
      { status: 201 },
    );
  }
}

// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";
//
// export const POST = async (req, res) => {
//   const formData = await req.formData();
//
//   const file = formData.get("file");
//   if (!file) {
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }
//
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename =  file.name.replaceAll(" ", "_");
//   console.log(filename);
//   try {
//     await writeFile(
//       path.join(process.cwd(), "public/assets/" + filename),
//       buffer
//     );
//     return NextResponse.json({ Message: "Success", status: 201 });
//   } catch (error) {
//     console.log("Error occured ", error);
//     return NextResponse.json({ Message: "Failed", status: 500 });
//   }
// };
