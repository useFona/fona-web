'use client'
import { AuroraText } from "@/components/magicui/aurora-text"
import UserDetails from "@/components/dashboard/UserDetails"
import Pages from "@/components/dashboard/pages"
import CreatePageModal from "@/components/CreatePage"
import { useState } from 'react';
import Link from "next/link"

interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);

  const handlePageCreated = (newPage: Page) => {
    setPages(prev => [...prev, newPage]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1d1d] to-[#090b0c] relative">
      {/* title of the app - Mobile responsive padding */}
      <div className="flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-32 pt-8 gap-3">
        <Link href="/" className="flex items-center gap-3">
          <img src="/fona.svg" alt="FONA Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="font-bold text-2xl sm:text-3xl md:text-4xl font-inter">FONA</AuroraText>
        </Link>
      </div>
      
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-12">
        {/* main card */}
        <UserDetails
          onOpenCreateModal={() => setIsModalOpen(true)}
          onPageCreated={handlePageCreated}
        />
        {/* pages */}
        <Pages />
      </div>
      
      {/* Modal rendered at the root level */}
      <CreatePageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPageCreated={handlePageCreated}
      />
    </div>
  )
}

export default Dashboard;