'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { debounce } from '@/action/debounce'
import { Edit3, Check, X } from 'lucide-react'
import EditorPageLoading from '@/components/loading/EditorPageLoading'

// Dynamic import with no SSR
const Editor = dynamic(() => import('../../../../components/editor/Editor'), {
  ssr: false,
})

interface EditorPageProps {
  id: string
}

interface LocalStorageData {
  content: any
  savedDb: boolean
  lastUpdated: number
}

interface PageDetails {
  id: string
  title: string
  isPublic: boolean
}

export default function EditorPage({ id }: EditorPageProps) {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [pageDetails, setPageDetails] = useState<PageDetails | null>(null)

  // Title editing states
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState('')
  const [isSavingTitle, setIsSavingTitle] = useState(false)

  const debounceTimerRef = useRef<NodeJS.Timeout>(null)
  const syncIntervalRef = useRef<NodeJS.Timeout>(null)
  const isSyncingRef = useRef(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Get localStorage key for this page
  const getStorageKey = (pageId: string) => `editor-content-${pageId}`

  // Load data from database
  const loadInitialData = useCallback(async () => {
    try {
      // Clear existing localStorage data for this page
      const storageKey = getStorageKey(id)
      localStorage.removeItem(storageKey)

      // Fetch fresh data from database
      const response = await fetch(`/api/pages/${id}/content`)
      if (response.ok) {
        const data = await response.json()
        setContent(data.content || null)
        if (data.content?.time) {
          setLastSaved(new Date(data.content.time))
        }
      } else if (response.status === 404) {
        // No content exists yet, start with empty editor
        setContent(null)
      } else {
        console.error('Failed to load initial data')
      }
      const pageDetailsResponse = await fetch(`/api/pages/${id}`);
      if (pageDetailsResponse.ok) {
        const data = await pageDetailsResponse.json();
        setPageDetails(data.page)
      }
    } catch (error) {
      console.error('Error loading initial data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  // Load data on mount
  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  // Save to localStorage
  const saveToLocalStorage = useCallback((newContent: any, savedDb: boolean = false) => {
    const storageKey = getStorageKey(id)
    const dataToStore: LocalStorageData = {
      content: newContent,
      savedDb,
      lastUpdated: Date.now()
    }

    localStorage.setItem(storageKey, JSON.stringify(dataToStore))
  }, [id])

  // API call to sync with database
  const syncWithDatabase = useCallback(async () => {
    // Prevent concurrent syncs
    if (isSyncingRef.current) {
      console.log('Sync already in progress, skipping...')
      return
    }

    const storageKey = getStorageKey(id)
    const savedData = localStorage.getItem(storageKey)
    if (!savedData) return

    const parsedData: LocalStorageData = JSON.parse(savedData)
    // Only sync if not already saved to DB
    if (!parsedData.savedDb) {
      isSyncingRef.current = true
      setIsSaving(true)

      try {
        console.log('Starting database sync...')
        const response = await fetch(`/api/pages/${id}/content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: parsedData.content
          })
        })

        if (response.ok) {
          // Mark as saved in localStorage
          saveToLocalStorage(parsedData.content, true)
          setLastSaved(new Date())
          console.log('Content synced with database')
        } else {
          console.error('Failed to sync with database')
        }
      } catch (error) {
        console.error('Error syncing with database:', error)
      } finally {
        isSyncingRef.current = false
        setIsSaving(false)
      }
    }
  }, [id, saveToLocalStorage])

  const debouncedSync = useMemo(
    () => debounce(() => syncWithDatabase(), 3000),
    [syncWithDatabase]
  )

  const handleEditorChange = useCallback((newContent: any) => {
    setIsSaving(true)
    saveToLocalStorage(newContent, false)
    debouncedSync()
  }, [saveToLocalStorage, debouncedSync])

  // Title editing functions
  const startEditingTitle = () => {
    setTempTitle(pageDetails?.title || '')
    setIsEditingTitle(true)
  }

  const cancelEditingTitle = () => {
    setIsEditingTitle(false)
    setTempTitle('')
  }

  const saveTitle = async () => {
    if (!tempTitle.trim() || tempTitle === pageDetails?.title) {
      cancelEditingTitle()
      return
    }

    setIsSavingTitle(true)
    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: tempTitle.trim()
        })
      })

      if (response.ok) {
        const data = await response.json()
        setPageDetails(data.page)
        setIsEditingTitle(false)
        setTempTitle('')
      } else {
        console.error('Failed to update title')
      }
    } catch (error) {
      console.error('Error updating title:', error)
    } finally {
      setIsSavingTitle(false)
    }
  }

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveTitle()
    } else if (e.key === 'Escape') {
      cancelEditingTitle()
    }
  }

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  // Check and sync unsaved changes with a delay
  const checkAndSyncChanges = useCallback(async () => {
    const storageKey = getStorageKey(id)
    const savedData = localStorage.getItem(storageKey)
    if (!savedData) return

    const parsedData: LocalStorageData = JSON.parse(savedData)
    // If already saved to DB, no need to sync
    if (parsedData.savedDb) return

    // Wait for 2 seconds to allow any ongoing debounced sync to complete
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Check if a sync is already in progress
    if (isSyncingRef.current) {
      console.log('Sync already in progress, skipping checkAndSyncChanges')
      return
    }

    // Check again after delay
    const updatedData = localStorage.getItem(storageKey)
    if (updatedData) {
      const updatedParsed: LocalStorageData = JSON.parse(updatedData)
      if (!updatedParsed.savedDb) {
        await syncWithDatabase()
      }
    }
  }, [id, syncWithDatabase])

  // Handle tab/window close and page navigation
  useEffect(() => {
    const handleUnload = () => {
      // For beforeunload, we can't use async/await, so we'll just trigger the sync
      const storageKey = getStorageKey(id)
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
        const parsedData: LocalStorageData = JSON.parse(savedData)
        if (!parsedData.savedDb) {
          syncWithDatabase()
        }
      }
    }

    // Handle tab visibility changes (minimize/restore)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        checkAndSyncChanges()
      }
    }

    console.log('Adding event listeners...')

    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('pagehide', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [id, checkAndSyncChanges, syncWithDatabase])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current)
      }
    }
  }, [])

  const getSyncStatus = () => {
    if (isSaving) return 'Saving...'
    if (lastSaved) return `Last saved: ${lastSaved.toLocaleTimeString()}`
    return 'Not saved'
  }

  if (isLoading) {
    return (
      <EditorPageLoading />
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-3 md:p-6">
      {/* Status bar */}
      <div className="mb-4 md:mb-8 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
          {isEditingTitle ? (
            <div className="flex items-center gap-1 md:gap-2 w-full max-w-full">
              <input
                ref={titleInputRef}
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={handleTitleKeyPress}
                className="text-2xl md:text-4xl font-extrabold font-mono bg-transparent border-b-2 border-gray-400 focus:border-blue-500 outline-none text-[#dcdcdc] text-center min-w-0 flex-1 px-2"
                disabled={isSavingTitle}
              />
              <button
                onClick={saveTitle}
                disabled={isSavingTitle}
                className="p-1 text-green-500 hover:text-green-600 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <Check size={16} className="md:hidden" />
                <Check size={20} className="hidden md:block" />
              </button>
              <button
                onClick={cancelEditingTitle}
                disabled={isSavingTitle}
                className="p-1 text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <X size={16} className="md:hidden" />
                <X size={20} className="hidden md:block" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group w-full justify-center">
              <h1 className="text-2xl md:text-4xl font-extrabold font-mono text-[#dcdcdc] text-center break-words max-w-full">
                {pageDetails?.title || 'Untitled'}
              </h1>
              <button
                onClick={startEditingTitle}
                className="p-1 text-gray-400 hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                <Edit3 size={16} className="md:hidden" />
                <Edit3 size={20} className="hidden md:block" />
              </button>
            </div>
          )}
        </div>

        {isSavingTitle && (
          <div className="text-xs md:text-sm text-gray-400 mb-2">Saving title...</div>
        )}
      </div>

      <div className="w-full h-full">
        <Editor
          data={content}
          onChange={handleEditorChange}
          holder="editorjs"
          isSaving={isSaving}
        />
      </div>
    </div>
  )
}