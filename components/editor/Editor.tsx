'use client'
import React, { useEffect, useRef, useState } from "react"
import EditorJS, { ToolConstructable } from "@editorjs/editorjs"
import Code from "@editorjs/code"
import Delimiter from "@editorjs/delimiter"
import InlineCode from "@editorjs/inline-code"
import List from "@editorjs/list"
import Quote from "@editorjs/quote"
import Table from "@editorjs/table"
import Header from "@editorjs/header"
import Paragraph from "@editorjs/paragraph"

const EDITOR_TOOLS = {
  code: Code,
  Header: {
    class: Header as unknown as ToolConstructable,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4],
      defaultLevel: 1
    }
  },
  Paragraph: {
    class: Paragraph as unknown as ToolConstructable,
  },
  inlineCode: InlineCode,
  table: Table,
  list: List,
  quote: Quote,
  delimiter: Delimiter,
}

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
}

interface EditorProps {
  data: any
  onChange: (data: any) => void
  holder: string
  borderSize?: number
  borderRadius?: number
  neonColors?: NeonColorsProps
  enableNeonEffect?: boolean
  isSaving?: boolean
}

export default function Editor({
  data,
  onChange,
  holder,
  borderSize = 1,
  borderRadius = 0.5,
  neonColors = { firstColor: '#0cc0df', secondColor: '#f5d244' },
  enableNeonEffect = true,
  isSaving = false,
}: EditorProps) {
  // Set colors based on saving status
  const statusColors = isSaving
    ? { firstColor: '#ffde59', secondColor: '#e96524' } // Saving colors
    : { firstColor: '#ffbb94', secondColor: '#dc586d' } // Default/Last saved colors

  // Always use status colors when isSaving changes, otherwise use provided neonColors or default status colors
  const effectiveNeonColors = isSaving !== undefined ? statusColors : (neonColors || statusColors)
  const ref = useRef<EditorJS | undefined>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)
  const initialDataLoaded = useRef(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Track dimensions for neon effect
  useEffect(() => {
    if (!enableNeonEffect) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        setDimensions({ width: offsetWidth, height: offsetHeight })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Use ResizeObserver for better tracking of editor height changes
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener("resize", updateDimensions)
      resizeObserver.disconnect()
    }
  }, [enableNeonEffect])

  useEffect(() => {
    if (!ref.current && !isInitialized.current) {
      isInitialized.current = true
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Start writing here...",
        tools: EDITOR_TOOLS,
        data: data,
        async onChange(api, event) {
          try {
            const content = await api.saver.save()
            onChange(content)
          } catch (error) {
            console.error('Error saving editor content:', error)
          }
        },
        onReady: () => {
          console.log('Editor.js is ready to work!')
          console.log(data)
          initialDataLoaded.current = true
        }
      })
      ref.current = editor
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
        ref.current = undefined
        isInitialized.current = false
        initialDataLoaded.current = false
      }
    }
  }, [holder, onChange])

  useEffect(() => {
    if (ref.current && data && ref.current.render) {
      ref.current.isReady.then(() => {
        if (ref.current && data) {
          ref.current.render(data).catch((error: any) => {
            console.error('Error rendering editor data:', error)
          })
          console.log('Editor data loaded:', data)
        }
      }).catch((error: any) => {
        console.error('Editor not ready:', error)
      })
    }
  }, [data])

  // Generate neon effect styles
  const neonStyles = enableNeonEffect ? {
    '--neon-border-size': `${borderSize}px`,
    '--neon-border-radius': `${borderRadius}rem`,
    '--neon-first-color': effectiveNeonColors.firstColor,
    '--neon-second-color': effectiveNeonColors.secondColor,
    '--blur-amount': '10px',
  } as React.CSSProperties : {}

  const containerClasses = enableNeonEffect
    ? "relative z-10 w-full min-h-[500px] rounded-2xl p-px bg-gradient-to-br from-[var(--neon-first-color)] to-[var(--neon-second-color)]"
    : "w-full min-h-[500px] rounded-lg"

  const editorClasses = enableNeonEffect
    ? `relative w-full h-full rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-[10px] after:absolute after:inset-0 after:-z-10 after:block after:rounded-[var(--border-radius)]
     after:content-[''] after:bg-[linear-gradient(45deg,var(--neon-first-color),var(--neon-second-color))] after:blur-[var(--blur-amount)] after:opacity-40`
    : "w-full min-h-[500px] rounded-lg bg-white/90 backdrop-blur-[10px] border-0 p-4 focus:outline-none transition-colors"

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={neonStyles}
    >
      <div className={editorClasses}>
        <div id={holder} className="codex-editor w-full min-h-[500px] [&>div]:bg-transparent [&_.ce-block]:bg-transparent [&_.ce-block__content]:bg-transparent p-5 rounded-2xl" />
      </div>
    </div>
  )
}
