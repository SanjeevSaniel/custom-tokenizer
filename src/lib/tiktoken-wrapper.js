/**
 * ╭─────────────────────────────────────────────────────────────────╮
 * │                    🔧 TikToken Wrapper Class                   │
 * │                                                                 │
 * │  Elegant abstraction layer for OpenAI's tiktoken library      │
 * │  providing consistent tokenization across different AI models. │
 * ╰─────────────────────────────────────────────────────────────────╯
 */

import { getEncoding, encodingForModel } from 'js-tiktoken';

/**
 * ═══════════════════════════════════════════════════════════════════
 * 🎛️ CLASS: TiktokenWrapper
 * ═══════════════════════════════════════════════════════════════════
 *
 * Purpose: Provides a clean, consistent interface for tokenization
 *          operations across different OpenAI models
 *
 * Features:
 *   • Automatic model detection and fallback handling
 *   • Memory-safe resource management
 *   • Consistent API across all supported models
 *   • Graceful error handling and logging
 *   • Efficient encoding/decoding operations
 */
export class TiktokenWrapper {
  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🚀 CONSTRUCTOR: Initialize Tokenizer                         ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Creates a new tokenizer instance for the specified model.
   * Implements intelligent fallback strategy for unsupported models.
   *
   * @param {string} modelName - Target AI model identifier
   *                           (e.g., 'gpt-4', 'gpt-3.5-turbo')
   */
  constructor(modelName = 'gpt-3.5-turbo') {
    try {
      // ┌─────────────────────────────────────────────────────────┐
      // │ 🎯 Primary Strategy: Model-Specific Encoding           │
      // └─────────────────────────────────────────────────────────┘
      // Attempt to get the exact encoding for the requested model
      this.encoding = encodingForModel(modelName);
      this.modelName = modelName;
    } catch (error) {
      // ┌─────────────────────────────────────────────────────────┐
      // │ 🛡️ Fallback Strategy: Universal Base Encoding          │
      // └─────────────────────────────────────────────────────────┘
      console.warn(
        `⚠️ Model ${modelName} not found, falling back to cl100k_base`,
      );

      // Use the most common base encoding as fallback
      // cl100k_base is used by GPT-4, GPT-3.5-turbo, and text-embedding models
      this.encoding = getEncoding('cl100k_base');
      this.modelName = 'cl100k_base';
    }
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 📝 METHOD: encode - Text to Tokens                           ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Converts input text into an array of token IDs.
   *
   * @param {string} text - Input text to tokenize
   * @returns {number[]} Array of token IDs
   */
  encode(text) {
    // 🛡️ Handle empty/null input gracefully
    if (!text) return [];

    // 🔄 Convert Uint32Array to regular array for easier manipulation
    return Array.from(this.encoding.encode(text));
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🔄 METHOD: decode - Tokens to Text                           ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Converts an array of token IDs back into readable text.
   *
   * @param {number[]} tokens - Array of token IDs to decode
   * @returns {string} Reconstructed text
   */
  decode(tokens) {
    // 🛡️ Validate input format
    if (!Array.isArray(tokens)) return '';

    // 🔄 Convert to Uint32Array as required by tiktoken
    return this.encoding.decode(new Uint32Array(tokens));
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🔍 METHOD: getTokenText - Single Token Analysis              ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Retrieves the text representation of a single token ID.
   * Useful for token-by-token analysis and visualization.
   *
   * @param {number} tokenId - Individual token ID to decode
   * @returns {string} Text representation of the token
   */
  getTokenText(tokenId) {
    try {
      // 🎯 Decode single token for inspection
      return this.encoding.decode(new Uint32Array([tokenId]));
    } catch (error) {
      // 🚫 Return placeholder for invalid/unknown tokens
      return '<|unknown|>';
    }
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 📊 METHOD: getVocabSize - Vocabulary Information             ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Returns the approximate vocabulary size for the current model.
   * Note: This is an approximation as exact vocab sizes vary.
   *
   * @returns {number} Approximate vocabulary size
   */
  getVocabSize() {
    // 📏 Standard vocab size for most OpenAI models
    return 100000; // Approximate vocab size
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🏷️ METHOD: getModelName - Model Identification               ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Returns the actual model/encoding name being used.
   * Useful for debugging and display purposes.
   *
   * @returns {string} Current model or encoding name
   */
  getModelName() {
    return this.modelName;
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🧹 METHOD: free - Resource Cleanup                          ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Properly releases tokenizer resources to prevent memory leaks.
   * Should be called when the tokenizer is no longer needed.
   *
   * Critical for applications that create many tokenizer instances.
   */
  free() {
    // 🧹 Clean up encoding resources if available
    if (this.encoding && this.encoding.free) {
      this.encoding.free();
    }
  }
}
