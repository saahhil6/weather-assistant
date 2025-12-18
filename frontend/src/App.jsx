import React, { useState, useRef, useEffect } from 'react';
import { Send, Cloud, Loader2, Sparkles, CloudRain, Sun, Wind, Droplets, MapPin, Zap } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! Ask me about the weather in any city. ✨' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Connection error. Please ensure the backend is running on port 8000.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-cyan-900/40"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Weather Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CloudRain className="absolute top-1/4 left-10 w-8 h-8 text-blue-400/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Sun className="absolute top-1/3 right-20 w-10 h-10 text-yellow-400/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <Wind className="absolute bottom-1/3 left-1/4 w-8 h-8 text-cyan-400/20 animate-pulse" style={{ animationDelay: '2.5s' }} />
        <Droplets className="absolute bottom-1/4 right-1/4 w-8 h-8 text-blue-400/20 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Spectacular Header */}
        <div className="relative mb-6">
          <div className="backdrop-blur-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 animate-pulse"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Logo */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                    <Cloud className="w-10 h-10 text-white" />
                    <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
                    <Zap className="w-4 h-4 text-cyan-300 absolute -bottom-1 -left-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>

                {/* Title Section */}
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2 tracking-tight">
                    Weather AI
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-300 font-medium">Live</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Powered by LangChain & OpenRouter</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden lg:flex gap-6">
                <div className="text-center bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">24/7</div>
                  <div className="text-xs text-gray-400 mt-1">Availability</div>
                </div>
                <div className="text-center bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">∞</div>
                  <div className="text-xs text-gray-400 mt-1">Cities</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 backdrop-blur-2xl bg-black/40 rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-6 py-4 transform hover:scale-[1.02] transition-all duration-300 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_100%] animate-gradient text-white shadow-xl shadow-purple-500/40'
                      : 'bg-white/10 backdrop-blur-xl text-gray-100 border border-white/20 shadow-lg'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <p className="text-sm text-gray-200 font-medium">Fetching weather data...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gradient-to-t from-black/60 to-transparent border-t border-white/10">
            <div className="relative flex items-center gap-3">
              <div className="absolute -top-8 left-0 right-0 text-center">
                <p className="text-xs text-gray-500">Press Enter to send • Shift + Enter for new line</p>
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about weather in any city... 🌍"
                disabled={loading}
                className="flex-1 bg-white/10 backdrop-blur-xl text-white placeholder-gray-400 rounded-2xl px-6 py-5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500/70 border border-white/20 disabled:opacity-50 transition-all shadow-lg hover:bg-white/15"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="relative group bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-[length:200%_100%] text-white rounded-2xl px-8 py-5 hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-bold overflow-hidden transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Send className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                <span className="relative z-10">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
      `}</style>
    </div>
  );
}