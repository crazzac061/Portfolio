import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

async function migrate() {
  const filePath = path.join(process.cwd(), 'app/articles.json');
  
  if (!fs.existsSync(filePath)) {
    console.log('No articles.json found. Skipping migration.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const articles = data.articles;

  if (!articles || articles.length === 0) {
    console.log('No articles to migrate.');
    return;
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('portfolio');
    const collection = db.collection('articles');

    // Insert articles
    const result = await collection.insertMany(articles);
    console.log(`${result.insertedCount} articles migrated successfully!`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.close();
  }
}

migrate();
