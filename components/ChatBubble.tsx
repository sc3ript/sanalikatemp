import React, { useEffect, useState } from 'react';

interface ChatBubbleProps {
    text: string;
    onExpire?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, onExpire }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onExpire) onExpire();
        }, 4000);
        return () => clearTimeout(timer);
    }, [text, onExpire]);

    if (!visible) return null;

    return (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-[100] max-w-[200px] pointer-events-none animate-bounce-in">
            <div className="bg-white border-2 border-gray-800 rounded-xl p-3 shadow-xl relative">
                <p className="text-xs font-medium text-gray-800 leading-tight text-center">
                    {text}
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-gray-800 transform rotate-45"></div>
            </div>
        </div>
    );
};

export default ChatBubble;