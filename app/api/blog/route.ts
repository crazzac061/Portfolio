import { NextResponse } from 'next/server';
import clientPromise from '@/src/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('articles');

    if (id) {
       // Support both numeric id and ObjectId if needed, 
       // but for now sticking to the numeric 'id' field used in the JSON
      const article = await collection.findOne({ id: parseInt(id) });
      if (article) {
        return NextResponse.json(article);
      }
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    const articles = await collection.find({}).toArray();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ articles: [] });
  }
}

export async function POST(request: Request) {
  try {
    const newArticle = await request.json();
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('articles');

    // Generate a new numeric ID (to maintain compatibility with existing system)
    const lastArticle = await collection.find().sort({ id: -1 }).limit(1).toArray();
    const nextId = lastArticle.length > 0 ? (lastArticle[0].id || 0) + 1 : 1;

    const articleWithId = {
      ...newArticle,
      id: nextId,
      publishedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      content: newArticle.content || ''
    };

    await collection.insertOne(articleWithId);

    return NextResponse.json({ success: true, article: articleWithId });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json({ success: false, error: 'Failed to save article' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('articles');

    const result = await collection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
