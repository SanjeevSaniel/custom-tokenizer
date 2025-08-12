import { getEncoding, encodingForModel } from 'js-tiktoken';

export class TiktokenWrapper {
  constructor(modelName = 'gpt-3.5-turbo') {
    try {
      // Try to get encoding for specific model
      this.encoding = encodingForModel(modelName);
      this.modelName = modelName;
    } catch (error) {
      console.warn(`Model ${modelName} not found, falling back to cl100k_base`);
      // Fallback to base encoding
      this.encoding = getEncoding('cl100k_base');
      this.modelName = 'cl100k_base';
    }
  }

  encode(text) {
    if (!text) return [];
    return Array.from(this.encoding.encode(text));
  }

  decode(tokens) {
    if (!Array.isArray(tokens)) return '';
    return this.encoding.decode(new Uint32Array(tokens));
  }

  getTokenText(tokenId) {
    try {
      return this.encoding.decode(new Uint32Array([tokenId]));
    } catch (error) {
      return '<|unknown|>';
    }
  }

  getVocabSize() {
    return 100000; // Approximate vocab size
  }

  getModelName() {
    return this.modelName;
  }

  free() {
    if (this.encoding && this.encoding.free) {
      this.encoding.free();
    }
  }
}
