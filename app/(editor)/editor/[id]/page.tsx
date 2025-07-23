import { Suspense } from 'react'
import EditorClient from './EditorClient'

type PageProps = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <EditorClient id={id} />
    </Suspense>
  )
}
