/**
 * ╭─────────────────────────────────────────────────────────────────╮
 * │                   🎓 Custom Tokenizer Implementation           │
 * │                                                                 │
 * │  Educational BPE (Byte-Pair Encoding) tokenizer built from     │
 * │  scratch to demonstrate tokenization concepts and algorithms.  │
 * ╰─────────────────────────────────────────────────────────────────╯
 */

/**
 * ═══════════════════════════════════════════════════════════════════
 * 🏗️ CLASS: CustomTokenizer
 * ═══════════════════════════════════════════════════════════════════
 *
 * Purpose: Educational implementation of Byte-Pair Encoding (BPE)
 *          to demonstrate how modern tokenizers work internally
 *
 * Features:
 *   • Character-level initialization
 *   • Iterative vocabulary building through BPE
 *   • Special token handling
 *   • Training from custom text corpora
 *   • Encoding/decoding with fallback handling
 *
 * Note: This is a simplified educational version. Production
 *       tokenizers use more sophisticated techniques.
 */
export class CustomTokenizer {
  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🚀 CONSTRUCTOR: Initialize Empty Tokenizer                   ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Sets up the basic data structures needed for tokenization:
   * • Vocabulary mapping (token -> ID)
   * • Merge rules for BPE algorithm
   * • Special tokens for handling edge cases
   * • Decoder for reverse mapping (ID -> token)
   */
  constructor() {
    // ┌─────────────────────────────────────────────────────────────┐
    // │ 📚 Core Data Structures                                    │
    // └─────────────────────────────────────────────────────────────┘
    this.vocab = new Map(); // token_string -> token_id
    this.merges = []; // BPE merge rules
    this.specialTokens = new Map(); // special_token -> token_id
    this.decoder = new Map(); // token_id -> token_string

    // 🎯 Initialize with essential special tokens
    this.initializeSpecialTokens();
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ ⭐ METHOD: initializeSpecialTokens                           ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Sets up special tokens that handle common edge cases:
   * • End of text markers
   * • Unknown token fallbacks
   * • Whitespace representations
   */
  initializeSpecialTokens() {
    const specials = [
      '<|endoftext|>', // 📄 Document/sequence terminator
      '<|startoftext|>', // 📝 Document/sequence starter
      '<|unknown|>', // ❓ Unknown/OOV token fallback
      '<|space|>', // ⎵ Explicit space representation
    ];

    // 🏷️ Assign sequential IDs to special tokens
    specials.forEach((token, idx) => {
      this.specialTokens.set(token, idx);
      this.decoder.set(idx, token);
    });
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🎓 METHOD: trainFromText - BPE Training Algorithm            ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Implements simplified Byte-Pair Encoding training:
   * 1. Initialize with character-level vocabulary
   * 2. Find most frequent character pairs
   * 3. Merge pairs iteratively to build subword vocabulary
   * 4. Continue until target vocabulary size reached
   *
   * @param {string} text - Training corpus
   * @param {number} vocabSize - Target vocabulary size
   */
  trainFromText(text, vocabSize = 8000) {
    console.log('🎓 Training tokenizer...');

    // ┌─────────────────────────────────────────────────────────────┐
    // │ 📝 Phase 1: Character-Level Initialization                │
    // └─────────────────────────────────────────────────────────────┘

    // Extract all unique characters plus common punctuation
    const chars = Array.from(new Set(text + ' \n\t!@#$%^&*()[]{}'));
    chars.forEach((char, idx) => {
      const tokenId = this.specialTokens.size + idx;
      this.vocab.set(char, tokenId);
      this.decoder.set(tokenId, char);
    });

    // ┌─────────────────────────────────────────────────────────────┐
    // │ 🔄 Phase 2: Iterative BPE Training                        │
    // └─────────────────────────────────────────────────────────────┘

    let words = this.preprocessText(text);

    // Continue merging until we reach target vocab size
    for (let i = 0; i < Math.min(2000, vocabSize - this.vocab.size); i++) {
      // 📊 Find all character pairs and their frequencies
      const pairs = this.getPairs(words);
      if (pairs.size === 0) break;

      // 🏆 Select the most frequent pair for merging
      const bestPair = this.getBestPair(pairs);
      if (!bestPair) break;

      // 🔗 Merge the selected pair across all words
      words = this.mergePair(words, bestPair);
      this.merges.push(bestPair);

      // 📚 Add the new merged token to vocabulary
      const newToken = bestPair[0] + bestPair[1];
      const tokenId = this.vocab.size;
      this.vocab.set(newToken, tokenId);
      this.decoder.set(tokenId, newToken);
    }

    console.log(`✅ Training complete! Vocabulary size: ${this.vocab.size}`);
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🧹 METHOD: preprocessText - Text Preparation                 ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Prepares raw text for BPE training by:
   * • Normalizing whitespace
   * • Splitting into word units
   * • Filtering empty strings
   */
  preprocessText(text) {
    return text
      .replace(/\s+/g, ' ') // Normalize whitespace
      .split(' ') // Split on spaces
      .filter((word) => word.trim().length > 0); // Remove empty words
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🔢 METHOD: encode - Text to Token IDs                        ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Converts input text to token ID array.
   * For simplicity, uses character-level encoding for better
   * visualization and educational purposes.
   *
   * @param {string} text - Input text to tokenize
   * @returns {number[]} Array of token IDs
   */
  encode(text) {
    if (!text) return [];

    const tokens = [];

    // 🔤 Character-based encoding for clear visualization
    for (const char of text) {
      const tokenId =
        this.vocab.get(char) || // Known character
        this.specialTokens.get('<|unknown|>') || // Unknown fallback
        2; // Default unknown ID
      tokens.push(tokenId);
    }

    return tokens;
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🔄 METHOD: decode - Token IDs to Text                        ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Reconstructs text from token ID array.
   *
   * @param {number[]} tokens - Array of token IDs
   * @returns {string} Reconstructed text
   */
  decode(tokens) {
    if (!Array.isArray(tokens)) return '';

    return tokens
      .map((token) => {
        const decoded = this.decoder.get(token);
        return decoded || '<|unknown|>';
      })
      .join('');
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 📊 METHOD: getPairs - Extract Character Pairs                ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Analyzes a word list to find all adjacent character pairs
   * and their frequencies. Essential for BPE algorithm.
   *
   * @param {string[]} words - List of words to analyze
   * @returns {Map} Pair frequencies (pair_string -> count)
   */
  getPairs(words) {
    const pairs = new Map();

    for (const word of words) {
      const chars = Array.from(word);

      // 🔍 Extract all adjacent character pairs
      for (let i = 0; i < chars.length - 1; i++) {
        // Use separator to avoid pair collision (e.g., "ab" + "c" vs "a" + "bc")
        const pair = chars[i] + '|||' + chars[i + 1];
        pairs.set(pair, (pairs.get(pair) || 0) + 1);
      }
    }

    return pairs;
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🏆 METHOD: getBestPair - Find Most Frequent Pair             ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Identifies the character pair with highest frequency
   * for the next BPE merge operation.
   *
   * @param {Map} pairs - Pair frequency map
   * @returns {string[]|null} Most frequent pair or null if none
   */
  getBestPair(pairs) {
    if (pairs.size === 0) return null;

    let bestPair = null;
    let maxCount = 0;

    // 🔍 Find pair with maximum frequency
    for (const [pair, count] of pairs) {
      if (count > maxCount) {
        maxCount = count;
        bestPair = pair.split('|||');
      }
    }

    return bestPair;
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🔗 METHOD: mergePair - Apply BPE Merge Rule                  ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Applies a merge rule to all words, combining the specified
   * character pair wherever it appears.
   *
   * @param {string[]} words - Word list to process
   * @param {string[]} pair - Character pair to merge
   * @returns {string[]} Updated word list with merges applied
   */
  mergePair(words, pair) {
    const newWords = [];
    const [first, second] = pair;

    for (const word of words) {
      // 🔄 Replace all occurrences of the pair with merged version
      const newWord = word.replace(
        new RegExp(this.escapeRegExp(first) + this.escapeRegExp(second), 'g'),
        first + second,
      );
      newWords.push(newWord);
    }

    return newWords;
  }

  /**
   * ╔═══════════════════════════════════════════════════════════════╗
   * ║ 🛡️ METHOD: escapeRegExp - Regex Safety Utility              ║
   * ╚═══════════════════════════════════════════════════════════════╝
   *
   * Escapes special regex characters to prevent injection issues.
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 📊 Utility Methods for Analysis                           │
  // └─────────────────────────────────────────────────────────────┘

  /**
   * Returns the current vocabulary size
   */
  getVocabSize() {
    return this.vocab.size;
  }

  /**
   * Returns a copy of the vocabulary for inspection
   */
  getVocab() {
    return new Map(this.vocab);
  }

  /**
   * Gets the text representation of a specific token ID
   */
  getTokenText(tokenId) {
    return this.decoder.get(tokenId) || '<|unknown|>';
  }
}
