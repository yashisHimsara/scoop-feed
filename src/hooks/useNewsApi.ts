import { useState, useEffect } from 'react';
import axios from 'axios';

export interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  image_url?: string;
  source_name: string;
  source_icon?: string;
  pubDate: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage?: string;
}

interface UseNewsApiProps {
  apiKey?: string;
  language?: string;
  category?: string;
}

export const useNewsApi = ({ apiKey, language = 'en', category }: UseNewsApiProps) => {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageKeys, setPageKeys] = useState<string[]>(['0']);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Mock data for development (when no API key is provided)
  const mockData: NewsResponse = {
    status: 'success',
    totalResults: 50,
    results: [
      {
        article_id: '1',
        title: 'Breaking: Technology Advances in 2024',
        description: 'Latest developments in artificial intelligence and machine learning are reshaping the way we work and live.',
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        source_name: 'Tech News',
        source_icon: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=32&q=80',
        pubDate: new Date().toISOString()
      },
      {
        article_id: '2',
        title: 'Global Climate Summit Reaches New Agreements',
        description: 'World leaders gather to discuss sustainable future and environmental protection measures.',
        image_url: 'https://images.unsplash.com/photo-1569163139394-de44cb4a4d17?w=800&q=80',
        source_name: 'Global News',
        source_icon: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=32&q=80',
        pubDate: new Date(Date.now() - 3600000).toISOString()
      },
      {
        article_id: '3',
        title: 'Space Exploration: New Discoveries on Mars',
        description: 'Recent findings from Mars rovers reveal fascinating insights about the Red Planet\'s geology.',
        image_url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
        source_name: 'Space Daily',
        source_icon: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=32&q=80',
        pubDate: new Date(Date.now() - 7200000).toISOString()
      },
      {
        article_id: '4',
        title: 'Economic Markets Show Strong Recovery',
        description: 'Stock markets worldwide demonstrate positive trends as recovery continues across various sectors.',
        image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
        source_name: 'Financial Times',
        source_icon: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=32&q=80',
        pubDate: new Date(Date.now() - 10800000).toISOString()
      },
      {
        article_id: '5',
        title: 'Healthcare Innovation: New Treatment Breakthrough',
        description: 'Medical researchers announce significant progress in treating chronic diseases with new methodologies.',
        image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
        source_name: 'Health Today',
        source_icon: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=32&q=80',
        pubDate: new Date(Date.now() - 14400000).toISOString()
      }
    ],
    nextPage: 'page2'
  };

  const fetchNews = async (pageKey?: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!apiKey) {
        // Use mock data when no API key is provided
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 1000);
        return;
      }

      const url = pageKey && pageKey !== '0' 
        ? `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=${language}&page=${pageKey}`
        : `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=${language}${category ? `&category=${category}` : ''}`;

      const response = await axios.get<NewsResponse>(url);
      setData(response.data);

      // Update page keys if we have a next page
      if (response.data.nextPage && !pageKeys.includes(response.data.nextPage)) {
        setPageKeys(prev => [...prev, response.data.nextPage!]);
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('News API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < pageKeys.length - 1) {
      const nextIndex = currentPageIndex + 1;
      setCurrentPageIndex(nextIndex);
      fetchNews(pageKeys[nextIndex]);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      const prevIndex = currentPageIndex - 1;
      setCurrentPageIndex(prevIndex);
      fetchNews(pageKeys[prevIndex]);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [apiKey, language, category]);

  return {
    data,
    loading,
    error,
    currentPage: currentPageIndex + 1,
    hasNextPage: currentPageIndex < pageKeys.length - 1 || (data?.nextPage && !pageKeys.includes(data.nextPage)),
    hasPreviousPage: currentPageIndex > 0,
    goToNextPage,
    goToPreviousPage,
    refetch: () => fetchNews(pageKeys[currentPageIndex])
  };
};