import { BuildingData, NPCData, Direction, CharacterStyles } from './types';

export const TILE_SIZE = 40; // Base unit for movement grid if we were using grid, but we are using pixel coordinates
export const GAME_WIDTH = 2000;
export const GAME_HEIGHT = 1500;
export const PLAYER_SPEED = 6; // Pixels per frame

// Visual Assets Configuration
export const BUILDINGS: BuildingData[] = [
  {
    id: 'cafe',
    name: 'Starbean Cafe',
    position: { x: 400, y: 300 },
    dimensions: { width: 300, height: 200 },
    color: 'bg-amber-100',
    type: 'CAFE',
    doorPosition: { x: 120, y: 180 }
  },
  {
    id: 'cinema',
    name: 'Galaxy Cinema',
    position: { x: 900, y: 250 },
    dimensions: { width: 350, height: 220 },
    color: 'bg-purple-200',
    type: 'CINEMA',
    doorPosition: { x: 150, y: 200 }
  },
  {
    id: 'boutique',
    name: 'Fashionista',
    position: { x: 450, y: 700 },
    dimensions: { width: 250, height: 180 },
    color: 'bg-pink-100',
    type: 'SHOP',
    doorPosition: { x: 100, y: 160 }
  },
  {
    id: 'fountain',
    name: 'Central Fountain',
    position: { x: 800, y: 600 },
    dimensions: { width: 160, height: 120 },
    color: 'bg-blue-100',
    type: 'FOUNTAIN'
  }
];

export const NPCS: NPCData[] = [
  {
    id: 'barista',
    name: 'Melisa',
    role: 'Cafe Owner',
    position: { x: 550, y: 520 },
    interactionRadius: 80,
    greeting: "Hi there! Need a coffee to boost your energy?",
    persona: "You are Melisa, a cheerful barista in the virtual city of San-AI-lika. You love coffee and gossip. Keep your responses short, bubbly, and use emojis. You know everything about the town.",
    style: { hairColor: 'bg-yellow-400', shirtColor: 'bg-green-400', pantsColor: 'bg-slate-700', skinColor: 'bg-orange-200' }
  },
  {
    id: 'artist',
    name: 'Can',
    role: 'Street Artist',
    position: { x: 900, y: 750 },
    interactionRadius: 80,
    greeting: "Yo! The vibe today is immaculate for some sketching.",
    persona: "You are Can, a cool, laid-back street artist. You use slang like 'dude', 'vibes', and 'lit'. You are passionate about art and hate boring grey walls.",
    style: { hairColor: 'bg-black', shirtColor: 'bg-red-500', pantsColor: 'bg-blue-600', skinColor: 'bg-amber-200' }
  },
  {
    id: 'guide',
    name: 'Professor Bit',
    role: 'City Guide',
    position: { x: 780, y: 550 }, // Near fountain
    interactionRadius: 80,
    greeting: "Greetings, traveler! I can answer any questions about this simulation.",
    persona: "You are Professor Bit, an old wise AI researcher who knows he is in a simulation. You are helpful but slightly cryptic. You speak formally.",
    style: { hairColor: 'bg-gray-200', shirtColor: 'bg-indigo-700', pantsColor: 'bg-gray-800', skinColor: 'bg-orange-300' }
  }
];

export const PLAYER_START_POS = { x: 700, y: 900 };

export const PLAYER_STYLE: CharacterStyles = {
  hairColor: 'bg-brown-600',
  shirtColor: 'bg-blue-500',
  pantsColor: 'bg-slate-800',
  skinColor: 'bg-orange-200'
};