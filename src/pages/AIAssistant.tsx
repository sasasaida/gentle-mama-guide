import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/appStore';
import { searchHealthDatabase, HealthQuestion } from '@/data/healthDatabase';
import { Send, Bot, User, AlertTriangle, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: HealthQuestion[];
}

const suggestedQuestions = [
  "Is it safe to eat papaya?",
  "How much caffeine can I have?",
  "What exercises are safe?",
  "How can I manage morning sickness?"
];

export function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate typing delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 800));

    // Search local database
    const results = searchHealthDatabase(userMessage);

    let response: Message;
    if (results.length > 0) {
      const primaryResult = results[0];
      response = {
        role: 'assistant',
        content: primaryResult.answer,
        sources: results
      };
    } else {
      response = {
        role: 'assistant',
        content: "I don't have specific information about that in my database. For medical questions not covered here, please consult your healthcare provider. You can try rephrasing your question or asking about common pregnancy topics like nutrition, symptoms, exercise, or medications."
      };
    }

    setIsTyping(false);
    setMessages(prev => [...prev, response]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 pt-12 pb-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-sage flex items-center justify-center">
              <Bot size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground">
                Health Assistant
              </h1>
              <p className="text-xs text-muted-foreground">Offline • Privacy-first</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-3 bg-warning/10 border-b border-warning/20">
        <div className="max-w-lg mx-auto flex items-start gap-2">
          <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warning-foreground">
            This assistant provides general information only and is not a substitute for professional medical advice. 
            Always consult your healthcare provider for medical decisions.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-sage-light flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                Ask me anything
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                I can help with questions about nutrition, symptoms, exercise, and more.
              </p>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                  Try asking
                </p>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="block w-full text-left px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3 animate-fade-in",
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                      <Bot size={18} className="text-primary" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                          <BookOpen size={12} />
                          Source
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {msg.sources[0].source}
                        </p>
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-blush-light flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center">
                    <Bot size={18} className="text-primary" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border px-5 py-3 safe-bottom">
        <div className="max-w-lg mx-auto flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about pregnancy health..."
            className="flex-1 h-11"
          />
          <Button 
            variant="sage" 
            size="icon" 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-11 w-11"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
