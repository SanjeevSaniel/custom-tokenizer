'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TiktokenWrapper } from '@/lib/tiktoken-wrapper';
import { TokenVisualizer } from './token-visualizer';
import { SAMPLE_TEXTS, TIKTOKEN_MODELS } from '@/lib/sample-data';
import {
  Copy,
  Trash2,
  Settings,
  FileText,
  BarChart3,
  Activity,
  DollarSign,
  Hash,
  Target,
} from 'lucide-react';
import { Header } from './header';

export function TokenizerInterface() {
  const [tokenizer, setTokenizer] = useState(null);
  const [inputText, setInputText] = useState('');
  const [encodedTokens, setEncodedTokens] = useState([]);
  const [decodedText, setDecodedText] = useState('');
  const [selectedSample, setSelectedSample] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const tokenizerRef = useRef(null);
  const isInitializing = useRef(false);

  // ... (keep all existing methods unchanged)
  const initializeTokenizer = async (modelName) => {
    if (isInitializing.current) return;

    isInitializing.current = true;
    setIsLoading(true);

    try {
      if (tokenizerRef.current) {
        tokenizerRef.current.free();
        tokenizerRef.current = null;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const newTokenizer = new TiktokenWrapper(modelName);
      tokenizerRef.current = newTokenizer;
      setTokenizer(newTokenizer);
    } catch (error) {
      console.error('Failed to initialize tokenizer:', error);
    } finally {
      setIsLoading(false);
      isInitializing.current = false;
    }
  };

  useEffect(() => {
    initializeTokenizer(selectedModel);

    return () => {
      if (tokenizerRef.current) {
        tokenizerRef.current.free();
        tokenizerRef.current = null;
      }
    };
  }, [selectedModel]);

  const calculateStats = (text, tokens) => {
    const uniqueTokens = new Set(tokens).size;
    const compressionRatio = tokens.length / text.length;
    const estimatedCost = (tokens.length * 0.03) / 1000;

    return {
      characters: text.length,
      tokens: tokens.length,
      unique: uniqueTokens,
      compression: compressionRatio,
      cost: estimatedCost,
    };
  };

  const handleEncode = (text) => {
    if (!tokenizer || !text.trim()) {
      setEncodedTokens([]);
      setDecodedText('');
      setStats({});
      return;
    }

    try {
      const tokens = tokenizer.encode(text);
      setEncodedTokens(tokens);

      const decoded = tokenizer.decode(tokens);
      setDecodedText(decoded);

      const newStats = calculateStats(text, tokens);
      setStats(newStats);
    } catch (error) {
      console.error('Encoding failed:', error);
      setEncodedTokens([]);
      setDecodedText('');
      setStats({});
    }
  };

  const handleSampleSelect = (sampleKey) => {
    setSelectedSample(sampleKey);
    const sampleText = SAMPLE_TEXTS[sampleKey] || '';
    setInputText(sampleText);
    handleEncode(sampleText);
  };

  const handleModelChange = (newModel) => {
    if (newModel !== selectedModel) {
      setSelectedModel(newModel);
      setInputText('');
      setEncodedTokens([]);
      setDecodedText('');
      setSelectedSample('');
      setStats({});
    }
  };

  const handleClear = () => {
    setInputText('');
    setSelectedSample('');
    setEncodedTokens([]);
    setDecodedText('');
    setStats({});
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30'>
      <Header
        isLoading={isLoading}
        selectedModel={selectedModel}
        stats={stats}
      />

      <div className='container mx-auto px-6 py-6 -mt-4 relative z-20'>
        {/* Top Row: Controls and Input - Better responsive layout */}
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6'>
          {/* Controls - Spans 1 column on XL, full width on smaller screens */}
          <Card className='xl:col-span-1 border-0 shadow-md bg-white/90 backdrop-blur-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Settings className='w-4 h-4 text-purple-600' />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0 space-y-3'>
              <div>
                <label className='text-xs font-medium text-gray-600 mb-1 block'>
                  Model
                </label>
                <Select
                  onValueChange={handleModelChange}
                  value={selectedModel}
                  disabled={isLoading}>
                  <SelectTrigger className='w-full h-8 text-sm'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TIKTOKEN_MODELS).map(([key, name]) => (
                      <SelectItem
                        key={key}
                        value={key}
                        className='text-sm'>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='text-xs font-medium text-gray-600 mb-1 block'>
                  Sample
                </label>
                <div className='flex gap-2'>
                  <Select
                    onValueChange={handleSampleSelect}
                    value={selectedSample}
                    disabled={isLoading}>
                    <SelectTrigger className='flex-1 h-8 text-sm'>
                      <SelectValue placeholder='Choose...' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(SAMPLE_TEXTS).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className='text-sm'>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleClear}
                    variant='outline'
                    size='sm'
                    className='h-8 px-2'
                    disabled={isLoading}>
                    <Trash2 className='w-3 h-3' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input - Spans 3 columns on XL, full width on smaller screens */}
          <Card className='xl:col-span-3 border-0 shadow-md bg-white/90 backdrop-blur-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <FileText className='w-4 h-4 text-blue-600' />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <Textarea
                placeholder='Enter your text here or select a sample...'
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  handleEncode(e.target.value);
                }}
                className='min-h-24 resize-none text-sm border-2 focus:border-blue-400 transition-colors'
                disabled={isLoading}
              />
            </CardContent>
          </Card>
        </div>

        {/* Stats Row - Better organized metrics */}
        {!isLoading && inputText.trim() && encodedTokens.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6'>
            {[
              {
                value: stats.characters,
                label: 'Characters',
                icon: <Hash className='w-4 h-4' />,
                color: 'blue',
                description: 'Input length',
              },
              {
                value: stats.tokens,
                label: 'Tokens',
                icon: <Target className='w-4 h-4' />,
                color: 'green',
                description: 'Token count',
              },
              {
                value: stats.unique,
                label: 'Unique',
                icon: <Activity className='w-4 h-4' />,
                color: 'purple',
                description: 'Distinct tokens',
              },
              {
                value: stats.compression?.toFixed(3) || '0.000',
                label: 'Ratio',
                icon: <BarChart3 className='w-4 h-4' />,
                color: 'orange',
                description: 'Compression ratio',
              },
              {
                value: `$${stats.cost?.toFixed(5) || '0.00000'}`,
                label: 'Cost',
                icon: <DollarSign className='w-4 h-4' />,
                color: 'red',
                description: 'Estimated API cost',
              },
            ].map((stat, index) => (
              <Card
                key={stat.label}
                className={`text-center border-0 shadow-md bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/80 hover:from-${stat.color}-100 hover:to-${stat.color}-200/80 transition-all duration-300 hover:scale-[1.02] cursor-help`}
                title={stat.description}>
                <CardContent className='p-3'>
                  <div className='flex items-center justify-center gap-2 mb-1'>
                    <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                    <div className={`text-lg font-bold text-${stat.color}-700`}>
                      {stat.value}
                    </div>
                  </div>
                  <div className={`text-xs text-${stat.color}-600 font-medium`}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Row - Improved responsive grid */}
        {!isLoading && inputText.trim() && encodedTokens.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
            {/* Encoding - 2 columns on large screens */}
            <Card className='lg:col-span-2 border-0 shadow-md bg-white/90 backdrop-blur-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base flex items-center justify-between'>
                  <span className='flex items-center gap-2'>
                    <BarChart3 className='w-4 h-4 text-green-600' />
                    Token Encoding
                    <Badge
                      variant='secondary'
                      className='ml-2 text-xs'>
                      {encodedTokens.length} tokens
                    </Badge>
                  </span>
                  <Button
                    onClick={() => copyToClipboard(encodedTokens.join(', '))}
                    variant='ghost'
                    size='sm'
                    className='h-7 px-2'>
                    <Copy className='w-3 h-3' />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='p-3 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-md border max-h-32 overflow-y-auto'>
                  <code className='text-xs font-mono text-gray-700 leading-relaxed break-all'>
                    {encodedTokens.join(', ')}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Decoding - 1 column on large screens */}
            <Card className='lg:col-span-1 border-0 shadow-md bg-white/90 backdrop-blur-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>
                  <span className='flex items-center gap-2 mb-2'>
                    Verification
                  </span>
                  <Badge
                    variant={
                      inputText === decodedText ? 'default' : 'destructive'
                    }
                    className='text-xs'>
                    {inputText === decodedText
                      ? '✓ Perfect Match'
                      : '✗ Decoding Error'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='p-3 bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-md border max-h-32 overflow-y-auto'>
                  <div className='text-xs text-gray-700 leading-relaxed'>
                    {decodedText || 'No decoded text available'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Token Visualization - Full width */}
        {!isLoading && encodedTokens.length > 0 && tokenizer && (
          <TokenVisualizer
            text={inputText}
            tokens={encodedTokens}
            tokenizer={tokenizer}
            modelName={selectedModel}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className='border-0 shadow-md bg-white/90 backdrop-blur-sm'>
            <CardContent className='p-8 text-center'>
              <div className='flex items-center justify-center gap-3'>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600'></div>
                <span className='text-gray-600 font-medium'>
                  Initializing tokenizer...
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
