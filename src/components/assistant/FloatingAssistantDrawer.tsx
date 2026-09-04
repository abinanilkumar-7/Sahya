import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MapPin, ExternalLink, ShieldCheck, HeartPulse } from 'lucide-react';
import { AssistantMessage, Resource } from '../../types';
import { assistantService } from '../../services/assistantService';
import { useLocation } from '../../context/LocationContext';
import { Link } from 'react-router-dom';

export const FloatingAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Hello! I am **Uyra**. Ask me to locate nearby verified hospitals, available ICU beds, oxygen suppliers, 24/7 pharmacies, or blood banks.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const { latitude, longitude } = useLocation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await assistantService.processQuery(userText, { latitude, longitude });
      setMessages((prev) => [...prev, response]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'I encountered an issue processing your query. Please try again or browse resources directly from the search bar.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 text-navy-950 font-bold text-xs shadow-2xl shadow-teal-500/30 hover:scale-105 transition-all group"
        aria-label="Open Uyra"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-navy-950 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-200 animate-ping" />
        </div>
        <span>Uyra</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-navy-900 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Top Bar */}
          <div className="p-4 bg-navy-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-none">Uyra</h4>
                <span className="text-[10px] text-teal-400 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Verified Database Search
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-navy-900/90 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  {msg.toolsInvoked && msg.toolsInvoked.length > 0 && (
                    <span className="text-[10px] font-mono text-cyan-400/80 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Executed {msg.toolsInvoked.join(', ')}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      isUser
                        ? 'bg-teal-500 text-navy-950 font-medium rounded-br-xs shadow-md'
                        : 'bg-navy-950/80 border border-white/10 text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Resource Suggestions Cards */}
                    {msg.resourceSuggestions && msg.resourceSuggestions.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-white/10">
                        {msg.resourceSuggestions.map((res) => (
                          <div
                            key={res._id}
                            className="bg-navy-900/90 p-2.5 rounded-xl border border-white/15 flex items-center justify-between text-[11px]"
                          >
                            <div>
                              <p className="font-bold text-white truncate">{res.name}</p>
                              <span className="text-teal-400">{res.category} • {res.operatingHours}</span>
                            </div>
                            <Link
                              to={`/resources/${res._id}`}
                              onClick={() => setIsOpen(false)}
                              className="p-1.5 rounded-lg bg-teal-500/20 text-cyan-300 hover:bg-teal-500/40"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <Bot className="w-3.5 h-3.5 animate-spin text-cyan-400" /> Searching verified resources...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-navy-950 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Uyra....."
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
