'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface ArticleProps {
  articleId: number;
  onBack: () => void;
}

interface Article {
  id: number;
  title: string;
  category: string;
  read_time: string;
  image: string;
  introduction: string;
  conclusion: string;
  sections: {
    title: string;
    content: string;
    display_order: number;
  }[];
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  relatedArticles: {
    id: number;
    title: string;
    category: string;
  }[];
}

export default function ArticleContent({ articleId, onBack }: ArticleProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }

    async function fetchArticleData() {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching article with ID: ${articleId}`);
        
        // Start with fallback mock data in case we're missing Supabase connection
        if (!supabase) {
          console.error("Supabase client not initialized");
          setError("Database connection error");
          return;
        }
        
        const { data: articleData, error: articleError } = await supabase
          .from('articles')
          .select('*')
          .eq('id', articleId)
          .single();
        
        if (articleError) {
          console.error("Error fetching article:", articleError);
          setError("Could not find the article");
          return;
        }
        
        if (!articleData) {
          setError("Article not found");
          return;
        }
        
        const { data: contentData, error: contentError } = await supabase
          .from('article_content')
          .select('*')
          .eq('article_id', articleId)
          .single();
        
        if (contentError) {
          console.error("Error fetching article content:", contentError);
          setError("Could not load article content");
          return;
        }
        
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('article_sections')
          .select('*')
          .eq('article_id', articleId)
          .order('display_order', { ascending: true });
        
        if (sectionsError) {
          console.error("Error fetching article sections:", sectionsError);
          setError("Could not load article sections");
          return;
        }
        
        const { data: authorData, error: authorError } = await supabase
          .from('article_authors')
          .select(`
            author_id,
            authors(*)
          `)
          .eq('article_id', articleId)
          .single();
        
        if (authorError) {
          console.error("Error fetching author data:", authorError);
          setError("Could not load author information");
          return;
        }
        const { data: relatedArticlesData, error: relatedError } = await supabase
          .from('related_articles')
          .select(`
            related_article_id,
            related:articles!related_articles_related_article_id_fkey(id, title, category)
          `)
          .eq('article_id', articleId);
        
        if (relatedError) {
          console.error("Error fetching related articles:", relatedError);
        }
        
        const formattedArticle: Article = {
          id: articleData.id,
          title: articleData.title,
          category: articleData.category,
          read_time: articleData.read_time,
          image: articleData.image,
          introduction: contentData.introduction,
          conclusion: contentData.conclusion,
          sections: sectionsData.map(section => ({
            title: section.title,
            content: section.content,
            display_order: section.display_order
          })),
          author: {
            name: authorData.authors.name,
            title: authorData.authors.title,
            avatar: authorData.authors.avatar
          },
          relatedArticles: relatedArticlesData 
            ? relatedArticlesData.map(item => ({
                id: item.related.id,
                title: item.related.title,
                category: item.related.category
              }))
            : []
        };
        
        setArticle(formattedArticle);
      } catch (error) {
        console.error("Error in article fetch operation:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticleData();
    
    window.scrollTo(0, 0);
  }, [articleId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6A5ACD]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={onBack}
          className="flex items-center text-[#6A5ACD] mb-8 hover:underline"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </button>
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || "Sorry, the article you're looking for doesn't exist or has been removed."}
          </p>
          <button 
            onClick={onBack}
            className="bg-[#6A5ACD] text-white px-4 py-2 rounded-lg hover:bg-[#5D4EBE] transition-colors"
          >
            Browse Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-10">
        <div 
          className="h-full bg-[#6A5ACD]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Back button */}
      <button 
        onClick={onBack}
        className="flex items-center text-[#6A5ACD] mb-8 hover:underline"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Articles
      </button>
      
      <div className="space-y-8">
        {/* Article header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-[#6A5ACD] text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                avatar
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-800">{article.author.name}</p>
              <p className="text-sm text-gray-600">{article.author.title}</p>
            </div>
            <div className="ml-auto flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.read_time} read
            </div>
          </div>
          
          {/* Article featured image */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl mb-8 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              [Featured Image for "{article.title}"]
            </div>
          </div>
        </motion.div>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8"
        >
          {/* Introduction */}
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            {article.introduction}
          </p>

          {/* Article sections */}
          <div className="space-y-8">
            {article.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-bold mb-4 text-gray-800">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-8 p-6 bg-[#F5F8FA] rounded-lg border-l-4 border-[#6A5ACD]">
            <p className="text-gray-700 leading-relaxed">
              {article.conclusion}
            </p>
          </div>

          {/* Share buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-700 font-medium mb-3">Share this article:</p>
            <div className="flex space-x-3">
              {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
                <button 
                  key={platform}
                  className="px-4 py-2 rounded-lg bg-[#F5F8FA] text-gray-700 hover:bg-[#EDE9FF] transition-colors text-sm"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Related articles */}
        {article.relatedArticles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 text-gray-800">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map((relatedArticle) => (
                <div 
                  key={relatedArticle.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    // Load the related article
                    if (relatedArticle.id !== article.id) {
                      window.scrollTo(0, 0);
                      // We'll let the component reload with new articleId
                      window.location.href = `?articleId=${relatedArticle.id}`;
                    }
                  }}
                >
                  <div className="h-32 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      [Article Image]
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="bg-[#6A5ACD] text-white text-xs px-2 py-1 rounded-full inline-block mb-2">
                      {relatedArticle.category}
                    </span>
                    <h4 className="font-medium text-gray-800 line-clamp-2">{relatedArticle.title}</h4>
                    <div className="flex justify-end mt-3">
                      <svg className="w-5 h-5 text-[#6A5ACD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 