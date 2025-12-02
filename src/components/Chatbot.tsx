import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Paperclip, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: string;
  type: "user" | "bot" | "system";
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  image?: string;
  reactions?: string[];
}

const STORAGE_KEY = "kareems-chat-history";
const MINIMIZED_KEY = "kareems-chat-minimized";

const quickReplies = [
  { id: "menu", label: "Show Menu", icon: "🍽️" },
  { id: "reserve", label: "Reserve a Table", icon: "📅" },
  { id: "hours", label: "Opening Hours", icon: "🕐" },
  { id: "location", label: "Location", icon: "📍" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2 bg-secondary rounded-2xl rounded-bl-sm max-w-[80px]">
    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
  </div>
);

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.type === "user";
  const isSystem = message.type === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="px-4 py-2 bg-muted/50 rounded-full text-xs text-muted-foreground">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2 mb-4 animate-fade-in", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex flex-col max-w-[75%] sm:max-w-[70%]", isUser && "items-end")}>
        {message.image && (
          <img
            src={message.image}
            alt="Uploaded"
            className="rounded-2xl mb-2 max-h-[200px] object-cover shadow-md"
          />
        )}
        <div
          className={cn(
            "px-4 py-2 rounded-2xl shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-secondary text-foreground rounded-bl-sm"
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className="flex items-center gap-1 mt-1 px-2">
          <span className="text-[10px] text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isUser && message.status && (
            <span className="text-muted-foreground">
              {message.status === "sent" && <Check className="w-3 h-3" />}
              {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
              {message.status === "read" && <CheckCheck className="w-3 h-3 text-primary" />}
            </span>
          )}
        </div>
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-1">
            {message.reactions.map((reaction, idx) => (
              <span key={idx} className="text-xs">
                {reaction}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(
        parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }))
      );
    } else {
      // Welcome message
      setMessages([
        {
          id: "welcome",
          type: "bot",
          content: "Welcome to Kareem's! 👋 I'm your restaurant assistant. How can I help you today?",
          timestamp: new Date(),
          status: "read",
        },
      ]);
    }

    const wasMinimized = localStorage.getItem(MINIMIZED_KEY);
    if (wasMinimized === "false") {
      setIsOpen(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Remember minimization state
  useEffect(() => {
    localStorage.setItem(MINIMIZED_KEY, String(isOpen));
  }, [isOpen]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [
      ...prev.map((m) => (m.status ? { ...m, status: "read" as MessageStatus } : m)),
      newMessage
    ]);
    return newMessage;
  };

  const handleSend = () => {
    if (!inputValue.trim() && !selectedImage) return;

    const userMessage = addMessage({
      type: "user",
      content: inputValue || "Sent an image",
      status: "sent",
      image: selectedImage || undefined,
    });

    setInputValue("");
    setSelectedImage(null);

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessage.id ? { ...m, status: "delivered" } : m))
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessage.id ? { ...m, status: "read" } : m))
      );
    }, 1000);

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        type: "bot",
        content: getBotResponse(inputValue),
      });
    }, 1500);
  };

  const handleQuickReply = (id: string) => {
    const replyMap: Record<string, string> = {
      menu: "Show Menu",
      reserve: "Reserve a Table",
      hours: "Opening Hours",
      location: "Location",
    };

    addMessage({
      type: "user",
      content: replyMap[id],
      status: "sent",
    });

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        type: "bot",
        content: getQuickReplyResponse(id),
      });
    }, 1200);
  };

  const getBotResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes("menu")) {
      return "Our menu features authentic North-West Frontier cuisine including Raan Zafran, Rampuri Biryani, and Prawn Coconut Curry. Would you like me to show you our full menu?";
    }
    if (lower.includes("reserve") || lower.includes("book")) {
      return "I'd be happy to help you reserve a table! We have locations in UAE (City Centre Mirdif, Dubai Hills Mall) and KSA (Nakheel Mall, View Mall, Turki Square). Which location would you prefer?";
    }
    if (lower.includes("hours") || lower.includes("open")) {
      return "We're open daily from 12:00 PM to 11:00 PM. Our kitchen stays open until 10:30 PM. Would you like to know about a specific location?";
    }
    return "Thank you for your message! A member of our team will assist you shortly. Meanwhile, feel free to explore our menu or make a reservation.";
  };

  const getQuickReplyResponse = (id: string): string => {
    const responses: Record<string, string> = {
      menu: "Explore our authentic Indian cuisine featuring signature dishes like Raan Zafran and Rampuri Biryani. Visit our Menu page to see the full selection!",
      reserve: "I'd love to help you book a table! Please select your preferred location: UAE (City Centre Mirdif, Dubai Hills Mall) or KSA (Nakheel Mall, View Mall, Turki Square).",
      hours: "We're open daily from 12:00 PM to 11:00 PM. Kitchen closes at 10:30 PM. Looking forward to serving you!",
      location: "We have 5 locations: UAE - City Centre Mirdif, Dubai Hills Mall | KSA - Nakheel Mall, View Mall, Turki Square. Which one would you like to visit?",
    };
    return responses[id];
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-elegant transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "flex items-center justify-center",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-90"
        )}
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-40 transition-all duration-300 ease-out",
          "bottom-24 right-6",
          "w-[min(420px,calc(100vw-3rem))] h-[600px]",
          "md:w-[380px] md:h-[600px]",
          "sm:max-h-[80vh]",
          "bg-background rounded-2xl shadow-2xl border border-border",
          "flex flex-col overflow-hidden",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
        style={{ aspectRatio: "9/16" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-serif font-bold">
              K
            </div>
            <div>
              <h3 className="font-semibold">Kareem's Assistant</h3>
              <p className="text-xs opacity-90">Online • Typically replies instantly</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-secondary/50 p-3 border-b border-border">
          <div className="flex gap-2 flex-wrap">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply.id)}
                className="px-3 py-1.5 bg-background hover:bg-muted rounded-full text-xs font-medium transition-colors shadow-sm border border-border/50 flex items-center gap-1.5"
              >
                <span>{reply.icon}</span>
                <span>{reply.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex gap-2 mb-4">
                <div className="flex flex-col max-w-[75%]">
                  <TypingIndicator />
                  <span className="text-[10px] text-muted-foreground mt-1 px-2">
                    Kareem's is typing...
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Image Preview */}
        {selectedImage && (
          <div className="px-4 pb-2">
            <div className="relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-20 rounded-lg" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-border bg-background safe-bottom">
          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 resize-none"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="shrink-0 bg-primary hover:bg-primary/90"
              disabled={!inputValue.trim() && !selectedImage}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
