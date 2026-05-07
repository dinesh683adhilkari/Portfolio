"use client"

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

export function SuccessContactDialog({
  open,
  onOpenChange,
  name,
  durationMs = 4000,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  durationMs?: number
}) {
  const [mounted, setMounted] = React.useState(open)

  React.useEffect(() => {
    if (open) {
      setMounted(true)

      if (durationMs > 0) {
        const t = window.setTimeout(() => onOpenChange(false), durationMs)
        return () => window.clearTimeout(t)
      }
    }
  }, [open, durationMs, onOpenChange])

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => {
        if (!open) setMounted(false)
      }}
    >
      {mounted && open && (
        <motion.div
          key="success-contact-dialog"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-border bg-background shadow-xl"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="text-base font-semibold text-foreground">
                    Successfully received!
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {"Thank you for reaching out"}
                    {name?.trim() ? `, ${name.trim()}!` : '!'} I’ve successfully received your message and truly appreciate you taking the time to connect. I’ll review it and get back to you as soon as possible.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="hidden"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-border/70" />

            <div className="p-4">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Close
              </button>
              <div className="mt-2 text-center text-xs text-muted-foreground">
                Press Close to dismiss this dialog.
              </div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

