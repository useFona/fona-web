'use client'
import { useState, useCallback, useMemo } from 'react'
import VerticalNavbar from '@/components/editor/VNavbar'
import CreatePageModal from '@/components/CreatePage'
import EditorPage from './EditorPage'
import { debounce } from '@/action/debounce'
import { Menu, X } from 'lucide-react'

export default function EditorClient({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handlePageCreated = () => {
    setIsModalOpen(false)
  }

  // Create a debounced refresh function with 6 second cooldown
  const debouncedRefresh = useMemo(
    () =>
      debounce(() => {
        setRefreshKey(prev => prev + 1);
      }, 6000), // 6 second cooldown
    []
  );

  const handleRefresh = useCallback(() => {
    debouncedRefresh();
  }, [debouncedRefresh])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1e1d1d] to-[#090b0c]">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-[#161616] border border-[#292929] rounded-lg text-[#7b7b7d] hover:bg-[#242424] transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay - Only visible on mobile when menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[45]"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden md:block">
        <VerticalNavbar 
          currentPageId={id} 
          onOpenCreateModal={() => setIsModalOpen(true)}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Mobile Navbar - Only visible on mobile when menu is open */}
      <div className={`md:hidden fixed left-0 top-0 h-full w-[280px] z-50 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-[300px]'
      }`}>
        <div className="h-full w-full border-2 border-[#292929] bg-[#161616] rounded-r-2xl flex flex-col p-3 shadow-black overflow-y-auto">
          <VerticalNavbar 
            currentPageId={id} 
            onOpenCreateModal={() => {
              setIsModalOpen(true)
              closeMobileMenu()
            }}
            onRefresh={handleRefresh}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:ml-[20%] flex-1 p-3 md:p-6">
        {/* Mobile: Add top padding to account for menu button */}
        <div className="md:hidden h-12"></div>
        
        <EditorPage key={`${id}-${refreshKey}`} id={id} />
      </div>

      <CreatePageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPageCreated={handlePageCreated}
      />
    </div>
  )
}