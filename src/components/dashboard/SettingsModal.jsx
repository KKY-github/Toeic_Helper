import React, { useState } from 'react';
import { X, Target, Key, Save, Download, Upload, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { TARGET_SCORES } from '../../types/toeic';
import { StorageService } from '../../services/storageService';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  profile, 
  onUpdateProfile,
  onDataImported
}) {
  const [targetScore, setTargetScore] = useState(profile?.targetScore || 850);
  const [dailyTarget, setDailyTarget] = useState(profile?.dailyTarget || 20);
  
  const currentAi = StorageService.getAiSettings();
  const [provider, setProvider] = useState(currentAi.provider || 'gemini');
  const [apiKey, setApiKey] = useState(currentAi.apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({
      targetScore: parseInt(targetScore),
      dailyTarget: parseInt(dailyTarget)
    });

    StorageService.updateAiSettings({
      provider,
      apiKey: apiKey.trim()
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleExportData = () => {
    const data = StorageService.exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toeic_master_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        StorageService.importAllData(json);
        if (onDataImported) onDataImported();
        alert('성공적으로 데이터를 복원했습니다!');
        onClose();
      } catch (err) {
        alert('올바르지 않은 백업 파일입니다: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              학습 설정 및 AI Key 관리
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Target Score */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              🎯 목표 토익 점수
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TARGET_SCORES.map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setTargetScore(score)}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    targetScore === score
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {score}점
                </button>
              ))}
            </div>
          </div>

          {/* Daily Question Target */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              📅 일일 목표 풀이 문항 수
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 50].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDailyTarget(count)}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    dailyTarget === count
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {count}문제
                </button>
              ))}
            </div>
          </div>

          {/* AI Settings Section */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-500" />
                AI API Key 설정 (선택 사항)
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 로컬 브라우저에만 안전 보관
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              API Key가 없어도 앱에 내장된 방대한 토익 실전 데이터와 스마트 시뮬레이터로 100% 문제 생성 및 학습이 가능합니다. 개인 Google Gemini API Key를 등록하면 실시간 최신 LLM 생성을 직접 사용하실 수 있습니다.
            </p>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Google Gemini API Key 입력 (AIzaSy...)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              데이터 백업 및 복원
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-indigo-500" />
                백업 JSON 다운로드
              </button>
              <label className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-purple-500" />
                백업 파일 복원
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              닫기
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              {savedSuccess ? '저장 완료!' : '설정 저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
