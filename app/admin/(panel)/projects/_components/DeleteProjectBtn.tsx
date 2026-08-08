'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DeleteProjectBtnProps {
  id: string
  title: string
}

export default function DeleteProjectBtn({ id, title }: DeleteProjectBtnProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        credentials: 'include',
      })

      if (res.ok) {
        setOpen(false)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete project')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Delete
          </Button>
        }
      />
      <DialogContent className="border-gray-800 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-white">&quot;{title}&quot;</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
