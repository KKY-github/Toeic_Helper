import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Globe, FileText } from 'lucide-react';
import { ttsService } from '../../services/ttsService';

export default function AudioPlayer({
  text,
  label = '듣기 음성 재생',
  accent = 'us',
  rate = 1.0,
  autoPlay = false,
  onWordClick,
  transcriptText = null,
  showScriptButton = true,
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(rate);
  const [selectedAccent, setSelectedAccent] = useState(accent);
  const [isLooping, setIsLooping] = useState(false);
  const [showScript, setShowScript] = useState(false);

  useEffect(() => {
    // Reset audio state when text changes
    ttsService.stop();
    setIsPlaying(false);

    if (autoPlay && text) {
      handlePlay();
    }

    return () => {
      ttsService.stop();
    };
  }, [text]);

  const handlePlay = () => {
    if (!text) return;

    if (isPlaying) {
      ttsService.pause();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    ttsService.speak({
      text,
      rate: playbackRate,
      accent: selectedAccent,
      onStart: () => setIsPlaying(true),
      onEnd: () => {
        if (isLooping) {
          setTimeout(() => handlePlay(), 600);
        } else {
          setIsPlaying(false);
        }
      },
      onError: () => setIsPlaying(false),
    });
  };

  const handleStop = () => {
    ttsService.stop();
    setIsPlaying(false);
  };

  const handleRateChange = (newRate) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      ttsService.stop();
      setTimeout(() => {
        ttsService.speak({
          text,
          rate: newRate,
          accent: selectedAccent,
          onStart: () => setIsPlaying(true),
          onEnd: () => {
            if (isLooping) setTimeout(() => handlePlay(), 600);
            else setIsPlaying(false);
          },
          onError: () => setIsPlaying(false),
        });
      }, 50);
    }
  };

  const handleAccentChange = (newAccent) => {
    setSelectedAccent(newAccent);
    if (isPlaying) {
      ttsService.stop();
      setTimeout(() => {
        ttsService.speak({
          text,
          rate: playbackRate,
          accent: newAccent,
          onStart: () => setIsPlaying(true),
          onEnd: () => {
            if (isLooping) setTimeout(() => handlePlay(), 600);
            else setIsPlaying(false);
          },
          onError: () => setIsPlaying(false),
        });
      }, 50);
    }
  };

  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/40 dark:from-slate-800/80 dark:via-slate-850 dark:to-indigo-950/40 border border-indigo-100/80 dark:border-slate-700/80 shadow-sm ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Play / Pause / Replay Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlay}
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md transition transform active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25 ring-4 ring-amber-400/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
            }`}
            title={isPlaying ? '일시 정지' : '듣기 재생'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleStop}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition"
            title="처음부터 다시 듣기"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Audio Wave Visualizer Animation */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-700/70">
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-indigo-600 dark:text-indigo-400 animate-pulse' : 'text-slate-400'}`} />
            <div className="flex items-end gap-0.5 h-4 w-12">
              {[40, 90, 60, 100, 50, 75].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(25, (h * ((i + 1) % 3 + 1)) % 100)}%` : '20%',
                    animation: isPlaying ? `pulse 0.${6 + i * 2}s infinite alternate` : 'none'
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 ml-1">
              {label}
            </span>
          </div>
        </div>

        {/* Speed Controls (0.75x ~ 1.5x) */}
        <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-900/70 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          {[0.75, 1.0, 1.25, 1.5].map((rateValue) => (
            <button
              key={rateValue}
              onClick={() => handleRateChange(rateValue)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                playbackRate === rateValue
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {rateValue}x
            </button>
          ))}
        </div>

        {/* Accent Selector (US, UK, AU) */}
        <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-900/70 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {[
            { id: 'us', label: '🇺🇸 미국' },
            { id: 'gb', label: '🇬🇧 영국' },
            { id: 'au', label: '🇦🇺 호주' }
          ].map((acc) => (
            <button
              key={acc.id}
              onClick={() => handleAccentChange(acc.id)}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition ${
                selectedAccent === acc.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {acc.label}
            </button>
          ))}
        </div>

        {/* Loop & Script Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-1 ${
              isLooping
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="구간 반복 재생"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isLooping ? 'text-indigo-600' : ''}`} />
            반복
          </button>

          {showScriptButton && transcriptText && (
            <button
              onClick={() => setShowScript(!showScript)}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-1 ${
                showScript
                  ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {showScript ? '스크립트 숨기기' : '스크립트 보기'}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Script View with Word Click Lookup */}
      {showScript && transcriptText && (
        <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl">
          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1 flex items-center justify-between">
            <span>TRANSCRIPT (단어를 클릭하면 바로 단어장에 추가할 수 있습니다)</span>
          </div>
          <div className="space-y-1.5 leading-relaxed">
            {typeof transcriptText === 'string' ? (
              <p>{transcriptText}</p>
            ) : (
              Object.entries(transcriptText).map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{key}:</span>
                  <span>{val}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
