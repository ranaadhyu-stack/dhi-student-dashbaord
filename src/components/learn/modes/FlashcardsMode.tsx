import { useState, useEffect, useMemo } from "react";
import { RotateCw, ThumbsUp, ThumbsDown, Leaf, Sun, Flame } from "lucide-react";

interface FlashcardsModeProps {
  onStart: () => void;
  onProgress: (progress: {
    current: number;
    total: number;
  }) => void;
  theme: 'light' | 'dark';
  cardCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  shuffle: boolean;
  onProgressUpdate: (progress: {
    reviewed: number;
    knowWell: number;
    needPractice: number;
  }) => void;
}

export function FlashcardsMode({
  onStart,
  onProgress,
  theme,
  cardCount,
  difficulty,
  shuffle,
  onProgressUpdate,
}: FlashcardsModeProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>(
    [],
  );

  // Different flashcard sets based on difficulty
  const allCardsByDifficulty = {
    Easy: [
      {
        front: "What is photosynthesis?",
        back: "The process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
      },
      {
        front: "Where does photosynthesis occur?",
        back: "Photosynthesis occurs in the chloroplasts of plant cells.",
      },
      {
        front: "What is chlorophyll?",
        back: "A green pigment found in chloroplasts that absorbs light energy for photosynthesis.",
      },
      {
        front: "What do plants need for photosynthesis?",
        back: "Plants need sunlight, water, and carbon dioxide.",
      },
      {
        front: "What do plants produce during photosynthesis?",
        back: "Plants produce oxygen and glucose (sugar) during photosynthesis.",
      },
    ],
    Medium: [
      {
        front: "What is the formula for photosynthesis?",
        back: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
      },
      {
        front: "What are the two stages of photosynthesis?",
        back: "The light-dependent reactions (light reactions) and the light-independent reactions (Calvin cycle).",
      },
      {
        front: "Where exactly does photosynthesis occur in plant cells?",
        back: "Photosynthesis occurs in the chloroplasts of plant cells, specifically in structures containing chlorophyll.",
      },
      {
        front: "What wavelengths of light does chlorophyll absorb?",
        back: "Chlorophyll primarily absorbs blue and red wavelengths of light, reflecting green light.",
      },
      {
        front: "What is the role of stomata in photosynthesis?",
        back: "Stomata are pores that allow CO₂ to enter the leaf and O₂ to exit during photosynthesis.",
      },
    ],
    Hard: [
      {
        front: "Explain the light-dependent reactions of photosynthesis.",
        back: "Light-dependent reactions occur in the thylakoid membranes where chlorophyll captures light energy to split water molecules, producing oxygen, ATP, and NADPH.",
      },
      {
        front: "Describe the Calvin cycle and its role in photosynthesis.",
        back: "The Calvin cycle uses ATP and NADPH from light reactions to fix CO₂ into organic molecules, producing glucose through carbon fixation, reduction, and regeneration phases.",
      },
      {
        front: "What is photophosphorylation?",
        back: "Photophosphorylation is the process of using light energy to synthesize ATP during the light-dependent reactions through chemiosmosis.",
      },
      {
        front: "Explain photorespiration and its effects on plant efficiency.",
        back: "Photorespiration occurs when RuBisCO binds oxygen instead of CO₂, reducing photosynthetic efficiency and producing no useful energy or sugars.",
      },
      {
        front: "How do C4 and CAM plants differ from C3 plants?",
        back: "C4 and CAM plants have evolved mechanisms to concentrate CO₂ and minimize photorespiration, making them more efficient in hot, dry conditions than C3 plants.",
      },
    ],
  };

  // Get cards for current difficulty
  const cards = allCardsByDifficulty[difficulty];

  // Shuffle helper function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Memoized card order based on shuffle state
  const orderedCards = useMemo(() => {
    return shuffle ? shuffleArray(cards) : cards;
  }, [difficulty, shuffle]); // Re-shuffle when difficulty or shuffle state changes

  const totalCards = orderedCards.length;

  useEffect(() => {
    onStart();
  }, [onStart]);

  // Reset all progress when card count changes
  useEffect(() => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  }, [cardCount]);

  // Reset all progress when difficulty changes
  useEffect(() => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  }, [difficulty]);

  // Reset all progress when shuffle changes
  useEffect(() => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  }, [shuffle]);

  useEffect(() => {
    onProgress({
      current: knownCards.length + unknownCards.length,
      total: cardCount,
    });
  }, [knownCards, unknownCards, onProgress, cardCount]);

  useEffect(() => {
    onProgressUpdate({
      reviewed: knownCards.length + unknownCards.length,
      knowWell: knownCards.length,
      needPractice: unknownCards.length,
    });
  }, [knownCards, unknownCards, onProgressUpdate]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    if (
      !knownCards.includes(currentCard) &&
      !unknownCards.includes(currentCard) &&
      knownCards.length + unknownCards.length < cardCount
    ) {
      setKnownCards([...knownCards, currentCard]);
    }
    handleNext();
  };

  const handleUnknown = () => {
    if (
      !unknownCards.includes(currentCard) &&
      !knownCards.includes(currentCard) &&
      knownCards.length + unknownCards.length < cardCount
    ) {
      setUnknownCards([...unknownCards, currentCard]);
    }
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  // Get border and glow styles based on difficulty
  const getDifficultyStyles = () => {
    switch (difficulty) {
      case 'Easy':
        return {
          borderColor: '#6BE685',
          boxShadow: '0 0 20px rgba(107, 230, 133, 0.3), 0 0 40px rgba(107, 230, 133, 0.15)'
        };
      case 'Medium':
        return {
          borderColor: '#F6D86F',
          boxShadow: '0 0 20px rgba(246, 216, 111, 0.3), 0 0 40px rgba(246, 216, 111, 0.15)'
        };
      case 'Hard':
        return {
          borderColor: '#FF7A7A',
          boxShadow: '0 0 20px rgba(255, 122, 122, 0.3), 0 0 40px rgba(255, 122, 122, 0.15)'
        };
      default:
        return {
          borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb',
          boxShadow: 'none'
        };
    }
  };

  const difficultyStyles = getDifficultyStyles();

  // Get difficulty icon
  const getDifficultyIcon = () => {
    const iconClass = `w-4 h-4 ${theme === 'dark' ? 'opacity-40' : 'opacity-50'}`;
    switch (difficulty) {
      case 'Easy':
        return <Leaf className={iconClass} style={{ color: '#6BE685' }} />;
      case 'Medium':
        return <Sun className={iconClass} style={{ color: '#F6D86F' }} />;
      case 'Hard':
        return <Flame className={iconClass} style={{ color: '#FF7A7A' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              Card {currentCard + 1} of {totalCards}
            </span>
            <span className="text-sm text-emerald-500">
              {knownCards.length + unknownCards.length} /{" "}
              {totalCards} Reviewed
            </span>
          </div>
          <div className={`h-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{
                width: `${((knownCards.length + unknownCards.length) / totalCards) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-8 perspective-1000">
          <div
            onClick={handleFlip}
            className={`relative h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} border-2 rounded-xl px-10 py-6 flex flex-col items-center justify-center backface-hidden ${
                isFlipped ? "invisible" : "visible"
              }`}
              style={{
                borderColor: difficultyStyles.borderColor,
                boxShadow: `${difficultyStyles.boxShadow}, 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)`
              }}
            >
              {/* Difficulty Icon */}
              <div className="absolute top-4 left-4">
                {getDifficultyIcon()}
              </div>
              
              <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center mb-6">
                <span className="text-2xl text-emerald-500">
                  ?
                </span>
              </div>
              <p className={`text-xl text-center mb-4 leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {orderedCards[currentCard].front}
              </p>
              <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                <RotateCw className="w-4 h-4" />
                <span>Click to reveal answer</span>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl px-10 py-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 ${
                isFlipped ? "visible" : "invisible"
              }`}
              style={{
                boxShadow: isFlipped ? `${difficultyStyles.boxShadow}, 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)` : 'none'
              }}
            >
              {/* Difficulty Icon */}
              <div className="absolute top-4 left-4 opacity-30">
                {getDifficultyIcon()}
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <ThumbsUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg text-white text-center leading-relaxed">
                {orderedCards[currentCard].back}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {isFlipped ? (
          <div className="flex gap-4">
            <button
              onClick={handleUnknown}
              className={`flex-1 px-6 py-4 ${theme === 'dark' ? 'bg-red-950/40 border-red-900/50 hover:bg-red-950/60 hover:border-red-800/60' : 'bg-red-50 border-red-200/60 hover:bg-red-100 hover:border-red-300/60'} border-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md`}
            >
              <ThumbsDown className="w-5 h-5 text-red-500" />
              <span className={theme === 'dark' ? 'text-red-200' : 'text-red-900'}>
                I Don't Know This
              </span>
            </button>
            <button
              onClick={handleKnown}
              className={`flex-1 px-6 py-4 ${theme === 'dark' ? 'bg-emerald-950/40 border-emerald-900/50 hover:bg-emerald-950/60 hover:border-emerald-800/60' : 'bg-emerald-50 border-emerald-200/60 hover:bg-emerald-100 hover:border-emerald-300/60'} border-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md`}
            >
              <ThumbsUp className="w-5 h-5 text-emerald-600" />
              <span className={theme === 'dark' ? 'text-emerald-200' : 'text-emerald-900'}>I Know This</span>
            </button>
          </div>
        ) : (
          <div className={`text-center text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
            Click the card to flip it and reveal the answer
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
              Know: {knownCards.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
              Practice: {unknownCards.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-400'}`} />
            <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
              Remaining:{" "}
              {totalCards -
                knownCards.length -
                unknownCards.length}
            </span>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `,
        }}
      />
    </div>
  );
}