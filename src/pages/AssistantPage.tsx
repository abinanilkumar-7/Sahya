import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, ShieldCheck, HeartPulse, ExternalLink, Zap } from 'lucide-react';
import { AssistantMessage } from '../types';
import { assistantService } from '../services/assistantService';
import { useLocation } from '../context/LocationContext';
import { Link } from 'react-router-dom';

export const AssistantPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Welcome to **Uyra**. I am connected directly to Sahya\'s verified community database. Ask me to find hospitals with ICU beds, oxygen refilling points, 24/7 pharmacies, or blood banks near you.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const { latitude, longitude } = useLocation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const userText = queryText || input.trim();
    if (!userText || isLoading) return;

    if (!queryText) setInput('');

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
          text: 'I ran into an issue connecting to the database server. Please try again.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQueries = [
    'Find a pharmacy near me open now',
    'Which hospitals have available ICU beds?',
    'Find emergency oxygen cylinder supplier',
    'Where is the nearest blood bank with O+ blood?',
  ];

  return (
    <div className="pt-28 pb-24 bg-brandbg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400 flex items-center justify-center mx-auto mb-3">
            <Bot className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="font-serif text-4xl font-normal text-navy-950">Uyra</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Safe, tool-backed assistance search. No unverified medical diagnoses or hallucinated data.
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {sampleQueries.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-700 text-xs font-semibold shadow-subtle transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-600" />
              <span>{q}</span>
            </button>
          ))}
        </div>

        {/* Chat Card Window */}
        <div className="bg-navy-900 border border-white/20 rounded-3xl shadow-2xl h-[560px] flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="p-4 bg-navy-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Verified Sahya Data Stream Active</span>
            </div>
            <span className="text-[11px] text-slate-400">GPS Context Enabled</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-navy-900/90 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  {msg.toolsInvoked && msg.toolsInvoked.length > 0 && (
                    <span className="text-[10px] font-mono text-cyan-300 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Executed tool {msg.toolsInvoked.join(', ')}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl leading-relaxed text-xs sm:text-sm ${
                      isUser
                        ? 'bg-teal-500 text-navy-950 font-medium rounded-br-xs shadow-md'
                        : 'bg-navy-950/90 border border-white/10 text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {msg.resourceSuggestions && msg.resourceSuggestions.length > 0 && (
                      <div className="mt-3 space-y-2 pt-3 border-t border-white/10">
                        {msg.resourceSuggestions.map((res) => (
                          <div
                            key={res._id}
                            className="bg-navy-900 p-3 rounded-xl border border-white/15 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-bold text-white text-xs">{res.name}</p>
                              <span className="text-teal-400 text-[11px]">{res.category} • {res.operatingHours}</span>
                            </div>
                            <Link
                              to={`/resources/${res._id}`}
                              className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-cyan-300 hover:bg-teal-500/40 text-xs font-bold flex items-center gap-1"
                            >
                              Details <ExternalLink className="w-3 h-3" />
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
                <Bot className="w-4 h-4 animate-spin text-cyan-400" /> Searching verified resources...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-navy-950 border-t border-white/10 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Uyra anything..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
