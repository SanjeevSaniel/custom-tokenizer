/**
 * ╭─────────────────────────────────────────────────────────────────╮
 * │                      📚 Sample Data Library                     │
 * │                                                                 │
 * │  Curated collection of text samples and AI model definitions   │
 * │  for comprehensive tokenization testing and analysis.          │
 * ╰─────────────────────────────────────────────────────────────────╯
 */

// ═══════════════════════════════════════════════════════════════════
// 🤖 AI MODELS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║ 🎯 TIKTOKEN_MODELS: Supported AI Model Registry              ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 * Maps internal model identifiers to human-readable display names.
 * Ordered by recency and popularity for optimal user experience.
 *
 * Key Features:
 *   • Latest GPT models prioritized at the top
 *   • Clear, descriptive naming convention
 *   • Easy to extend with new model releases
 */
export const TIKTOKEN_MODELS = {
  // 🚀 Latest Generation Models
  'gpt-4o': 'GPT-4o (Latest)', // Most advanced multimodal model
  'gpt-4o-mini': 'GPT-4o Mini', // Efficient lightweight version

  // 🎯 GPT-4 Family
  'gpt-4-turbo': 'GPT-4 Turbo', // High-performance variant
  'gpt-4': 'GPT-4', // Original GPT-4 model

  // ⚡ GPT-3.5 Series
  'gpt-3.5-turbo': 'GPT-3.5 Turbo', // Popular cost-effective option

  // 📚 Legacy Text Models
  'text-davinci-003': 'Text Davinci 003', // High-quality text completion
  'text-davinci-002': 'Text Davinci 002', // Previous generation
};

// ═══════════════════════════════════════════════════════════════════
// 📝 SAMPLE TEXTS COLLECTION
// ═══════════════════════════════════════════════════════════════════

/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║ 🎨 SAMPLE_TEXTS: Diverse Testing Content Library             ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 * Carefully crafted collection of text samples designed to test
 * different aspects of tokenization across various content types.
 *
 * Categories:
 *   • Simple conversational text
 *   • Technical programming content
 *   • Scientific and academic writing
 *   • Literary and creative content
 *   • Code snippets and syntax
 *   • Multilingual examples
 */
export const SAMPLE_TEXTS = {
  // ┌─────────────────────────────────────────────────────────────┐
  // │ 💬 Basic Conversational Text                               │
  // └─────────────────────────────────────────────────────────────┘
  'Short Greeting': 'Hello, world! How are you today?',

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 💻 Programming & Technical Content                         │
  // └─────────────────────────────────────────────────────────────┘
  Programming:
    'JavaScript is a versatile programming language used for web development and machine learning applications.',

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 🧠 AI & Machine Learning Context                           │
  // └─────────────────────────────────────────────────────────────┘
  'AI & ML':
    'Large language models like GPT-4 use transformer architectures with attention mechanisms to process and generate human-like text.',

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 📖 Literary & Educational Content                          │
  // └─────────────────────────────────────────────────────────────┘
  Literature:
    'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.',

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 🔬 Technical & Scientific Writing                          │
  // └─────────────────────────────────────────────────────────────┘
  Technical:
    'Neural networks process information through layers of interconnected nodes, each performing mathematical transformations on input data vectors.',

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 💭 Interactive Conversation                                │
  // └─────────────────────────────────────────────────────────────┘
  Conversation:
    "Can you help me understand how tokenization works in modern AI systems? I'm particularly interested in BPE and how it handles out-of-vocabulary words.",

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 🖥️ Code Snippet with Special Characters                   │
  // └─────────────────────────────────────────────────────────────┘
  Code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}',

  // ┌─────────────────────────────────────────────────────────────┐
  // │ 🌍 Multilingual Unicode Test                               │
  // └─────────────────────────────────────────────────────────────┘
  Multilingual: 'Hello! Bonjour! Hola! Guten Tag! こんにちは! 你好! مرحبا!',
};
