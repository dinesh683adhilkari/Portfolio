import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useBranch } from '@/hooks/use-branch-context'
import { useToast } from '@/hooks/use-toast'

export function GithubBranchPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputBranch, setInputBranch] = useState('')
  const { setBranchName } = useBranch()
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateBranch = async () => {
    if (!inputBranch.trim()) return

    const branchName = `blackboxai/${inputBranch.toLowerCase().replace(/\s+/g, '-')}`
    setIsCreating(true)
    try {
      // Create and checkout new branch, add all changes, commit
      await fetch('/api/git-branch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branchName })
      })
      setBranchName(branchName)
      toast({
        title: 'Branch Created!',
        description: `Switched to ${branchName}. Ready for PR!`
      })
      setIsOpen(false)
    } catch (error) {
      toast({
        title: 'Failed to Create Branch',
        description: 'Please check git status and try again.',
        variant: 'destructive'
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="ml-2">New Branch</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create GitHub PR Branch</DialogTitle>
          <DialogDescription>
            Enter branch name (prefixed with blackboxai/)
          </DialogDescription>
        </DialogHeader>
        <Input
          value={inputBranch}
          onChange={(e) => setInputBranch(e.target.value)}
          placeholder="my-feature"
          className="mb-4"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreateBranch} disabled={!inputBranch.trim() || isCreating}>
            {isCreating ? 'Creating...' : 'Create & Commit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

