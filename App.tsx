import React, { useState } from 'react';
import World from './components/World';
import ChatInterface from './components/ChatInterface';
import StartScreen from './components/StartScreen';
import { NPCData, ChatMessage } from './types';
import { generateNPCResponse } from './services/geminiService';

const App: React.FC = () => {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [activeNPC, setActiveNPC] = useState<NPCData | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>({});
  const [npcTyping, setNpcTyping] = useState<Record<string, boolean>>({});
  const [lastPlayerMessage, setLastPlayerMessage] = useState<string | null>(null);

  const handleStart = (name: string) => {
    setPlayerName(name);
  };

  const handleInteract = (npc: NPCData | null) => {
    // If null is passed, we might want to close chat if it was open with that specific NPC
    // But usually, we just set active NPC.
    // If we click ground (npc=null), we close chat.
    if (!npc) {
        setActiveNPC(null);
        return;
    }
    
    setActiveNPC(npc);
    
    // Initial greeting if no history
    if (!chatHistory[npc.id]) {
        const greetingMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: npc.name,
            text: npc.greeting,
            isPlayer: false,
            timestamp: Date.now()
        };
        setChatHistory(prev => ({
            ...prev,
            [npc.id]: [greetingMsg]
        }));
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!activeNPC) return;
    
    const npcId = activeNPC.id;
    const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: playerName || 'Player',
        text: text,
        isPlayer: true,
        timestamp: Date.now()
    };

    setLastPlayerMessage(text);

    // Update UI immediately with player message
    setChatHistory(prev => ({
        ...prev,
        [npcId]: [...(prev[npcId] || []), newMessage]
    }));

    // Set typing state
    setNpcTyping(prev => ({ ...prev, [npcId]: true }));

    // Call Gemini
    const npcResponseText = await generateNPCResponse(
        activeNPC.name,
        activeNPC.persona,
        [...(chatHistory[npcId] || []), newMessage],
        text
    );

    const responseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: activeNPC.name,
        text: npcResponseText,
        isPlayer: false,
        timestamp: Date.now()
    };

    setNpcTyping(prev => ({ ...prev, [npcId]: false }));
    
    setChatHistory(prev => ({
        ...prev,
        [npcId]: [...(prev[npcId] || []), responseMsg]
    }));
  };

  if (!playerName) {
      return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden relative font-nunito">
      <World 
        playerName={playerName} 
        onInteract={handleInteract} 
        activeNPC={activeNPC}
        lastPlayerMessage={lastPlayerMessage}
      />

      {/* UI Overlay for general controls can go here (e.g. inventory button) */}
      <div className="absolute top-4 right-4 z-40 flex gap-2">
          <div className="bg-white/90 p-2 rounded-lg shadow-md text-xs font-bold text-gray-700">
              ONLINE: 1
          </div>
          <div className="bg-white/90 p-2 rounded-lg shadow-md text-xs font-bold text-blue-600">
              GEMINI: ACTIVE
          </div>
      </div>

      {/* Instruction Overlay */}
      <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
          <div className="bg-black/40 text-white px-4 py-2 rounded-full backdrop-blur-sm text-xs font-medium">
              Click to move • Click NPCs to chat
          </div>
      </div>

      {activeNPC && (
        <ChatInterface
          targetNPC={activeNPC}
          messages={chatHistory[activeNPC.id] || []}
          onSendMessage={handleSendMessage}
          onClose={() => setActiveNPC(null)}
          isTyping={npcTyping[activeNPC.id] || false}
        />
      )}
    </div>
  );
};

export default App;