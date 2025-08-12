'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Code, Sparkles } from 'lucide-react';

export function Header({ isLoading, selectedModel, stats }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getModelIcon = (model) => {
    if (model?.includes('gpt-4')) return <Sparkles className='w-4 h-4' />;
    if (model?.includes('code')) return <Code className='w-4 h-4' />;
    return <Zap className='w-4 h-4' />;
  };

  return (
    <div className='relative bg-slate-50/80 border-b border-slate-200/60 py-8'>
      {/* Very subtle pattern overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-white/40 to-transparent'></div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-6'>
        <div className='flex items-center justify-between'>
          {/* Left: Logo and Title */}
          <div
            className={`flex items-center gap-3 transition-all duration-600 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
            <div className='p-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/80 shadow-sm'>
              <Bot className='w-5 h-5 text-slate-600' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-800 leading-tight'>
                TokenStudio
              </h1>
            </div>
          </div>

          {/* Right: Status and Info */}
          <div
            className={`flex items-center gap-4 transition-all duration-600 delay-200 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
            {/* Status Indicator */}
            <div className='flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-lg border border-slate-200/60 shadow-sm'>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  !isLoading ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}></div>
              <span className='text-slate-700 text-sm font-medium'>
                {isLoading ? 'Loading...' : 'Ready'}
              </span>
            </div>

            {/* Model Badge */}
            {selectedModel && !isLoading && (
              <Badge className='bg-white/60 text-slate-700 border-slate-300/60 hover:bg-white/80 hover:border-slate-400/60 transition-colors shadow-sm'>
                {getModelIcon(selectedModel)}
                <span className='ml-1'>{selectedModel}</span>
              </Badge>
            )}

            {/* Stats */}
            {stats?.tokens > 0 && (
              <div className='flex items-center gap-3 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-lg border border-slate-200/60 shadow-sm'>
                <div className='flex items-center gap-1 text-slate-700 text-sm'>
                  <span className='font-medium'>{stats.tokens}</span>
                  <span className='text-slate-500'>tokens</span>
                </div>
                <div className='w-px h-3 bg-slate-300/60'></div>
                <div className='flex items-center gap-1 text-slate-700 text-sm'>
                  <span className='font-medium'>${stats.cost?.toFixed(4)}</span>
                  <span className='text-slate-500'>cost</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
