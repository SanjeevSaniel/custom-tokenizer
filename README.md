# TokenStudio - Custom Tokenizer

A professional tokenizer web application built with Next.js 15 that provides real-time text tokenization with interactive visualization, similar to tiktoken.com.

## ✨ Features

- Real-time Tokenization — instant encoding/decoding as you type
- Multi-Model Support — GPT-4o, GPT-4, GPT-3.5-turbo, and more OpenAI models
- Interactive Visualization — color-coded token breakdown with hover details
- Cost Analysis — real-time API cost estimation for OpenAI usage
- Sample Text Library — pre-loaded examples for quick testing
- Professional UI — clean, responsive design with smooth animations

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/tokenstudio-custom-tokenizer.git
cd tokenstudio-custom-tokenizer
npm install

# Run development server
npm run dev

# Visit
# http://localhost:3000
```

## 📸 Application Preview

Place actual images into public/ and keep these markdown links as-is. The app will load them from /images/... at runtime.

- Main Interface  
  ![TokenStudio Main Interface](/images/main-interface.png)
  
- Visualization  
  ![Token Visualization](/images/token-visualization.png)
  
### Basic Text Tokenization

Input:

```text
"Hello, world! How are you today?"
```

Output:

- Token Count: 8 tokens
- Token IDs: [9906][1917][2650][3432]
- Estimated Cost: $0.00024 (GPT-3.5-turbo)

### Programming Code Example

Input:

```js
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
```

Results:

- GPT-4o: 32 tokens → $0.00096
- GPT-3.5: 35 tokens → $0.00105
- Best Model: GPT-4o (8.6% more efficient)

### Model Efficiency Comparison

| Model         | Tokens   | Cost      | Efficiency |
|---------------|----------|-----------|------------|
| GPT-4o        | 6 tokens | $0.00018  | ⭐ Best     |
| GPT-4         | 7 tokens | $0.00021  | Good       |
| GPT-3.5-turbo | 8 tokens | $0.00012  | Cheapest   |

## 🛠️ Tech Stack

- Next.js 15 (App Router) + JavaScript
- Tailwind CSS + shadcn/ui components
- js-tiktoken for OpenAI-compatible tokenization
- Lucide React icons

## 📱 How to Use

1. Select Model — choose from GPT-4o, GPT-4, or GPT-3.5-turbo.
2. Enter Text — type or select from sample texts.
3. View Results — see real-time token breakdown and statistics.
4. Analyze Tokens — hover over colored tokens for details.
5. Copy Results — export token arrays for your applications.

## 📊 Key Features

- Token Count — exact number of tokens for API planning
- Cost Estimation — calculate OpenAI API costs before making calls
- Token Visualization — see exactly how text is broken down
- Model Comparison — compare efficiency across different models
- Roundtrip Verification — ensure perfect encode/decode accuracy

## 📦 Project Structure

```text
src/
├── app/                         # Next.js 15 App Router
│   ├── layout.js                # Root layout
│   ├── page.js                  # Main entry point
│   └── globals.css              # Global styles
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── header.js                # Application header
│   ├── tokenizer-interface.js   # Main interface
│   └── token-visualizer.js      # Token visualization
└── lib/                         # Core logic
    ├── tiktoken-wrapper.js      # Tokenizer integration
    └── sample-data.js           # Sample texts & models
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to vercel.com by connecting your GitHub repository
```

### Local Production

```bash
npm run build
npm start
```

## 🔧 Core Components

- TokenizerInterface — main app with real-time processing
- TokenVisualizer — interactive color-coded token display
- ModelSelector — switch between OpenAI models
- StatsDashboard — token counts, costs, and efficiency metrics

## 📈 Features Implemented

- ENCODE/DECODE — bidirectional token conversion  
- Vocabulary Learning — built-in BPE algorithm  
- Special Tokens — handles unknown and special markers  
- Real-time Processing — instant results as you type  
- Professional UI — modern, responsive design  

***

Built with Next.js 15 for a fast, modern tokenization experience.
