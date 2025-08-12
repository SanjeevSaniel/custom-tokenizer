export class CustomTokenizer {
  constructor() {
    this.vocab = new Map();
    this.merges = [];
    this.specialTokens = new Map();
    this.decoder = new Map();
    this.initializeSpecialTokens();
  }

  initializeSpecialTokens() {
    const specials = [
      '<|endoftext|>',
      '<|startoftext|>',
      '<|unknown|>',
      '<|space|>',
    ];
    specials.forEach((token, idx) => {
      this.specialTokens.set(token, idx);
      this.decoder.set(idx, token);
    });
  }

  trainFromText(text, vocabSize = 8000) {
    console.log('Training tokenizer...');

    // Initialize with character-level tokens
    const chars = Array.from(new Set(text + ' \n\t!@#$%^&*()[]{}'));
    chars.forEach((char, idx) => {
      const tokenId = this.specialTokens.size + idx;
      this.vocab.set(char, tokenId);
      this.decoder.set(tokenId, char);
    });

    // Simple BPE training
    let words = this.preprocessText(text);

    for (let i = 0; i < Math.min(2000, vocabSize - this.vocab.size); i++) {
      const pairs = this.getPairs(words);
      if (pairs.size === 0) break;

      const bestPair = this.getBestPair(pairs);
      if (!bestPair) break;

      words = this.mergePair(words, bestPair);
      this.merges.push(bestPair);

      const newToken = bestPair[0] + bestPair[1];
      const tokenId = this.vocab.size;
      this.vocab.set(newToken, tokenId);
      this.decoder.set(tokenId, newToken);
    }

    console.log(`Training complete! Vocabulary size: ${this.vocab.size}`);
  }

  preprocessText(text) {
    return text
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter((word) => word.trim().length > 0);
  }

  encode(text) {
    if (!text) return [];

    const tokens = [];

    // Character-based encoding for simplicity and better visualization
    for (const char of text) {
      const tokenId =
        this.vocab.get(char) || this.specialTokens.get('<|unknown|>') || 2;
      tokens.push(tokenId);
    }

    return tokens;
  }

  decode(tokens) {
    if (!Array.isArray(tokens)) return '';

    return tokens
      .map((token) => {
        const decoded = this.decoder.get(token);
        return decoded || '<|unknown|>';
      })
      .join('');
  }

  getPairs(words) {
    const pairs = new Map();

    for (const word of words) {
      const chars = Array.from(word);
      for (let i = 0; i < chars.length - 1; i++) {
        const pair = chars[i] + '|||' + chars[i + 1];
        pairs.set(pair, (pairs.get(pair) || 0) + 1);
      }
    }

    return pairs;
  }

  getBestPair(pairs) {
    if (pairs.size === 0) return null;

    let bestPair = null;
    let maxCount = 0;

    for (const [pair, count] of pairs) {
      if (count > maxCount) {
        maxCount = count;
        bestPair = pair.split('|||');
      }
    }

    return bestPair;
  }

  mergePair(words, pair) {
    const newWords = [];
    const [first, second] = pair;

    for (const word of words) {
      const newWord = word.replace(
        new RegExp(this.escapeRegExp(first) + this.escapeRegExp(second), 'g'),
        first + second,
      );
      newWords.push(newWord);
    }

    return newWords;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getVocabSize() {
    return this.vocab.size;
  }

  getVocab() {
    return new Map(this.vocab);
  }

  getTokenText(tokenId) {
    return this.decoder.get(tokenId) || '<|unknown|>';
  }
}
