import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const FAQ_DATA = [
  {
    q: "What services does Bucle offer?",
    a: "We specialize in custom web application development, UI/UX design, mobile apps, and scalable digital product architecture."
  },
  {
    q: "How long does a project take?",
    a: "Standard web application MVPs typically take 4 to 8 weeks from initial discovery to launch."
  },
  {
    q: "How can I get a project estimate?",
    a: "You can click 'Get Started' or send us your scope details via the chat to schedule an initial discovery call!"
  }
];

export const FaqBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi! I am Bucle assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const match = FAQ_DATA.find(item => item.q.toLowerCase() === text.toLowerCase());
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: match 
          ? match.a 
          : "Thanks for reaching out! A member of our team will review your message shortly. Feel free to explore our FAQ options below."
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="apple-glass rounded-3xl w-80 sm:w-96 h-[480px] flex flex-col overflow-hidden mb-4 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0C1B33] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F]">Bucle Assistant</h4>
                  <p className="text-[10px] text-black/50">Always active</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4 text-black/60" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0C1B33] text-white rounded-br-none'
                        : 'bg-black/5 text-[#1D1D1F] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Suggestions */}
            <div className="px-4 py-2 border-t border-black/5 bg-white/20 flex gap-1.5 overflow-x-auto no-scrollbar">
              {FAQ_DATA.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.q)}
                  className="text-[10px] bg-white border border-black/5 text-black/70 rounded-full px-2.5 py-1 whitespace-nowrap hover:bg-black/5 active:scale-95 transition-all"
                >
                  {item.q}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-black/5 bg-white/40 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white/80 text-xs px-3.5 py-2 rounded-full border border-black/5 outline-none focus:border-black/20"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#0C1B33] text-white flex items-center justify-center active:scale-95 transition-transform"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="apple-glass p-4 rounded-full shadow-lg flex items-center justify-center text-[#0C1B33] hover:bg-white transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  );
};