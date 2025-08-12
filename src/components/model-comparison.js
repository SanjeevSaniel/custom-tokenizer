'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TIKTOKEN_MODELS } from '@/lib/sample-data';
import { TiktokenWrapper } from '@/lib/tiktoken-wrapper';
import { GitCompare } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ModelComparison({ currentText }) {
  const [comparisons, setComparisons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentText && currentText.trim()) {
      compareModels(currentText);
    }
  }, [currentText]);

  const compareModels = async (text) => {
    if (!text.trim()) return;

    setIsLoading(true);
    const results = [];

    for (const [modelKey, modelName] of Object.entries(TIKTOKEN_MODELS)) {
      try {
        const tokenizer = new TiktokenWrapper(modelKey);
        const tokens = tokenizer.encode(text);
        const estimatedCost = (tokens.length * 0.03) / 1000; // Approximate cost

        results.push({
          model: modelKey,
          name: modelName,
          tokenCount: tokens.length,
          efficiency: tokens.length / text.length,
          cost: estimatedCost,
          encoding: tokenizer.getModelName(),
        });

        tokenizer.free();
      } catch (error) {
        console.error(`Failed to test ${modelKey}:`, error);
      }
    }

    setComparisons(results.sort((a, b) => a.tokenCount - b.tokenCount));
    setIsLoading(false);
  };

  if (!currentText || !currentText.trim()) {
    return (
      <Card className='border-0 shadow-xl bg-white/80 backdrop-blur-sm'>
        <CardContent className='p-12 text-center'>
          <GitCompare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <p className='text-gray-500 text-lg'>
            Enter text in the tokenizer to compare models
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-0 shadow-xl bg-white/80 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <GitCompare className='w-5 h-5 text-purple-600' />
          Model Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='text-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4'></div>
            <p className='text-gray-500'>Comparing models...</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {comparisons.map((comp, index) => (
              <div
                key={comp.model}
                className='flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                    ${
                      index === 0
                        ? 'bg-green-500'
                        : index === 1
                        ? 'bg-blue-500'
                        : 'bg-gray-500'
                    }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className='font-semibold text-gray-800'>
                      {comp.name}
                    </div>
                    <div className='text-sm text-gray-500'>{comp.encoding}</div>
                  </div>
                </div>
                <div className='flex items-center gap-6'>
                  <div className='text-center'>
                    <div className='text-lg font-bold text-blue-600'>
                      {comp.tokenCount}
                    </div>
                    <div className='text-xs text-gray-500'>tokens</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-lg font-bold text-orange-600'>
                      {comp.efficiency.toFixed(3)}
                    </div>
                    <div className='text-xs text-gray-500'>ratio</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-lg font-bold text-red-600'>
                      ${comp.cost.toFixed(4)}
                    </div>
                    <div className='text-xs text-gray-500'>cost</div>
                  </div>
                  {index === 0 && (
                    <Badge
                      variant='default'
                      className='bg-green-500'>
                      Most Efficient
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
