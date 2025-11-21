import React, { useState, useEffect, useRef } from 'react';
import { Position, GameState, EntityType, Direction, NPCData } from '../types';
import { BUILDINGS, NPCS, PLAYER_START_POS, PLAYER_SPEED, PLAYER_STYLE, GAME_WIDTH, GAME_HEIGHT } from '../constants';
import Building from './Building';
import Avatar from './Avatar';
import ChatBubble from './ChatBubble';

interface WorldProps {
  playerName: string;
  onInteract: (npc: NPCData) => void;
  activeNPC: NPCData | null;
  lastPlayerMessage: string | null;
}

const World: React.FC<WorldProps> = ({ playerName, onInteract, activeNPC, lastPlayerMessage }) => {
  const [gameState, setGameState] = useState<GameState>({
    playerPos: PLAYER_START_POS,
    playerTarget: null,
    isMoving: false,
    playerName: playerName,
    activeNPC: null,
    direction: Direction.RIGHT
  });

  const [npcChatBubbles, setNpcChatBubbles] = useState<Record<string, string>>({});
  const [playerBubble, setPlayerBubble] = useState<string | null>(null);

  // Reference for the game loop
  const requestRef = useRef<number>(0);
  
  // Camera state
  const [cameraPos, setCameraPos] = useState<Position>({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  // Update player bubble when message sent
  useEffect(() => {
    if (lastPlayerMessage) {
        setPlayerBubble(lastPlayerMessage);
    }
  }, [lastPlayerMessage]);

  // Game Loop
  const update = () => {
    setGameState(prevState => {
      let newState = { ...prevState };

      if (newState.playerTarget) {
        const dx = newState.playerTarget.x - newState.playerPos.x;
        const dy = newState.playerTarget.y - newState.playerPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < PLAYER_SPEED) {
          // Arrived
          newState.playerPos = newState.playerTarget;
          newState.playerTarget = null;
          newState.isMoving = false;
        } else {
          // Move
          const ratio = PLAYER_SPEED / distance;
          newState.playerPos = {
            x: newState.playerPos.x + dx * ratio,
            y: newState.playerPos.y + dy * ratio
          };
          newState.isMoving = true;
          newState.direction = dx > 0 ? Direction.RIGHT : Direction.LEFT;
        }
      }

      return newState;
    });

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  // Camera logic
  useEffect(() => {
    if (viewportRef.current) {
      const viewportW = viewportRef.current.clientWidth;
      const viewportH = viewportRef.current.clientHeight;
      
      // Center player
      let camX = gameState.playerPos.x - viewportW / 2;
      let camY = gameState.playerPos.y - viewportH / 2;

      // Clamp to world bounds
      camX = Math.max(0, Math.min(camX, GAME_WIDTH - viewportW));
      camY = Math.max(0, Math.min(camY, GAME_HEIGHT - viewportH));

      setCameraPos({ x: camX, y: camY });
    }
  }, [gameState.playerPos]);

  const handleWorldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Do not move if clicking UI or active interaction (handled by overlay usually, but good safety)
    if (activeNPC) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left + cameraPos.x;
    const clickY = e.clientY - rect.top + cameraPos.y;

    // Check NPC clicks
    let clickedNPC = null;
    for (const npc of NPCS) {
       const dist = Math.sqrt(
           Math.pow(clickX - npc.position.x, 2) + Math.pow(clickY - npc.position.y, 2)
       );
       // Simple hit box roughly around the feet/body
       if (dist < 40) {
           clickedNPC = npc;
           break;
       }
    }

    if (clickedNPC) {
        // Move near NPC then interact
        const dx = clickedNPC.position.x - gameState.playerPos.x;
        const dy = clickedNPC.position.y - gameState.playerPos.y;
        // Target a point slightly in front of NPC
        setGameState(prev => ({
            ...prev,
            playerTarget: { x: clickedNPC!.position.x - (dx > 0 ? 50 : -50), y: clickedNPC!.position.y + 20 },
            isMoving: true,
            activeNPC: clickedNPC
        }));
        
        // Trigger interaction immediately for responsiveness, or wait for arrival?
        // Let's trigger immediately for smoother UX in this demo, 
        // but in a real game we'd wait for arrival.
        onInteract(clickedNPC);
    } else {
        // Move to ground
        setGameState(prev => ({
            ...prev,
            playerTarget: { x: clickX, y: clickY },
            isMoving: true,
            activeNPC: null
        }));
        // Clear interaction if moving away
        if (activeNPC) onInteract(null as any); // Clearing hack
    }
  };

  return (
    <div 
        ref={viewportRef}
        className="w-full h-full relative overflow-hidden bg-sky-200 cursor-pointer"
        onClick={handleWorldClick}
    >
        {/* Map Container - Transformed by Camera */}
        <div 
            className="absolute top-0 left-0 transition-transform duration-75 ease-linear origin-top-left"
            style={{ 
                width: GAME_WIDTH, 
                height: GAME_HEIGHT,
                transform: `translate3d(${-cameraPos.x}px, ${-cameraPos.y}px, 0)`
            }}
        >
            {/* Ground Textures */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
            
            {/* Green patches / Parks */}
            <div className="absolute top-[500px] left-[300px] w-[600px] h-[400px] bg-green-300 rounded-[50px] border-4 border-green-400/30"></div>
            <div className="absolute top-[200px] left-[1000px] w-[400px] h-[300px] bg-green-300 rounded-[50px] border-4 border-green-400/30"></div>

            {/* Sidewalks */}
            <div className="absolute top-[450px] left-[350px] w-[500px] h-[20px] bg-gray-300 rounded-full opacity-60"></div>

            {/* Buildings */}
            {BUILDINGS.map(b => <Building key={b.id} data={b} />)}

            {/* NPCs */}
            {NPCS.map(npc => (
                <div
                    key={npc.id}
                    className="absolute transition-transform duration-300"
                    style={{
                        left: npc.position.x - 20, // Center horizontally (avatar width is 40)
                        top: npc.position.y - 70, // Anchor at feet (height 80 approx)
                        zIndex: Math.floor(npc.position.y)
                    }}
                >
                    <Avatar 
                        style={npc.style} 
                        direction={Direction.LEFT} 
                        isWalking={false} 
                        name={npc.name} 
                        isNpc={true}
                        role={npc.role}
                    />
                    {/* Interaction Indicator Ring */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 border-2 border-yellow-400 rounded-[100%] opacity-0 hover:opacity-100 transition-opacity pointer-events-none animate-pulse"></div>
                </div>
            ))}

            {/* Player */}
            <div
                className="absolute transition-none"
                style={{
                    left: gameState.playerPos.x - 20,
                    top: gameState.playerPos.y - 70,
                    zIndex: Math.floor(gameState.playerPos.y)
                }}
            >
                 {playerBubble && (
                     <ChatBubble text={playerBubble} onExpire={() => setPlayerBubble(null)} />
                 )}
                <Avatar 
                    style={PLAYER_STYLE} 
                    direction={gameState.direction} 
                    isWalking={gameState.isMoving} 
                    name={gameState.playerName}
                />
            </div>

            {/* Click Target Indicator */}
            {gameState.playerTarget && (
                <div 
                    className="absolute w-6 h-6 border-2 border-white rounded-full animate-ping pointer-events-none"
                    style={{ left: gameState.playerTarget.x - 12, top: gameState.playerTarget.y - 12 }}
                ></div>
            )}

        </div>
    </div>
  );
};

export default World;