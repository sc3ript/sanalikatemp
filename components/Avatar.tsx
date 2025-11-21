import React from 'react';
import { CharacterStyles, Direction } from '../types';

interface AvatarProps {
  name?: string;
  style: CharacterStyles;
  direction: Direction;
  isWalking: boolean;
  isNpc?: boolean;
  role?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, style, direction, isWalking, isNpc, role }) => {
  return (
    <div className="relative flex flex-col items-center justify-end h-[80px] w-[40px] pointer-events-none">
      {/* Name Tag */}
      <div className="absolute -top-8 flex flex-col items-center z-50 whitespace-nowrap">
         {isNpc && role && (
            <span className="text-[10px] font-bold text-yellow-600 bg-yellow-100 px-1 rounded shadow-sm mb-0.5 border border-yellow-200">
                {role}
            </span>
         )}
         {name && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full shadow-md border ${isNpc ? 'bg-white text-gray-800 border-gray-200' : 'bg-blue-600 text-white border-blue-700'}`}>
                {name}
            </span>
         )}
      </div>

      {/* Body Container - Scales on walk */}
      <div className={`relative transition-transform duration-150 ${isWalking ? 'scale-y-95 translate-y-1' : ''}`}>
        
        {/* Head */}
        <div className={`w-10 h-10 rounded-full ${style.skinColor} relative z-20 border-2 border-black/10 overflow-hidden`}>
           {/* Hair */}
           <div className={`absolute top-0 left-0 w-full h-4 ${style.hairColor}`}></div>
           {/* Eyes */}
           <div className="absolute top-4 left-2 flex gap-3">
              <div className={`w-1 h-1.5 bg-black rounded-full ${direction === Direction.RIGHT ? 'translate-x-1' : ''} transition-transform`}></div>
              <div className={`w-1 h-1.5 bg-black rounded-full ${direction === Direction.RIGHT ? 'translate-x-1' : ''} transition-transform`}></div>
           </div>
           {/* Mouth */}
           <div className="absolute top-7 left-3.5 w-2 h-0.5 bg-red-400 rounded-full opacity-60"></div>
        </div>

        {/* Torso */}
        <div className={`w-8 h-8 ${style.shirtColor} mx-auto -mt-1 rounded-t-lg relative z-10 border-x border-black/5 shadow-sm`}>
            {/* Arms */}
            <div className={`absolute top-1 -left-1 w-2 h-6 ${style.shirtColor} rounded-full origin-top ${isWalking ? 'animate-swing-left' : ''}`}>
                <div className={`absolute bottom-0 w-2 h-2 rounded-full ${style.skinColor}`}></div>
            </div>
            <div className={`absolute top-1 -right-1 w-2 h-6 ${style.shirtColor} rounded-full origin-top ${isWalking ? 'animate-swing-right' : ''}`}>
                 <div className={`absolute bottom-0 w-2 h-2 rounded-full ${style.skinColor}`}></div>
            </div>
        </div>

        {/* Legs */}
        <div className="flex justify-center -mt-1 gap-0.5">
            <div className={`w-3 h-8 ${style.pantsColor} rounded-b-md ${isWalking ? 'animate-walk-left' : ''}`}></div>
            <div className={`w-3 h-8 ${style.pantsColor} rounded-b-md ${isWalking ? 'animate-walk-right' : ''}`}></div>
        </div>

        {/* Shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/20 rounded-[100%] blur-[2px] z-0 translate-y-1"></div>
      </div>
    </div>
  );
};

export default Avatar;