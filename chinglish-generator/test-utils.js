const fs = require('fs');
const path = require('path');

// 读取并分析翻译规则
const code = fs.readFileSync('./src/utils/translationRules.ts', 'utf8');
console.log('Testing word matching...');

// 简单模拟wordMap和匹配逻辑
const wordMap = {
  '你好': 'Hello',
  '厉害': 'powerful',
  '好': 'good',
  '你': 'you',
};

const sortedWordKeys = Object.keys(wordMap).sort((a, b) => b.length - a.length);
console.log('sortedWordKeys:', sortedWordKeys);

// 测试"你好厉害"的匹配
const testText = "你好厉害";
console.log('\nTesting:', testText);

const translatedParts = [];
let remainingText = testText;

while (remainingText.length > 0) {
  let matched = false;
  console.log('  remainingText:', JSON.stringify(remainingText));
  
  for (const key of sortedWordKeys) {
    if (remainingText.startsWith(key)) {
      const translation = wordMap[key];
      console.log('  Match:', key, '->', translation);
      if (translation) {
        translatedParts.push(translation);
      }
      remainingText = remainingText.slice(key.length);
      matched = true;
      break;
    }
  }
  
  if (!matched) {
    console.log('  No match, taking:', remainingText[0]);
    translatedParts.push(remainingText[0]);
    remainingText = remainingText.slice(1);
  }
}

console.log('\nResult:', translatedParts.join(' '));
