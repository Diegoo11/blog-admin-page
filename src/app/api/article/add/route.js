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
    image,
    type,
    description,
    pdf,
    path: format(title),
  });

  try {
    await article.save();
    return NextResponse.json({ message: 'Articulo creado' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error de servidor' }, { status: 400 });
  }
}
