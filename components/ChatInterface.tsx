import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { ChatMessage, NPCData } from '../types';

interface ChatInterfaceProps {
    targetNPC: NPCData;
    messages: ChatMessage[];
    onSendMessage: (text: string) => void;
    onClose: () => void;
    isTyping: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ targetNPC, messages, onSendMessage, onClose, isTyping }) => {
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <div className="absolute bottom-4 right-4 w-[350px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 flex flex-col overflow-hidden animate-slide-up z-50 font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full border-2 border-white ${targetNPC.style.skinColor} overflow-hidden relative`}>
                         {/* Mini Avatar Head representation */}
                         <div className={`absolute top-0 w-full h-3 ${targetNPC.style.hairColor}`}></div>
                         <div className="absolute top-3 left-2 flex gap-1.5">
                            <div className="w-1 h-1 bg-black rounded-full"></div>
                            <div className="w-1 h-1 bg-black rounded-full"></div>
                         </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm leading-tight">{targetNPC.name}</h3>
                        <p className="text-[10px] opacity-80 uppercase tracking-wider">{targetNPC.role}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X size={18} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 h-[300px] overflow-y-auto p-4 bg-slate-50 space-y-3">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-xs mt-10">
                        Start a conversation with {targetNPC.name}!
                    </div>
                )}
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isPlayer ? 'justify-end' : 'justify-start'}`}>
                        <div 
                            className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                                msg.isPlayer 
                                ? 'bg-blue-500 text-white rounded-tr-none' 
                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Say something..."
                    className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2 text-sm transition-all outline-none"
                    autoFocus
                />
                <button 
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors shadow-md"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;