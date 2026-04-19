import { Category, EmojiItem, ItemColor, Environment, WheelType, Shape } from './types';

export const LEVEL1_ITEMS: EmojiItem[] = [
  // RED
  { id: 'apple', emoji: '🍎', name: '사과', category: Category.FOOD, color: ItemColor.RED },
  { id: 'strawberry', emoji: '🍓', name: '딸기', category: Category.FOOD, color: ItemColor.RED },
  { id: 'crab', emoji: '🦀', name: '게', category: Category.ANIMAL, color: ItemColor.RED },
  { id: 'ladybug', emoji: '🐞', name: '무당벌레', category: Category.ANIMAL, color: ItemColor.RED },
  { id: 'car', emoji: '🚗', name: '자동차', category: Category.OBJECT, color: ItemColor.RED },
  { id: 'balloon', emoji: '🎈', name: '풍선', category: Category.OBJECT, color: ItemColor.RED },

  // GREEN
  { id: 'broccoli', emoji: '🥦', name: '브로콜리', category: Category.FOOD, color: ItemColor.GREEN },
  { id: 'avocado', emoji: '🥑', name: '아보카도', category: Category.FOOD, color: ItemColor.GREEN },
  { id: 'frog', emoji: '🐸', name: '개구리', category: Category.ANIMAL, color: ItemColor.GREEN },
  { id: 'crocodile', emoji: '🐊', name: '악어', category: Category.ANIMAL, color: ItemColor.GREEN },
  { id: 'book', emoji: '📗', name: '책', category: Category.OBJECT, color: ItemColor.GREEN },
  { id: 'vest', emoji: '🦺', name: '조끼', category: Category.OBJECT, color: ItemColor.GREEN },

  // BLUE
  { id: 'blueberries', emoji: '🫐', name: '블루베리', category: Category.FOOD, color: ItemColor.BLUE },
  { id: 'whale', emoji: '🐳', name: '고래', category: Category.ANIMAL, color: ItemColor.BLUE },
  { id: 'dolphin', emoji: '🐬', name: '돌고래', category: Category.ANIMAL, color: ItemColor.BLUE },
  { id: 'jeans', emoji: '👖', name: '청바지', category: Category.OBJECT, color: ItemColor.BLUE },
  { id: 'diamond', emoji: '💎', name: '다이아몬드', category: Category.OBJECT, color: ItemColor.BLUE },
];

export const LEVEL2_ITEMS: EmojiItem[] = [
  // 0 Wheels (Sky/Sea)
  { id: 'rocket', emoji: '🚀', name: '로켓', environment: Environment.SKY, wheelType: WheelType.NONE },
  { id: 'ufo', emoji: '🛸', name: 'UFO', environment: Environment.SKY, wheelType: WheelType.NONE },
  { id: 'plane', emoji: '✈️', name: '비행기', environment: Environment.SKY, wheelType: WheelType.NONE },
  { id: 'boat', emoji: '🛥️', name: '보트', environment: Environment.SEA, wheelType: WheelType.NONE },
  { id: 'sailboat', emoji: '⛵', name: '요트', environment: Environment.SEA, wheelType: WheelType.NONE },

  // 2 Wheels (Land)
  { id: 'bicycle', emoji: '🚲', name: '자전거', environment: Environment.LAND, wheelType: WheelType.TWO },
  { id: 'motorcycle', emoji: '🏍️', name: '오토바이', environment: Environment.LAND, wheelType: WheelType.TWO },
  { id: 'kickscooter', emoji: '🛴', name: '킥보드', environment: Environment.LAND, wheelType: WheelType.TWO },
  { id: 'scooter', emoji: '🛵', name: '스쿠터', environment: Environment.LAND, wheelType: WheelType.TWO },
  { id: 'mountainbike', emoji: '🚵', name: '산악자전거', environment: Environment.LAND, wheelType: WheelType.TWO },

  // 4+ Wheels (Land)
  { id: 'car2', emoji: '🚗', name: '자동차', environment: Environment.LAND, wheelType: WheelType.MANY },
  { id: 'bus', emoji: '🚌', name: '버스', environment: Environment.LAND, wheelType: WheelType.MANY },
  { id: 'truck', emoji: '🚚', name: '트럭', environment: Environment.LAND, wheelType: WheelType.MANY },
  { id: 'ambulance', emoji: '🚑', name: '구급차', environment: Environment.LAND, wheelType: WheelType.MANY },
  { id: 'taxi', emoji: '🚕', name: '택시', environment: Environment.LAND, wheelType: WheelType.MANY },
];

export const LEVEL3_ITEMS: EmojiItem[] = [
  // Constructed to allow sorting by Color (5 Red, 5 Green, 5 Blue) OR Shape (5 Circle, 5 Square, 5 Heart)
  
  // RED (2 Circles, 2 Squares, 1 Heart)
  { id: 'r-c-1', emoji: '🔴', name: '빨간 동그라미', color: ItemColor.RED, shape: Shape.CIRCLE },
  { id: 'r-c-2', emoji: '🔴', name: '빨간 동그라미', color: ItemColor.RED, shape: Shape.CIRCLE },
  { id: 'r-s-1', emoji: '🟥', name: '빨간 네모', color: ItemColor.RED, shape: Shape.SQUARE },
  { id: 'r-s-2', emoji: '🟥', name: '빨간 네모', color: ItemColor.RED, shape: Shape.SQUARE },
  { id: 'r-h-1', emoji: '♥️', name: '빨간 하트', color: ItemColor.RED, shape: Shape.HEART },

  // GREEN (1 Circle, 1 Square, 3 Hearts)
  { id: 'g-c-1', emoji: '🟢', name: '초록 동그라미', color: ItemColor.GREEN, shape: Shape.CIRCLE },
  { id: 'g-s-1', emoji: '🟩', name: '초록 네모', color: ItemColor.GREEN, shape: Shape.SQUARE },
  { id: 'g-h-1', emoji: '💚', name: '초록 하트', color: ItemColor.GREEN, shape: Shape.HEART },
  { id: 'g-h-2', emoji: '💚', name: '초록 하트', color: ItemColor.GREEN, shape: Shape.HEART },
  { id: 'g-h-3', emoji: '💚', name: '초록 하트', color: ItemColor.GREEN, shape: Shape.HEART },

  // BLUE (2 Circles, 2 Squares, 1 Heart)
  { id: 'b-c-1', emoji: '🔵', name: '파란 동그라미', color: ItemColor.BLUE, shape: Shape.CIRCLE },
  { id: 'b-c-2', emoji: '🔵', name: '파란 동그라미', color: ItemColor.BLUE, shape: Shape.CIRCLE },
  { id: 'b-s-1', emoji: '🟦', name: '파란 네모', color: ItemColor.BLUE, shape: Shape.SQUARE },
  { id: 'b-s-2', emoji: '🟦', name: '파란 네모', color: ItemColor.BLUE, shape: Shape.SQUARE },
  { id: 'b-h-1', emoji: '💙', name: '파란 하트', color: ItemColor.BLUE, shape: Shape.HEART },
];

export const getInitialLocations = (items: EmojiItem[]): Record<string, string> => {
  return items.reduce((acc, item) => {
    acc[item.id] = 'pool';
    return acc;
  }, {} as Record<string, string>);
};