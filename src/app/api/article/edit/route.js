import { NextResponse } from 'next/server';
import Article from '@/db/models/Article';
import dbConnect from '@/db/dbConnect';
import format from '@/utils/format';

export async function POST(req) {
  await dbConnect();
  const {
    title, content, author, type, description, image, pdf, id,
  } = await req.json();

  let article;

  try {
    article = await Article.findById(id);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 400 });
  }

  article.title = title;
  article.content = content;
  article.author = author;
  article.type = type;
  article.description = description;
  article.path = format(title);
  if (pdf) article.pdf = pdf;
  if (image) article.image = image;

  try {
    await article.save();
    return NextResponse.json({ message: 'Article updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
