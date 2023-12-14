import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import format from '@/utils/format';

export async function POST(req) {
  await dbConnect();
  const {
    title, content, author, type, description, image, pdf,
  } = await req.json();

  const article = await Article({
    title,
    content,
    author,
    image: image || 'https://cdn.discordapp.com/attachments/772232222220615710/1184679286871949382/Untitled-2023-07-21-2004_6.png?ex=658cd990&is=657a6490&hm=1f93a7838766fad1a07914c969299ce21eaa7f97bf5955a0e08d465ea38a7d12&',
    type,
    description,
    path: format(title),
  });

  if (pdf) article.pdf = pdf;

  try {
    await article.save();
    return NextResponse.json({ message: 'Articulo creado' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error de servidor' }, { status: 400 });
  }
}
