"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Check, Share2, AlertCircle } from "lucide-react"

interface Toast {
  id: string
  message: string
  type: "success" | "info" | "error"
  icon?: React.ReactNode
}

let toastId = 0
const toasts: Toast[] = []
const listeners: ((toasts: Toast[]) => void)[] = []

export function useToast() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToastList(newToasts)
    }
    listeners.push(listener)
    return () => {
      listeners.splice(listeners.indexOf(listener), 1)
    }
  }, [])

  const showToast = (message: string, type: "success" | "info" | "error" = "info", duration = 3000) => {
    const id = String(toastId++)
    const icon =
      type === "success" ? <Check size={18} /> : type === "error" ? <AlertCircle size={18} /> : <Share2 size={18} />

    const newToast: Toast = { id, message, type, icon }
    toasts.push(newToast)
    listeners.forEach((listener) => listener([...toasts]))

    setTimeout(() => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        toasts.splice(index, 1)
        listeners.forEach((listener) => listener([...toasts]))
      }
    }, duration)
  }

  return { showToast, toasts: toastList }
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-40 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-primary text-primary-foreground"
          }`}
        >
          {toast.icon}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
