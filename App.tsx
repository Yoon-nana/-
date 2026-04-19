import React, { useState, useMemo, useEffect } from 'react';
import { LEVEL1_ITEMS, LEVEL2_ITEMS, LEVEL3_ITEMS, getInitialLocations } from './constants';
import { ClassificationType, Location, LevelId, EmojiItem } from './types';
import { DraggableItem } from './components/DraggableItem';
import { DropBin } from './components/DropBin';
import { RefreshCcw, CheckCircle2, BrainCircuit, ArrowRight } from 'lucide-react';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const App: React.FC = () => {
  const [level, setLevel] = useState<LevelId>(1);
  const [items, setItems] = useState<EmojiItem[]>(LEVEL1_ITEMS);
  const [itemLocations, setItemLocations] = useState<Record<string, string>>(getInitialLocations(LEVEL1_ITEMS));
  const [dragOverBin, setDragOverBin] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: ClassificationType; message: string; detailMessage?: string } | null>(null);

  useEffect(() => {
    let newItems: EmojiItem[] = LEVEL1_ITEMS;
    if (level === 2) newItems = LEVEL2_ITEMS;
    if (level === 3) newItems = LEVEL3_ITEMS;
    
    // Shuffle items so they don't appear grouped by category/color in the pool
    const shuffledItems = shuffleArray<EmojiItem>(newItems);
    
    setItems(shuffledItems);
    setItemLocations(getInitialLocations(shuffledItems));
    setResult(null);
  }, [level]);

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.dataTransfer.setData('itemId', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, binId: string) => {
    e.preventDefault(); 
    if (dragOverBin !== binId) {
      setDragOverBin(binId);
    }
  };

  const handleDragLeave = () => {
    setDragOverBin(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetLocation: Location) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    setDragOverBin(null);

    if (itemId) {
      setItemLocations((prev) => ({
        ...prev,
        [itemId]: targetLocation,
      }));
    }
  };

  const calculatePurity = (binContents: EmojiItem[][], propertyGetter: (item: EmojiItem) => string | undefined) => {
    let matches = 0;
    const sortedItemCount = items.filter(i => itemLocations[i.id] !== 'pool').length;
    
    if (sortedItemCount === 0) return 0;

    binContents.forEach(binItems => {
        if (binItems.length === 0) return;
        const counts = binItems.reduce((acc, item) => {
            const val = propertyGetter(item);
            if (val) acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const maxCount = Math.max(...Object.values(counts));
        if (isFinite(maxCount)) {
           matches += maxCount;
        }
    });
    
    return matches / sortedItemCount;
  };

  const getFeedbackMessage = (type: ClassificationType): string => {
      switch (type) {
          case ClassificationType.BY_CATEGORY:
              return "음식, 동물, 사물! 종류별로 아주 잘 분류했어요. 컴퓨터도 이렇게 비슷한 성격을 가진 데이터끼리 묶는 '군집화(Clustering)'를 통해 세상을 이해한답니다.";
          case ClassificationType.BY_COLOR:
              return "빨강, 초록, 파랑! 색깔이라는 특징(Feature)을 아주 잘 포착했네요. 인공지능도 사물을 볼 때 가장 먼저 색깔 정보를 이용해서 비슷함을 판단하곤 해요.";
          case ClassificationType.BY_ENVIRONMENT:
              return "하늘, 땅, 바다! 친구들이 어디에 사는지 '환경'을 기준으로 나누었군요. 데이터의 맥락(Context)을 이해하는 아주 멋진 분류 방식이에요!";
          case ClassificationType.BY_WHEELS:
              return "바퀴의 개수라는 숨겨진 특징(Feature)을 찾아냈군요! 겉모습만 보는 게 아니라 구조적인 특징까지 파악하다니, 정말 훌륭한 데이터 과학자 같아요!";
          case ClassificationType.BY_SHAPE:
              return "동그라미, 네모, 하트! 모양이라는 기하학적 특징을 기준으로 나누었네요. 컴퓨터 비전(Computer Vision) 기술도 이렇게 모양을 인식해서 물체를 구별해요.";
          case ClassificationType.MIXED:
              return "재미있는 아이디어네요! 하지만 컴퓨터가 패턴을 더 쉽게 배울 수 있도록, '색깔'이나 '모양'처럼 한 가지 명확한 규칙을 정해서 다시 나누어볼까요?";
          case ClassificationType.EMPTY:
              return "상자가 비어있어요. 데이터를 모두 분류해주어야 컴퓨터가 학습할 수 있어요! 모든 아이템을 상자에 넣어주세요.";
          default:
              return "참 잘했어요! 자신만의 기준으로 데이터를 정리하는 능력은 인공지능 학습의 기초가 된답니다.";
      }
  };

  // Logic to verify how the child sorted the items
  const checkClassification = () => {
    const bins = ['bin1', 'bin2', 'bin3'];
    const binContents = bins.map(bin => 
      items.filter(item => itemLocations[item.id] === bin)
    );

    const emptyBins = binContents.filter(c => c.length === 0).length;
    if (emptyBins > 0) {
       setResult({
        type: ClassificationType.EMPTY,
        message: "분류가 완료되지 않았어요!",
        detailMessage: getFeedbackMessage(ClassificationType.EMPTY)
      });
      return;
    }

    let type = ClassificationType.MIXED;
    let message = "창의적인 분류네요! 하지만...";

    let candidates: { type: ClassificationType, score: number, message: string }[] = [];

    if (level === 1) {
        candidates = [
            { 
                type: ClassificationType.BY_CATEGORY, 
                score: calculatePurity(binContents, (i) => i.category), 
                message: "와우! 종류별로 묶었군요!" 
            },
            { 
                type: ClassificationType.BY_COLOR, 
                score: calculatePurity(binContents, (i) => i.color), 
                message: "대단해요! 색깔별로 모았군요!" 
            }
        ];
    } else if (level === 2) {
        candidates = [
            { 
                type: ClassificationType.BY_ENVIRONMENT, 
                score: calculatePurity(binContents, (i) => i.environment), 
                message: "멋져요! 활동 장소로 나누었군요!" 
            },
            { 
                type: ClassificationType.BY_WHEELS, 
                score: calculatePurity(binContents, (i) => i.wheelType), 
                message: "멋져요! 바퀴 수로 나누었군요!" 
            }
        ];
    } else if (level === 3) {
        candidates = [
             { 
                type: ClassificationType.BY_COLOR, 
                score: calculatePurity(binContents, (i) => i.color), 
                message: "퍼펙트! 색깔별로 분류했군요!" 
            },
            { 
                type: ClassificationType.BY_SHAPE, 
                score: calculatePurity(binContents, (i) => i.shape), 
                message: "창의적이에요! 모양별로 나누었군요!" 
            }
        ]
    }

    // Sort by score descending to find the best match
    candidates.sort((a, b) => b.score - a.score);
    const best = candidates[0];

    // Check if the best score meets the threshold
    if (best.score > 0.85) {
        type = best.type;
        message = best.message;
    }

    setResult({ 
        type, 
        message, 
        detailMessage: getFeedbackMessage(type) 
    });
  };

  const resetGame = () => {
    // Re-shuffle on reset as well
    const shuffledItems = shuffleArray<EmojiItem>(items);
    setItems(shuffledItems);
    setItemLocations(getInitialLocations(shuffledItems));
    setResult(null);
  };

  const nextLevel = () => {
      if (level < 3) {
        setLevel((prev) => (prev + 1) as LevelId);
      }
      setResult(null);
  };

  const poolItems = useMemo(() => items.filter(i => itemLocations[i.id] === 'pool'), [items, itemLocations]);
  const bin1Items = useMemo(() => items.filter(i => itemLocations[i.id] === 'bin1'), [items, itemLocations]);
  const bin2Items = useMemo(() => items.filter(i => itemLocations[i.id] === 'bin2'), [items, itemLocations]);
  const bin3Items = useMemo(() => items.filter(i => itemLocations[i.id] === 'bin3'), [items, itemLocations]);

  // Determine success state for "Next Level" button
  const isSuccess = result && result.type !== ClassificationType.MIXED && result.type !== ClassificationType.EMPTY;

  const getLevelDescription = () => {
    if (level === 1) return '색깔이나 종류를 잘 살펴보세요!';
    if (level === 2) return '어디서 타는지, 혹은 바퀴를 잘 살펴보세요!';
    if (level === 3) return '색깔이나 모양에 숨겨진 규칙을 찾아보세요!';
    return '';
  };

  const getLevelTitle = () => {
      if (level === 1) return '이모지 분류 놀이';
      if (level === 2) return '탈것 분류 놀이';
      if (level === 3) return '도형 색깔 놀이';
      return '';
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col h-full gap-6">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="flex justify-between items-center px-4">
             <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                <BrainCircuit size={18} />
                <span>AI 실험실</span>
             </div>
             <div className="text-sm font-bold text-slate-400">
                LEVEL {level} / 3
             </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {getLevelTitle()}
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto break-keep">
            이모지를 아래 상자로 드래그해보세요. 
            {getLevelDescription()}
             정답은 하나가 아니에요.
          </p>
        </header>

        {/* Game Area */}
        <main className="flex-1 flex flex-col gap-8">
          
          {/* Result Overlay / Message Area */}
          {result && (
            <div className={`
              p-6 rounded-2xl text-center shadow-lg border-2 animate-fade-in break-keep
              ${result.type === ClassificationType.EMPTY ? 'bg-amber-50 border-amber-200 text-amber-800' : 
                result.type === ClassificationType.MIXED ? 'bg-purple-50 border-purple-200 text-purple-800' : 
                'bg-green-50 border-green-200 text-green-800'}
            `}>
              <h2 className="text-2xl font-bold mb-2">{result.message}</h2>
              {result.detailMessage && (
                  <div className="mt-3 bg-white/60 p-4 rounded-xl text-lg font-medium break-keep">
                    <span className="text-2xl mr-2">🤖</span>
                    "{result.detailMessage}"
                  </div>
              )}
              
              {isSuccess && level < 3 && (
                  <button 
                    onClick={nextLevel}
                    className="mt-6 flex items-center justify-center gap-2 mx-auto px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow-md hover:bg-green-700 transition-colors"
                  >
                    <span>다음 단계 도전!</span>
                    <ArrowRight size={20} />
                  </button>
              )}
              {isSuccess && level === 3 && (
                  <div className="mt-6 text-xl font-bold text-indigo-600 animate-bounce">
                      🎉 모든 단계를 완료했어요! 훌륭해요! 🎉
                  </div>
              )}
            </div>
          )}

          {/* Bins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DropBin 
              id="bin1" 
              title="그룹 A" 
              isOver={dragOverBin === 'bin1'}
              onDrop={handleDrop} 
              onDragOver={(e) => handleDragOver(e, 'bin1')}
              onDragLeave={handleDragLeave}
            >
              {bin1Items.map(item => <DraggableItem key={item.id} item={item} onDragStart={handleDragStart} />)}
            </DropBin>
            
            <DropBin 
              id="bin2" 
              title="그룹 B" 
              isOver={dragOverBin === 'bin2'}
              onDrop={handleDrop} 
              onDragOver={(e) => handleDragOver(e, 'bin2')}
              onDragLeave={handleDragLeave}
            >
              {bin2Items.map(item => <DraggableItem key={item.id} item={item} onDragStart={handleDragStart} />)}
            </DropBin>

            <DropBin 
              id="bin3" 
              title="그룹 C" 
              isOver={dragOverBin === 'bin3'}
              onDrop={handleDrop} 
              onDragOver={(e) => handleDragOver(e, 'bin3')}
              onDragLeave={handleDragLeave}
            >
              {bin3Items.map(item => <DraggableItem key={item.id} item={item} onDragStart={handleDragStart} />)}
            </DropBin>
          </div>

          {/* Pool */}
          <div className={`
            bg-white p-6 rounded-3xl shadow-sm border border-slate-200 min-h-[160px] flex flex-col items-center gap-4 transition-all duration-500
            ${poolItems.length === 0 ? 'opacity-50 grayscale' : ''}
          `}>
             <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                남은 아이템 ({poolItems.length}개)
             </h3>
             <div className="flex flex-wrap gap-3 justify-center">
                {poolItems.map(item => (
                  <DraggableItem key={item.id} item={item} onDragStart={handleDragStart} />
                ))}
                {poolItems.length === 0 && (
                  <div className="text-slate-300 italic font-medium py-4">분류 끝! 아래 완료 버튼을 눌러보세요.</div>
                )}
             </div>
          </div>

        </main>

        {/* Footer / Controls */}
        <footer className="sticky bottom-4 md:bottom-8 flex justify-center gap-4 z-10">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-md font-bold text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all active:scale-95"
          >
            <RefreshCcw size={20} />
            <span>다시하기</span>
          </button>

          <button
            onClick={checkClassification}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 font-bold text-lg hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95 ring-4 ring-white"
          >
            <CheckCircle2 size={24} />
            <span>분류 완료!</span>
          </button>
        </footer>

      </div>
    </div>
  );
};

export default App;