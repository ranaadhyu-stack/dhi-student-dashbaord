import { useState, useEffect } from 'react';
import { Maximize2, RotateCw, ZoomIn, ZoomOut, Info, MessageSquare } from 'lucide-react';

interface ThreeDModeProps {
  onStart: () => void;
  onProgress: (progress: { current: number; total: number }) => void;
  theme: 'light' | 'dark';
}

interface Hotspot {
  id: number;
  label: string;
  x: number;
  y: number;
  explanation: string;
}

export function ThreeDMode({ onStart, onProgress, theme }: ThreeDModeProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [exploredHotspots, setExploredHotspots] = useState<Set<number>>(new Set());
  const [rotation, setRotation] = useState(0);
  const [query, setQuery] = useState('');
  const [has3DContent] = useState(true); // Set to false to show "no content" message

  const hotspots: Hotspot[] = [
    { id: 1, label: 'Chloroplast', x: 45, y: 35, explanation: 'The organelle where photosynthesis takes place' },
    { id: 2, label: 'Thylakoid', x: 40, y: 50, explanation: 'Membrane-bound compartments where light reactions occur' },
    { id: 3, label: 'Stroma', x: 55, y: 45, explanation: 'Fluid-filled space where the Calvin cycle happens' },
    { id: 4, label: 'Granum', x: 50, y: 60, explanation: 'Stack of thylakoids where chlorophyll is concentrated' },
  ];

  const totalHotspots = hotspots.length;

  useEffect(() => {
    onStart();
  }, [onStart]);

  useEffect(() => {
    onProgress({ current: exploredHotspots.size, total: totalHotspots });
  }, [exploredHotspots, onProgress, totalHotspots]);

  const handleHotspotClick = (id: number) => {
    setSelectedHotspot(id);
    setExploredHotspots(new Set([...exploredHotspots, id]));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!has3DContent) {
    return (
      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl w-full text-center">
          <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-6">
              <Info className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-white mb-3">No 3D Content Available</h3>
            <p className="text-zinc-400 mb-6">
              This lesson doesn't currently have a 3D visualization. Try another learning mode or check back later.
            </p>
            <button className="px-6 py-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 transition-all duration-300">
              Switch Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">3D Model: Plant Cell Structure</h2>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 transition-all duration-300 flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Reset View
            </button>
            <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300">
              <ZoomOut className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300">
              <ZoomIn className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300">
              <Maximize2 className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative">
          {/* Simulated 3D Object */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Placeholder 3D representation */}
              <div
                className="absolute inset-0 rounded-full border-4 border-emerald-600/20 flex items-center justify-center"
                style={{
                  transform: `rotateY(${rotation}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-emerald-600/30 to-emerald-700/30 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white mb-2">Plant Cell</p>
                    <p className="text-sm text-zinc-400">Interactive 3D Model</p>
                  </div>
                </div>
              </div>

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => handleHotspotClick(hotspot.id)}
                  className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                    selectedHotspot === hotspot.id
                      ? 'bg-emerald-600 scale-125'
                      : exploredHotspots.has(hotspot.id)
                      ? 'bg-emerald-600/50 hover:bg-emerald-600 hover:scale-110'
                      : 'bg-zinc-700 hover:bg-zinc-600 hover:scale-110'
                  }`}
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span className="text-white text-xs">{hotspot.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Panel */}
          {selectedHotspot && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="p-4 bg-zinc-950 border border-zinc-700 rounded-xl backdrop-blur-sm">
                <h4 className="text-white mb-2">
                  {hotspots.find((h) => h.id === selectedHotspot)?.label}
                </h4>
                <p className="text-sm text-zinc-400">
                  {hotspots.find((h) => h.id === selectedHotspot)?.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-6 left-6">
            <div className="px-4 py-2 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-400">
                Click hotspots to explore • Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>
        </div>

        {/* Query Box */}
        <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-zinc-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Explain this part..."
              className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-all duration-300"
            />
            <button className="px-6 py-2 bg-emerald-600 rounded-xl text-sm text-white hover:bg-emerald-500 transition-all duration-300">
              Ask
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <span>
            Explored {exploredHotspots.size} / {totalHotspots} hotspots
          </span>
        </div>
      </div>
    </div>
  );
}
