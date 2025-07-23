'use client';
import { User, LogOut, Plus, Copy } from 'lucide-react';
import { ShineBorder } from '@/components/magicui/shine-border';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import UserDetailsLoading from '../loading/UserDetailsLoading';
import SignOut from '../auth/sign-out';
import Image from 'next/image';

interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetailsProps {
  onOpenCreateModal: () => void;
  onPageCreated: (page: Page) => void;
}

const UserDetails = ({ onOpenCreateModal, onPageCreated }: UserDetailsProps) => {
  const { data: session } = authClient.useSession();
  const [userToken, setUserToken] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);

  // Helper function to get token from local storage
  const getStoredToken = () => {
    return localStorage.getItem('userToken') || '';
  };

  // Helper function to save token to local storage
  const saveTokenToStorage = (token: string) => {
    localStorage.setItem('userToken', token);
  };

  // Fetch user token from API
  const fetchUserToken = async () => {
    try {
      const response = await fetch('/api/utils/token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.userToken?.userToken || data.userToken || '';
        setUserToken(token);
        saveTokenToStorage(token);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to fetch user token');
      }
    } catch (error) {
      console.error('Error fetching user token:', error);
      toast.error('Failed to fetch user token');
    } finally {
      setIsLoading(false);
    }
  };

  // Check local storage for token on component mount
  useEffect(() => {
    if (session?.user?.id) {
      const storedToken = getStoredToken();
      if (storedToken) {
        setUserToken(storedToken);
        setIsLoading(false);
      } else {
        fetchUserToken();
      }
    }
  }, [session?.user?.id]);

  // Fetch pages count
  const fetchPages = async () => {
    try {
      setPagesLoading(true);
      const response = await fetch('/api/pages');

      if (!response.ok) {
        throw new Error(`Failed to fetch pages: ${response.status}`);
      }

      const data = await response.json();
      const pagesArray = Array.isArray(data) ? data : (data.pages || []);
      setPages(pagesArray);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to fetch pages');
    } finally {
      setPagesLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchPages();
    }
  }, [session?.user?.id]);

  const generateNewToken = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/utils/token', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.userToken;
        setUserToken(newToken);
        saveTokenToStorage(newToken);
        toast.success('New token generated successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate new token');
      }
    } catch (error) {
      console.error('Error generating new token:', error);
      toast.error('Failed to generate new token');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!userToken) {
      toast.error('No token to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(userToken);
      toast.success('Token copied to clipboard!', {
        position: 'top-center',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy token', {
        position: 'top-center',
        duration: 2000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      localStorage.removeItem('userToken');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  if (isLoading || pagesLoading) {
    return <UserDetailsLoading />;
  }

  return (
    <ShineBorder shineColor={["#FFBB94", "#DC586D", "#121212"]}>
      {/* Desktop Layout (hidden on mobile) */}
      <div className="hidden lg:flex gap-2 bg-[#161616] rounded-lg p-4 h-[350px]">
        {/* Left side - Token */}
        <div className="flex flex-3 flex-col gap-4">
          <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-4 w-full h-full shadow-lg">
            <div className="text-white text-5xl font-semibold font-inter">Token</div>
            <div className="w-full max-w-full mt-10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Click the icon to copy</div>
              </div>
              <div className="mt-2 flex items-center justify-between bg-[#181818] rounded-lg p-3 pr-4">
                <span className="text-lg text-gray-200 font-mono truncate flex-1 text-center">
                  {isLoading ? 'Loading...' : userToken || 'No token available'}
                </span>
                <button
                  onClick={copyToClipboard}
                  disabled={isLoading || !userToken}
                  className="ml-2 p-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Copy token"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <button
                className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                onClick={generateNewToken}
                disabled={isGenerating || isLoading}
              >
                {isGenerating ? 'Generating...' : 'Generate New Token'}
              </button>
            </div>
          </div>
        </div>

        {/* Vertical separator */}
        <div className="h-full mx-2 border-r border-gray-600" />

        {/* Right side - User Info and Pages */}
        <div className="flex flex-5 flex-col">
          <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-5 w-full h-full shadow-lg relative">
            {/* Logout Button - Top Right */}
            <div className="absolute top-4 right-4">
              <SignOut />
            </div>

            {/* User Details */}
            <div className="flex items-center gap-4 bg-[#161616] rounded-lg p-4 mt-2 w-[400px]">
              {session?.user?.image ? (
                <Image src={session?.user?.image} alt="Profile" width={64} height={64} className="w-16 h-16 rounded-full" />
              ) : (
                <User className="w-16 h-16 text-white p-2" />
              )}
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-white">{session?.user?.name || 'User'}</h2>
                <hr className="border-gray-600 my-2" />
                <p className="text-sm text-gray-300">{session?.user?.email || 'Email'}</p>
              </div>
            </div>

            {/* Pages Section */}
            <div className="flex flex-col gap-4 bg-[#161616] rounded-lg p-4 flex-1 w-[500px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-5xl font-extrabold font-inter">
                    Pages: {pagesLoading ? '...' : pages.length}
                  </span>
                </div>
              </div>

              {/* Add New Page Button */}
              <div className="mt-auto">
                <button
                  className="flex items-center hover:cursor-pointer gap-2 px-4 py-2 bg-green-500/20 text-white rounded-lg hover:bg-green-500/30 transition-colors w-full justify-center"
                  onClick={onOpenCreateModal}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Page</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (visible only on mobile/tablet) */}
      <div className="flex lg:hidden flex-col gap-4 bg-[#161616] rounded-lg p-4 min-h-[400px]">
        {/* Mobile Header with User Info and Logout */}
        <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-4 shadow-lg relative">
          {/* Logout Button - Top Right */}
          <div className="absolute top-4 right-4">
            <SignOut />
          </div>

          {/* User Details */}
          <div className="flex items-center gap-4 bg-[#161616] rounded-lg p-4 mt-2">
            {session?.user?.image ? (
              <Image src={session?.user?.image} alt="Profile" width={48} height={48} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
            ) : (
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-white p-2" />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">{session?.user?.name || 'User'}</h2>
              <hr className="border-gray-600 my-1 sm:my-2" />
              <p className="text-xs sm:text-sm text-gray-300 truncate">{session?.user?.email || 'Email'}</p>
            </div>
          </div>
        </div>

        {/* Mobile Token Section */}
        <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-4 shadow-lg">
          <div className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold font-inter">Token</div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400">Click the icon to copy</div>
            </div>
            <div className="flex items-center justify-between bg-[#181818] rounded-lg p-3">
              <span className="text-sm sm:text-base text-gray-200 font-mono truncate flex-1 mr-2">
                {isLoading ? 'Loading...' : userToken || 'No token available'}
              </span>
              <button
                onClick={copyToClipboard}
                disabled={isLoading || !userToken}
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Copy token"
              >
                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <button
              className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer text-sm sm:text-base"
              onClick={generateNewToken}
              disabled={isGenerating || isLoading}
            >
              {isGenerating ? 'Generating...' : 'Generate New Token'}
            </button>
          </div>
        </div>

        {/* Mobile Pages Section */}
        <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold font-inter">
              Pages: {pagesLoading ? '...' : pages.length}
            </span>
          </div>
          
          {/* Add New Page Button */}
          <button
            className="flex items-center hover:cursor-pointer gap-2 px-4 py-3 bg-green-500/20 text-white rounded-lg hover:bg-green-500/30 transition-colors w-full justify-center text-sm sm:text-base"
            onClick={onOpenCreateModal}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Page</span>
          </button>
        </div>
      </div>
    </ShineBorder>
  );
};

export default UserDetails;