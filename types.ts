export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export enum EntityType {
  PLAYER = 'PLAYER',
  NPC = 'NPC',
  OBJECT = 'OBJECT',
}

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface CharacterStyles {
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  skinColor: string;
}

export interface NPCData {
  id: string;
  name: string;
  role: string; // e.g., "Barista", "Guide"
  position: Position;
  interactionRadius: number;
  persona: string; // System instruction for Gemini
  style: CharacterStyles;
  greeting: string;
}

export interface BuildingData {
  id: string;
  name: string;
  position: Position; // Top-left coordinate
  dimensions: Dimensions;
  color: string;
  doorPosition?: Position; // Relative to building top-left
  type: 'CAFE' | 'SHOP' | 'CINEMA' | 'HOUSE' | 'FOUNTAIN';
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  isPlayer: boolean;
  timestamp: number;
}

export interface GameState {
  playerPos: Position;
  playerTarget: Position | null;
  isMoving: boolean;
  playerName: string;
  activeNPC: NPCData | null; // The NPC currently being talked to
  direction: Direction;
}