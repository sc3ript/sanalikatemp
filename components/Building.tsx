import React from 'react';
import { BuildingData } from '../types';

interface BuildingProps {
  data: BuildingData;
}

const Building: React.FC<BuildingProps> = ({ data }) => {
  // We simulate depth by creating a "front" face and a "roof" using simple CSS borders and positioning
  // This is a "flat" representation but styled to look like a cutout.
  
  if (data.type === 'FOUNTAIN') {
      return (
          <div 
            className="absolute"
            style={{
                left: data.position.x,
                top: data.position.y,
                width: data.dimensions.width,
                height: data.dimensions.height,
                zIndex: Math.floor(data.position.y + data.dimensions.height)
            }}
          >
              <div className="w-full h-full relative flex items-center justify-center">
                   <div className="absolute bottom-0 w-full h-24 bg-blue-200 rounded-full border-4 border-white shadow-lg opacity-90"></div>
                   <div className="absolute bottom-8 w-3/4 h-16 bg-blue-300 rounded-full border-4 border-white/80 animate-pulse"></div>
                   <div className="absolute -top-10 text-4xl">⛲</div>
              </div>
          </div>
      )
  }

  return (
    <div
      className="absolute"
      style={{
        left: data.position.x,
        top: data.position.y,
        width: data.dimensions.width,
        height: data.dimensions.height,
        // Z-index is based on the BOTTOM of the building so players walk BEHIND it when above, and IN FRONT when below.
        zIndex: Math.floor(data.position.y + data.dimensions.height) 
      }}
    >
      {/* Building Container */}
      <div className="relative w-full h-full">
        
        {/* Main Structure Shadow */}
        <div className="absolute bottom-0 left-2 w-[98%] h-4 bg-black/20 rounded-full blur-md"></div>

        {/* Main Structure */}
        <div className={`absolute bottom-2 w-full h-[90%] ${data.color} rounded-xl border-b-8 border-black/10 shadow-xl overflow-hidden`}>
             
             {/* Roof/Awning effect */}
             <div className="w-full h-4 bg-black/5 mb-4"></div>
             
             {/* Windows */}
             <div className="flex justify-around px-4">
                <div className="w-16 h-16 bg-blue-200/60 border-4 border-white rounded-lg shadow-inner"></div>
                <div className="w-16 h-16 bg-blue-200/60 border-4 border-white rounded-lg shadow-inner"></div>
             </div>

             {/* Shop Sign */}
             <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-lg shadow-md border border-gray-100">
                <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">{data.name}</span>
             </div>
        </div>

        {/* Door */}
        {data.doorPosition && (
            <div 
                className="absolute bottom-4 w-16 h-24 bg-gray-800 rounded-t-lg border-4 border-white/50 shadow-inner flex items-center justify-center overflow-hidden group hover:bg-gray-700 transition-colors cursor-pointer"
                style={{ left: data.doorPosition.x }}
            >
                 <div className="w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
                 <div className="absolute w-2 h-2 bg-yellow-400 rounded-full right-2 top-12 shadow-sm group-hover:scale-110 transition-transform"></div>
            </div>
        )}

        {/* Decorative Roof Top */}
        <div className="absolute -top-4 left-0 w-full h-8 bg-white/40 rounded-t-xl transform skew-x-12 origin-bottom-left opacity-50"></div>
      </div>
    </div>
  );
};

export default Building;