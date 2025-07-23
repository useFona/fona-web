'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPageCreated: (page: Page) => void;
}

const CreatePageModal: React.FC<CreatePageModalProps> = ({ isOpen, onClose, onPageCreated }) => {
  const [title, setTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a page title');
      return;
    }

    try {
      setIsCreating(true);
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }

      const newPage = await response.json();
      onPageCreated(newPage);
      toast.success('Page created successfully!');
      setTitle('');

      // Navigate to the new page editor
      router.push(`/editor/${newPage.page.id}`);

    } catch (error) {
      console.error('Error creating page:', error);
      toast.error('Failed to create page');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setTitle('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] bg-clip-text text-transparent">
              Create New Page
            </h2>
            <button
              onClick={handleClose}
              disabled={isCreating}
              className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="space-y-6">
            <div>
              <label htmlFor="pageTitle" className="block text-sm font-medium text-gray-400 mb-2">
                Page Title
              </label>
              <input
                type="text"
                id="pageTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A07CFE]/50 focus:border-transparent transition-all duration-200"
                placeholder="Enter page title..."
                disabled={isCreating}
                autoFocus
                required
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isCreating}
                className="flex-1 px-6 py-2.5 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !title.trim()}
                className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#FFBB94] to-[#DC586D] text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreating ? 'Creating...' : 'Create Page'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePageModal;
