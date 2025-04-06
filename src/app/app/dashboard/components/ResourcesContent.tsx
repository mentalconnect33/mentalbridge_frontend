'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleContent from './ArticleContent';

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function ResourcesContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Listen for openArticle event from DashboardContent
  useEffect(() => {
    const handleOpenArticle = (event: CustomEvent<{articleId: number}>) => {
      const { articleId } = event.detail;
      setSelectedArticleId(articleId);
    };

    // Add event listener
    document.addEventListener('openArticle', handleOpenArticle as EventListener);
    
    // Clean up listener on unmount
    return () => {
      document.removeEventListener('openArticle', handleOpenArticle as EventListener);
    };
  }, []);

  // Mock data for articles
  const articles: Article[] = [
    {
      id: 1,
      title: "Understanding Anxiety: Symptoms and Management",
      description: "Learn about common anxiety symptoms and effective strategies for managing them in your daily life.",
      category: "Mental Health",
      readTime: "5 min",
      image: "/images/article1.jpg",
      featured: true
    },
    {
      id: 2,
      title: "The Science of Sleep: How Rest Affects Mental Health",
      description: "Explore the crucial link between sleep quality and mental wellbeing, plus tips for better sleep hygiene.",
      category: "Health",
      readTime: "8 min",
      image: "/images/article2.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Mindfulness Meditation: A Beginner's Guide",
      description: "Start your meditation journey with this simple guide to mindfulness practices for stress reduction.",
      category: "Wellness",
      readTime: "6 min",
      image: "/images/article3.jpg"
    },
    {
      id: 4,
      title: "Recognizing Depression: Signs to Watch For",
      description: "Understanding the common signs of depression and when to seek professional help.",
      category: "Mental Health",
      readTime: "7 min",
      image: "/images/article4.jpg"
    },
    {
      id: 5,
      title: "Nutritional Psychiatry: Food and Mood",
      description: "How your diet choices can impact your mental health and emotional wellbeing.",
      category: "Health",
      readTime: "10 min",
      image: "/images/article5.jpg"
    },
    {
      id: 6,
      title: "Building Resilience: Bouncing Back from Setbacks",
      description: "Practical strategies to develop emotional resilience and cope with life's challenges.",
      category: "Wellness",
      readTime: "9 min",
      image: "/images/article6.jpg"
    },
    {
      id: 7,
      title: "The Psychology of Social Media Use",
      description: "Understanding how social media affects our mental health and relationships.",
      category: "Digital Wellbeing",
      readTime: "12 min",
      image: "/images/article7.jpg"
    },
    {
      id: 8,
      title: "Supporting a Loved One with Mental Illness",
      description: "Guidance for family members and friends of those experiencing mental health challenges.",
      category: "Relationships",
      readTime: "8 min",
      image: "/images/article8.jpg"
    },
    {
      id: 9,
      title: "Stress Management Techniques for Busy Professionals",
      description: "Effective strategies to manage workplace stress and prevent burnout.",
      category: "Workplace",
      readTime: "7 min",
      image: "/images/article9.jpg"
    }
  ];

  // Get unique categories for the filter tabs
  const categories = ['all', ...new Set(articles.map(article => article.category.toLowerCase()))];

  // Filter articles based on active tab and search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeTab === 'all' || article.category.toLowerCase() === activeTab;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);

  // Handle viewing an article
  const handleReadArticle = (articleId: number) => {
    setSelectedArticleId(articleId);
    window.scrollTo(0, 0);
  };

  // Handle back button from article view
  const handleBackToArticles = () => {
    setSelectedArticleId(null);
  };

  // Show article content if an article is selected
  if (selectedArticleId !== null) {
    return <ArticleContent articleId={selectedArticleId} onBack={handleBackToArticles} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-2 text-[#6A5ACD]"
        >
          Resources & Articles
        </motion.h2>
        <p className="text-gray-600">
          Browse our collection of articles and resources to support your wellbeing.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
          />
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold mb-6 text-[#6A5ACD]">Featured Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    [Article Image]
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-[#6A5ACD] text-white text-xs px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">{article.readTime} read</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-[#6A5ACD]">{article.title}</h4>
                  <p className="text-gray-600 mb-4 flex-1">{article.description}</p>
                  <button 
                    onClick={() => handleReadArticle(article.id)}
                    className="self-start mt-2 text-[#6A5ACD] font-medium flex items-center"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === category
                  ? 'bg-[#6A5ACD] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  [Article Image]
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-[#6A5ACD] text-white text-xs px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.readTime} read</span>
                </div>
                <h4 className="text-md font-bold mb-2 text-[#6A5ACD]">{article.title}</h4>
                <p className="text-gray-600 text-sm mb-4 flex-1">{article.description}</p>
                <button 
                  onClick={() => handleReadArticle(article.id)}
                  className="self-start mt-auto text-[#6A5ACD] font-medium flex items-center text-sm"
                >
                  Read Article
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
} 