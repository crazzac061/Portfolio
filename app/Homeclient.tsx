'use client';

import { useState } from 'react';
import Hero from '../src/components/hero';
import MainBody from '../src/components/mainbody';
import { Article } from '../src/components/ArticleCard';

interface Props {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  return (
    <div>
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainBody searchTerm={searchTerm} articles={articles} />
    </div>
  );
}
