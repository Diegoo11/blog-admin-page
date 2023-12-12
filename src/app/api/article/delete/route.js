import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';

export async function POST(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    await Article.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Artículo eliminado' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error al eliminar el artículo' }, 500);
  }
}
