export enum Category {
  FOOD = 'FOOD',
  ANIMAL = 'ANIMAL',
  OBJECT = 'OBJECT',
}

export enum ItemColor {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
}

export enum Environment {
  SKY = 'SKY',
  LAND = 'LAND',
  SEA = 'SEA'
}

export enum WheelType {
  NONE = 'NONE',
  TWO = 'TWO',
  MANY = 'MANY'
}

export enum Shape {
  CIRCLE = 'CIRCLE',
  SQUARE = 'SQUARE',
  HEART = 'HEART'
}

export interface EmojiItem {
  id: string;
  emoji: string;
  name: string;
  // Level 1 & 3 (Color is used in both)
  category?: Category;
  color?: ItemColor;
  // Level 2
  environment?: Environment;
  wheelType?: WheelType;
  // Level 3
  shape?: Shape;
}

export type Location = 'pool' | 'bin1' | 'bin2' | 'bin3';

export interface GameState {
  items: Record<string, Location>;
  isComplete: boolean;
  classificationResult: ClassificationType | null;
  score: number;
}

export enum ClassificationType {
  // Level 1
  BY_CATEGORY = 'BY_CATEGORY',
  BY_COLOR = 'BY_COLOR',
  // Level 2
  BY_ENVIRONMENT = 'BY_ENVIRONMENT',
  BY_WHEELS = 'BY_WHEELS',
  // Level 3
  BY_SHAPE = 'BY_SHAPE',
  
  MIXED = 'MIXED',
  EMPTY = 'EMPTY'
}

export type LevelId = 1 | 2 | 3;