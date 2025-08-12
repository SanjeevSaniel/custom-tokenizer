// src/lib/sample-data.js
export const TIKTOKEN_MODELS = {
  'gpt-4o': 'GPT-4o (Latest)',
  'gpt-4o-mini': 'GPT-4o Mini',
  'gpt-4-turbo': 'GPT-4 Turbo',
  'gpt-4': 'GPT-4',
  'gpt-3.5-turbo': 'GPT-3.5 Turbo',
  'text-davinci-003': 'Text Davinci 003',
  'text-davinci-002': 'Text Davinci 002',
};

export const SAMPLE_TEXTS = {
  'Short Greeting': 'Hello, world! How are you today?',
  Programming:
    'JavaScript is a versatile programming language used for web development and machine learning applications.',
  'AI & ML':
    'Large language models like GPT-4 use transformer architectures with attention mechanisms to process and generate human-like text.',
  Literature:
    'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.',
  Technical:
    'Neural networks process information through layers of interconnected nodes, each performing mathematical transformations on input data vectors.',
  Conversation:
    "Can you help me understand how tokenization works in modern AI systems? I'm particularly interested in BPE and how it handles out-of-vocabulary words.",
  Code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}',
  Multilingual: 'Hello! Bonjour! Hola! Guten Tag! こんにちは! 你好! مرحبا!',
};
