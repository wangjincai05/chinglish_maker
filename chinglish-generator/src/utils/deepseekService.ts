const API_KEY = 'sk-bd319cbc6f6b42c2bf644e89b9ced95b';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface TranslationResult {
  chinglish: string;
  standard: string;
}

async function callDeepSeek(prompt: string): Promise<string> {
  console.log('Calling DeepSeek API...');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API request failed:', response.status, errorText);
    throw new Error(`API request failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const result = data.choices[0]?.message?.content || '';
  console.log('DeepSeek API result:', result);
  return result;
}

export async function translateWithAI(chineseText: string): Promise<TranslationResult> {
  const chinglishPrompt = `将以下中文翻译成"中式英语"（Chinglish），即中国人常犯的英语错误，如：字对字翻译、语法结构错误、中式表达习惯等。请只输出翻译结果，不要解释。

中文：${chineseText}
中式英语：` ;

  const standardPrompt = `将以下中文翻译成自然地道的标准英语。请只输出翻译结果，不要解释。

中文：${chineseText}
标准英语：` ;

  try {
    console.log('Starting AI translation for:', chineseText);
    const [chinglish, standard] = await Promise.all([
      callDeepSeek(chinglishPrompt),
      callDeepSeek(standardPrompt)
    ]);

    return {
      chinglish: chinglish.trim(),
      standard: standard.trim()
    };
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw error;
  }
}
