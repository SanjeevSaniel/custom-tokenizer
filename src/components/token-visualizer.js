/**
 * ╭─────────────────────────────────────────────────────────────────╮
 * │                    🎨 Token Visualizer Component                │
 * │                                                                 │
 * │  Beautiful interactive visualization that transforms text       │
 * │  into colorful, hoverable token elements with detailed         │
 * │  analytics and insights.                                        │
 * ╰─────────────────────────────────────────────────────────────────╯
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Info } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════
 * 🌈 COMPONENT: TokenVisualizer
 * ═══════════════════════════════════════════════════════════════════
 *
 * Purpose: Creates an interactive, color-coded visualization of how
 *          text is broken down into tokens by AI models
 *
 * Features:
 *   • Color-coded token display with hover details
 *   • Special character visualization (spaces, newlines, tabs)
 *   • Comprehensive statistics dashboard
 *   • Detailed token analysis table
 *   • Cost estimation and efficiency metrics
 */
export function TokenVisualizer({ text, tokens, tokenizer, modelName }) {
  // ┌─────────────────────────────────────────────────────────────┐
  // │ 🛡️ Early Return Guards                                     │
  // └─────────────────────────────────────────────────────────────┘
  if (!tokenizer || !tokens.length) return null;

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🎨 UTILITY FUNCTION: getTokenColor                           ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Generates beautiful, distinct colors for token visualization:
   * • Cycles through a carefully chosen color palette
   * • Ensures good contrast and readability
   * • Provides hover effects for interactivity
   */
  const getTokenColor = (index) => {
    const colors = [
      'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
      'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
      'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
      'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200',
      'bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200',
    ];
    return colors[index % colors.length];
  };

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🎯 CORE FUNCTION: renderTokenBreakdown                       ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Creates the main interactive token visualization:
   * • Converts token IDs to readable text
   * • Makes invisible characters visible (spaces, newlines, tabs)
   * • Adds hover tooltips with token details
   * • Applies beautiful color coding and animations
   */
  const renderTokenBreakdown = () => {
    // 🔄 Convert token IDs to actual text representations
    const tokenTexts = tokens.map((tokenId) => tokenizer.getTokenText(tokenId));

    return tokenTexts.map((tokenText, index) => {
      const tokenId = tokens[index];

      return (
        <span
          key={index}
          className={`inline-block px-3 py-2 m-1 rounded-lg text-sm font-mono border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${getTokenColor(
            index,
          )}`}
          title={`Token ${index + 1}: "${tokenText}" (ID: ${tokenId})`}>
          {/* 👁️ Make special characters visible for better understanding */}
          {tokenText.replace(/\n/g, '↵').replace(/\t/g, '→').replace(/ /g, '␣')}
        </span>
      );
    });
  };

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 🎨 Main Component Render                                   │
  // └─────────────────────────────────────────────────────────────┘

  return (
    <Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <Eye className='w-5 h-5 text-blue-600' />
          <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Token Visualization
          </span>
          <Badge
            variant='outline'
            className='gap-1'>
            <Info className='w-3 h-3' />
            {modelName}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 🎨 Interactive Token Breakdown Display                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div>
          <label className='text-base font-semibold mb-4 flex items-center gap-2'>
            🎯 Interactive Token Breakdown
          </label>
          <div className='p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 to-white min-h-24'>
            <div className='flex flex-wrap leading-relaxed'>
              {renderTokenBreakdown()}
            </div>
          </div>
          <p className='text-sm text-gray-500 mt-3 flex items-center gap-2'>
            <Info className='w-4 h-4' />
            Hover tokens for details • ␣ = space, ↵ = newline, → = tab
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 📊 Enhanced Statistics Dashboard                           */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          {/* 📝 Character Count */}
          <div className='text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'>
            <div className='text-2xl font-bold text-blue-600'>
              {text.length}
            </div>
            <div className='text-sm text-blue-800 font-medium'>Characters</div>
          </div>

          {/* 🎯 Token Count */}
          <div className='text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'>
            <div className='text-2xl font-bold text-green-600'>
              {tokens.length}
            </div>
            <div className='text-sm text-green-800 font-medium'>Tokens</div>
          </div>

          {/* ⚡ Efficiency Ratio */}
          <div className='text-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors'>
            <div className='text-2xl font-bold text-purple-600'>
              {(tokens.length / text.length).toFixed(2)}
            </div>
            <div className='text-sm text-purple-800 font-medium'>
              Tokens/Char
            </div>
          </div>

          {/* 🔄 Unique Tokens */}
          <div className='text-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors'>
            <div className='text-2xl font-bold text-orange-600'>
              {new Set(tokens).size}
            </div>
            <div className='text-sm text-orange-800 font-medium'>Unique</div>
          </div>

          {/* 💰 Cost Estimation */}
          <div className='text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors'>
            <div className='text-2xl font-bold text-red-600'>
              ${((tokens.length * 0.0015) / 1000).toFixed(4)}
            </div>
            <div className='text-sm text-red-800 font-medium'>Est. Cost</div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 📋 Detailed Token Analysis Table                           */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div>
          <label className='text-base font-semibold mb-4 flex items-center gap-2'>
            🔍 Token Analysis
          </label>
          <div className='max-h-64 overflow-y-auto border-2 border-gray-200 rounded-xl'>
            <table className='w-full text-sm'>
              {/* 📋 Table Header */}
              <thead className='bg-gradient-to-r from-gray-100 to-gray-50 sticky top-0'>
                <tr>
                  <th className='px-4 py-3 text-left font-semibold text-gray-700'>
                    Index
                  </th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-700'>
                    Token ID
                  </th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-700'>
                    Token Text
                  </th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-700'>
                    Length
                  </th>
                </tr>
              </thead>

              {/* 📊 Table Body with Token Details */}
              <tbody>
                {tokens.map((tokenId, index) => {
                  const tokenText = tokenizer.getTokenText(tokenId);

                  return (
                    <tr
                      key={index}
                      className={`border-t ${
                        index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                      } hover:bg-blue-50/50 transition-colors`}>
                      {/* 🔢 Token Index */}
                      <td className='px-4 py-3 font-mono text-gray-600'>
                        {index}
                      </td>

                      {/* 🎯 Token ID */}
                      <td className='px-4 py-3 font-mono text-blue-600 font-medium'>
                        {tokenId}
                      </td>

                      {/* 📝 Token Text (escaped for visibility) */}
                      <td className='px-4 py-3 font-mono text-green-700'>
                        &quot;
                        {tokenText.replace(/\n/g, '\\n').replace(/\t/g, '\\t')}
                        &quot;
                      </td>

                      {/* 📏 Token Length */}
                      <td className='px-4 py-3 font-mono text-gray-500'>
                        {tokenText.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 💡 Cost Estimation Disclaimer                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <p className='text-xs text-gray-500 italic'>
          * Estimated cost based on GPT-3.5-turbo pricing ($0.0015/1K tokens)
        </p>
      </CardContent>
    </Card>
  );
}
