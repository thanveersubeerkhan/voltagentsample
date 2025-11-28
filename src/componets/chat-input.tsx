import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  placeholder?: string
  disabled?: boolean
}

export function ChatInput({ 
  onSendMessage, 
  placeholder = "Type a message...", 
  disabled = false 
}: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 border-0 bg-transparent focus-visible:ring-0 disabled:opacity-50"
      />
      <Button 
        onClick={handleSend} 
        size="sm" 
        className="gap-2 bg-blue-600 hover:bg-blue-700" 
        disabled={!message.trim() || disabled}
      >
        <SendIcon className="h-4 w-4" />
        Send
      </Button>
    </div>
  )
}

function SendIcon({ className = "" }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}