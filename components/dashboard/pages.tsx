'use client'
import { useState, useEffect, useMemo } from 'react';
import { SortAsc, Clock } from 'lucide-react';
import { HoverEffect } from '../ui/card-hover-effect'
import { ShimmerButton } from '../magicui/shimmer-button';
import { ShinyButton } from '../magicui/shiny-button';
import PagesLoading from '../loading/PagesLoading';

interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'newest'>('newest');
  const [deletingPageId, setDeletingPageId] = useState<string | null>(null);

  // Fetch all pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching pages from /api/pages...');
      const response = await fetch('/api/pages');
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch pages: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API Response Data:', data);
      const pagesArray = Array.isArray(data) ? data : (data.pages || []);
      if (!Array.isArray(pagesArray)) {
        console.error('Expected an array of pages but got:', data);
        throw new Error('Invalid response format: expected an array of pages');
      }
      setPages(pagesArray);
    } catch (err) {
      console.error('Error in fetchPages:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching pages');
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete page function
  const deletePage = async (pageId: string, e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingPageId(pageId);
      console.log('Deleting page:', pageId);
      
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete API Error Response:', errorText);
        throw new Error(`Failed to delete page: ${response.status} ${response.statusText}`);
      }

      // Remove the page from local state
      setPages(prevPages => prevPages.filter(page => page.id !== pageId));
      console.log('Page deleted successfully');
      
    } catch (err) {
      console.error('Error deleting page:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the page');
    } finally {
      setDeletingPageId(null);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Filter and sort pages
  const filteredAndSortedPages = useMemo(() => {
    let filtered = pages;

    // Filter by search term
    if (searchTerm) {
      filtered = pages.filter(page =>
        (page.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (page.content || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort pages
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else { // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }, [pages, searchTerm, sortBy]);

  const transformedPages = filteredAndSortedPages.map((page) => ({
    title: page.title || 'Untitled Page',
    description: page.createdAt || 'No content available',
    link: `/editor/${page.id}`,
    id: page.id,
    onDelete: deletePage,
    isDeleting: deletingPageId === page.id,
  }));

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return <PagesLoading />;
  }

  return (
    <div className="h-auto w-full my-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-300 flex justify-center items-center" style={{ fontFamily: 'Inter, sans-serif' }}>All Pages</h1>

      {/* Search and Sort Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-center justify-between">
        {/* Search Bar */}
        <div className="flex w-full sm:w-96 gap-2">
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 focus:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#161616] bg-black text-gray-300 placeholder-gray-500 text-sm sm:text-base"
          />
          <ShinyButton
            onClick={handleSearch}
            className="px-3 sm:px-4 py-2 bg-black rounded-md hover:bg-[#161616]/80 transition-colors duration-200 flex items-center justify-center border border-gray-300 hover:border-gray-600 text-sm sm:text-base"
          >
            search
          </ShinyButton>
        </div>

        {/* Sort Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <ShimmerButton
            onClick={() => setSortBy('name')}
            className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm sm:text-base justify-center ${sortBy === 'name'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            <SortAsc size={16} />
            Sort by Name
          </ShimmerButton>
          <ShimmerButton
            onClick={() => setSortBy('newest')}
            className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm sm:text-base justify-center ${sortBy === 'newest'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
              }`}
          >
            <Clock size={16} />
            Sort by Newest
          </ShimmerButton>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading pages...</p>
        </div>
      ) : !Array.isArray(pages) ? (
        <div className="text-yellow-600 bg-yellow-50 p-4 rounded-md">
          <p>Error: Pages data is not in the expected format.</p>
          <p className="text-sm mt-2">Debug info: {typeof pages === 'object' ? JSON.stringify(pages) : 'Not an object'}</p>
        </div>
      ) : filteredAndSortedPages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm sm:text-base">
            {searchTerm ? `No pages found matching "${searchTerm}"` : 'No pages found. Create your first page!'}
          </p>
        </div>
      ) : (
        <div className="w-full">
          <HoverEffect items={transformedPages} />
        </div>
      )}
    </div>
  );
};

export default Pages;