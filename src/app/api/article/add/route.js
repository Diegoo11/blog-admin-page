import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import format from '@/utils/format';

export async function POST(req) {
  await dbConnect();
  const {
    title, content, author, type, description,
  } = await req.json();

  const article = await Article({
    title,
    content,
    author,
    image: 'https://cdn.discordapp.com/attachments/1145454002314686557/1183993705938563122/image.png?ex=658a5b11&is=6577e611&hm=e80bcc7cd15da34757d74220afb5533251e22c9f25339732e24252aab2c8aab6&',
    type,
    description,
    pdf: 'https://res.cloudinary.com/dux0sb99g/image/upload/v1701980601/gk0fharcvd3eg7m9xzoj.pdf',
    path: format(title),
  });

  try {
    await article.save();
    return NextResponse.json({ message: 'Article added' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
