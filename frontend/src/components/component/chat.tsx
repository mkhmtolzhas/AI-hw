"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useWebSocket from '@/lib/hooks/useWebsocket';
import { useEffect, useState } from 'react';
import Message from "../ui/message";

export function Chat() {
  const { messages, sendMessage } = useWebSocket('ws://localhost:3000');
  const [prompt, setPrompt] = useState('');
  const [messagesList, setMessagesList] = useState<any[]>([])

  const handleSend = (e: any) => {
    if (prompt.trim() !== '') {
      e.preventDefault();
      setMessagesList(prevMessagesList => [...prevMessagesList, { message: prompt, sender: "user" }]);
      sendMessage(prompt);
      setPrompt('');
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setMessagesList(prevMessagesList => [...prevMessagesList, { message: lastMessage, sender: "bot" }]);
    }
  }, [messages]);

  useEffect(() => {
    console.log(messagesList);
  }, [messagesList]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <h1 className="text-2xl font-bold">Chat with Bot</h1>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {messagesList.map((message, index) => (
            <Message key={index} message={message.message} sender={message.sender} />
          ))}
        </div>
      </div>
      <div className="border-t p-4">
        <form className="flex items-center gap-2" onSubmit={handleSend}>
          <Input type="text" placeholder="Type your message..." className="flex-1" value={prompt} onChange={e => setPrompt(e.target.value)} />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}
