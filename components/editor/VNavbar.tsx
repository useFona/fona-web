'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { File, FilePlus2, LayoutDashboard, RotateCcw, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import VerticalNavbarLoading from '../loading/VerticalNavbarLoading';

// Debounce utility function
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface VerticalNavbarProps {
  currentPageId?: string;
  onOpenCreateModal: () => void;
  onRefresh?: () => void;
  session?: {
    user: {
      image?: string;
      name?: string;
    };
  };
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({ 
  currentPageId, 
  onOpenCreateModal,
  onRefresh 
}) => {
  const { data: Session } = authClient.useSession();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  
  const handleRefresh = () => {
    if (onRefresh) {
      setRefreshing(true);
      onRefresh();
      // Reset the refreshing state after a short delay for better UX
      const timer = setTimeout(() => {
        setRefreshing(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

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
      // Handle case where data might be an object with a pages array
      const pagesArray = Array.isArray(data) ? data : (data.pages || []);
      if (!Array.isArray(pagesArray)) {
        console.error('Expected an array of pages but got:', data);
        throw new Error('Invalid response format: expected an array of pages');
      }
      setPages(pagesArray);
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Filter out current page and get 3 most recent pages
  const recentPages = pages
    .filter(page => page.id !== currentPageId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  if (loading) {
    return <VerticalNavbarLoading />;
  }

  return (
    <nav className="fixed h-screen w-[280px] border-2 border-[#292929] bg-[#161616] rounded-r-2xl flex flex-col p-3 z-50 shadow-black sm:rounded-4xl sm:my-3 sm:mx-2 sm:h-[97vh] sm:w-[20%] md:w-[20%]">
      {/* Profile Section */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
          {Session?.user?.image ? (
            <img
              src={Session.user.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-lg md:text-xl">
              {Session?.user?.name || 'U'}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-medium truncate text-sm md:text-base">
            {Session?.user?.name || 'User'}'s FONA
          </p>
        </div>
      </div>
      <hr className="my-2 border-t border-gray-700 opacity-50 mx-auto w-[90%] fading-line" />

      {/* Dashboard Section */}
      <div className="w-full mb-4 md:mb-8">
        <Link href="/dashboard">
          <div className="rounded-lg p-3 md:p-4 hover:bg-[#242424] transition-colors cursor-pointer flex items-center justify-start gap-2">
            <LayoutDashboard size={16} className="text-[#7b7b7d] md:w-[18px] md:h-[18px]" />
            <h3 className="text-[#7b7b7d] font-medium text-sm md:text-base">Dashboard</h3>
          </div>
        </Link>
        <div className='rounded-lg p-3 md:p-4 hover:bg-[#242424] transition-colors cursor-pointer flex items-center justify-start gap-2' onClick={onOpenCreateModal}>
          <FilePlus2 size={16} className="text-[#7b7b7d] md:w-[18px] md:h-[18px]" />
          <button className="text-[#7b7b7d] font-medium text-sm md:text-base" >
            Create New Page
          </button>
        </div>
        <div 
          className={`hover:bg-[#242424] transition-colors rounded-lg p-3 flex justify-start items-center gap-2 ${refreshing ? 'opacity-70' : 'cursor-pointer'}`}
          onClick={!refreshing ? handleRefresh : undefined}
        >
          {refreshing ? (
            <Loader2 size={16} className="text-[#7b7b7d] w-[10%] animate-spin md:w-[18px] md:h-[18px]" />
          ) : (
            <RotateCcw size={16} className="text-[#7b7b7d] w-[10%] md:w-[18px] md:h-[18px]" />
          )}
          <span className="text-[#7b7b7d] font-medium text-sm md:text-base">
            {refreshing ? 'Refreshing...' : 'Refresh Editor'}
          </span>
        </div>
        <hr className="my-2 border-t border-gray-700 opacity-50 mx-auto w-[90%] fading-line" />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center flex-1 overflow-hidden">
        {/* Recent Pages Section */}
        <div className="w-full mb-6 flex-1 flex flex-col min-h-0">
          <div className="bg-[#191919] border-[#242424] border-2 rounded-4xl py-1 mb-4 flex items-center justify-center gap-2 flex-shrink-0">
            <h3 className="text-[#7b7b7d] font-medium text-sm md:text-base">Recent Pages</h3>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
            {recentPages.map((page) => (
              <Link key={page.id} href={`/editor/${page.id}`}>
                <div className="rounded-lg p-2 md:p-3 hover:bg-gradient-to-r from-[#242424] to-[#161616] transition-colors cursor-pointer mb-2 flex items-center gap-2">
                  <File size={16} className="text-[#7b7b7d] flex-shrink-0 md:w-[18px] md:h-[18px]" />
                  <h4 className="text-[#7b7b7d] font-medium truncate text-sm md:text-base min-w-0 flex-1">
                    {page.title}
                  </h4>
                </div>
              </Link>
            ))}
            {recentPages.length === 0 && (
              <div className="text-center text-[#7b7b7d] text-sm opacity-70 py-4">
                No recent pages
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;