import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle, Copy, ExternalLink } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useBranch } from '@/hooks/use-branch-context'

interface SuccessDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  name: string
  subject: string
  branchName: string
}

export function SuccessMessageDialog({ isOpen, onOpenChange, name, subject, branchName }: SuccessDialogProps) {
  const { toast } = useToast()

  const handleCreatePR = async () => {
    try {
      const result = await fetch('/api/create-pr', { method: 'POST' })
      if (result.ok) {
        toast({
          title: 'PR Created!',
          description: 'Your pull request is ready for review.'
        })
      }
    } catch (error) {
      toast({
        title: 'PR Creation Failed',
        description: 'Please create PR manually with `gh pr create`.',
        variant: 'destructive'
      })
    }
  }

  const changelog = `✨ Added GitHub branch popup feature\n📧 Enhanced contact form with success dialog\n🎯 Personalized message with form data & branch info\n🚀 Ready for review on ${branchName}`

  const handleCopyChangelog = () => {
    navigator.clipboard.writeText(changelog)
    toast({
      title: 'Changelog Copied!',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <DialogTitle>Message Sent Successfully!</DialogTitle>
              <DialogDescription className="text-lg">
                Thanks <span className="font-semibold text-foreground">{name}</span> for reaching out about <span className="font-semibold text-primary">"{subject}"</span>!
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 mb-6 p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Changes committed to branch <code className="bg-background px-1.5 py-0.5 rounded font-mono text-xs font-medium">{branchName}</code>
          </p>
          <div className="text-xs bg-muted/20 p-3 rounded-md font-mono border">
            {changelog}
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button onClick={handleCopyChangelog} variant="outline" size="sm" className="gap-1">
            <Copy className="w-4 h-4" />
            Copy Changelog
          </Button>
          <Button onClick={handleCreatePR} className="gap-1">
            Create PR <ExternalLink className="w-4 h-4" />
          </Button>
          <DialogClose asChild>
            <Button variant="outline" size="sm">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

