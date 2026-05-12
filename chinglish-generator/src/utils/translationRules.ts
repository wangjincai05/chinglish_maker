export interface TranslationRule {
  pattern: RegExp | string;
  chinglish: string | ((match: string, ...args: string[]) => string);
  standard: string | ((match: string, ...args: string[]) => string);
  description?: string;
}

export const translationRules: TranslationRule[] = [
  {
    pattern: /^很久很久以前$/,
    chinglish: "Very long long time ago",
    standard: "Once upon a time",
    description: "重复词不应用于时间表达"
  },
  {
    pattern: /^我非常想你$/,
    chinglish: "I very miss you",
    standard: "I miss you so much",
    description: "程度副词位置错误，very不能修饰动词"
  },
  {
    pattern: /^学习知识$/,
    chinglish: "Study knowledge",
    standard: "Acquire/Gain knowledge",
    description: "知识不是study的对象"
  },
  {
    pattern: /^学习英语$/,
    chinglish: "Study English",
    standard: "Learn English",
    description: "英语通常用learn而非study"
  },
  {
    pattern: /^红茶$/,
    chinglish: "Red tea",
    standard: "Black tea",
    description: "文化差异导致颜色认知不同"
  },
  {
    pattern: /^吃早饭$/,
    chinglish: "Eat breakfast",
    standard: "Have breakfast",
    description: "早餐通常用have而非eat"
  },
  {
    pattern: /^吃午饭$/,
    chinglish: "Eat lunch",
    standard: "Have lunch",
    description: "午餐通常用have而非eat"
  },
  {
    pattern: /^吃晚饭$/,
    chinglish: "Eat dinner",
    standard: "Have dinner",
    description: "晚餐通常用have而非eat"
  },
  {
    pattern: /^我认为不行$/,
    chinglish: "I think not",
    standard: "I don't think so / I don't agree",
    description: "中式英语直接翻译，标准表达更自然"
  },
  {
    pattern: /^白菜$/,
    chinglish: "Chinese cabbage",
    standard: "Bok choy / Napa cabbage",
    description: "中文直译，不符合英语习惯"
  },
  {
    pattern: /^今天天气真好$/,
    chinglish: "Today weather very good",
    standard: "The weather is really nice today",
    description: "缺少定冠词，词序问题"
  },
  {
    pattern: /^多少钱$/,
    chinglish: "How much money",
    standard: "How much",
    description: "money是多余的"
  },
  {
    pattern: /^他是我的一个朋友$/,
    chinglish: "He is my one friend",
    standard: "He is a friend of mine",
    description: "数量词位置和表达方式错误"
  },
  {
    pattern: /^我有很少时间$/,
    chinglish: "I have very little time",
    standard: "I have little time",
    description: "very多余，且英语中不用very修饰比较级"
  },
  {
    pattern: /^我认为这件事情是不对的$/,
    chinglish: "I think this thing is not right",
    standard: "I don't think that's right",
    description: "双重否定和中式表达"
  },
  {
    pattern: /^让我们回家吧$/,
    chinglish: "Let's go to home",
    standard: "Let's go home",
    description: "home是副词，不需要介词to"
  },
  {
    pattern: /^我去学校走路$/,
    chinglish: "I go to school by walking",
    standard: "I walk to school",
    description: "中式表达，顺序错误"
  },
  {
    pattern: /^这个电脑很贵$/,
    chinglish: "This computer is very expensive",
    standard: "This computer is expensive",
    description: "very多余，在英语中expensive已足够表达"
  },
  {
    pattern: /^我非常喜欢音乐$/,
    chinglish: "I very like music",
    standard: "I really like music / I like music very much",
    description: "very不能直接修饰动词"
  },
  {
    pattern: /^我太感谢你了$/,
    chinglish: "I too thank you",
    standard: "Thank you so much",
    description: "too...to结构使用错误"
  },
  {
    pattern: /^祝你早上好$/,
    chinglish: "Wish you morning good",
    standard: "Good morning",
    description: "中式直译，缺少习惯用语"
  },
  {
    pattern: /^祝你旅途愉快$/,
    chinglish: "Wish your journey happy",
    standard: "Have a nice trip / Enjoy your trip",
    description: "中式祝福语直译"
  },
  {
    pattern: /^中国人民$/,
    chinglish: "Chinese people's people",
    standard: "Chinese people",
    description: "重复表达"
  },
  {
    pattern: /^我的英语不好$/,
    chinglish: "My English is not good",
    standard: "My English is poor / I'm not good at English",
    description: "表达方式不够地道"
  },
  {
    pattern: /^明天见$/,
    chinglish: "Tomorrow see",
    standard: "See you tomorrow",
    description: "缺少主语和动词"
  }
];

export function translateToChinglish(text: string): { chinglish: string; standard: string } {
  let chinglishResult = text;
  let standardResult = text;

  for (const rule of translationRules) {
    if (typeof rule.pattern === 'string') {
      if (text === rule.pattern) {
        chinglishResult = typeof rule.chinglish === 'function' ? rule.chinglish(text) : rule.chinglish;
        standardResult = typeof rule.standard === 'function' ? rule.standard(text) : rule.standard;
        break;
      }
    } else {
      const match = text.match(rule.pattern);
      if (match && match[0]) {
        if (typeof rule.chinglish === 'function') {
          chinglishResult = rule.chinglish(match[0], ...match.slice(1));
        } else {
          chinglishResult = rule.chinglish;
        }
        if (typeof rule.standard === 'function') {
          standardResult = rule.standard(match[0], ...match.slice(1));
        } else {
          standardResult = rule.standard;
        }
        break;
      }
    }
  }

  if (chinglishResult === text) {
    chinglishResult = simpleWordByWordTranslate(text);
    standardResult = getStandardTranslation(text);
  }

  return { chinglish: chinglishResult, standard: standardResult };
}

function simpleWordByWordTranslate(text: string): string {
  const wordMap: Record<string, string> = {
    '我': 'I',
    '你': 'you',
    '他': 'he',
    '她': 'she',
    '它': 'it',
    '我们': 'we',
    '你们': 'you',
    '他们': 'they',
    '是': 'is',
    '的': "'s",
    '在': 'at',
    '有': 'have',
    '和': 'and',
    '很': 'very',
    '非常': 'very',
    '不': 'not',
    '了': '',
    '这': 'this',
    '那': 'that',
    '个': '',
    '一': 'one',
    '二': 'two',
    '三': 'three',
    '好': 'good',
    '厉害': 'powerful',
    '棒': 'great',
    '牛': 'awesome',
    '啊': '',
    '呀': '',
    '呢': '',
    '吧': '',
    '吗': '?',
    '什么': 'what',
    '怎么': 'how',
    '为什么': 'why',
    '谁': 'who',
    '哪里': 'where',
    '时候': 'time',
    '今天': 'today',
    '明天': 'tomorrow',
    '昨天': 'yesterday',
    '现在': 'now',
    '以后': 'later',
    '以前': 'ago',
    '可以': 'can',
    '能': 'can',
    '要': 'want',
    '想': 'want to',
    '喜欢': 'like',
    '爱': 'love',
    '去': 'go',
    '来': 'come',
    '做': 'do',
    '说': 'say',
    '看': 'see',
    '听': 'hear',
    '读': 'read',
    '写': 'write',
    '吃': 'eat',
    '喝': 'drink',
    '睡': 'sleep',
    '工作': 'work',
    '学习': 'study',
    '生活': 'life',
    '朋友': 'friend',
    '家': 'home',
    '学校': 'school',
    '公司': 'company',
    '问题': 'problem',
    '答案': 'answer',
    '时间': 'time',
    '年': 'year',
    '月': 'month',
    '日': 'day',
    '小时': 'hour',
    '分钟': 'minute',
    '钱': 'money',
    '东西': 'thing',
    '事': 'thing',
    '人': 'people',
    '大家': 'everyone',
    '世界': 'world',
    '中国': 'China',
    '美国': 'America',
    '英国': 'England',
    '日本': 'Japan',
    '韩国': 'Korea',
    '语言': 'language',
    '英语': 'English',
    '中文': 'Chinese',
    '天气': 'weather',
    '感觉': 'feel',
    '觉得': 'think',
    '知道': 'know',
    '找到': 'find',
    '给': 'give',
    '拿': 'take',
    '买': 'buy',
    '卖': 'sell',
    '开': 'open',
    '关': 'close',
    '大': 'big',
    '小': 'small',
    '长': 'long',
    '短': 'short',
    '高': 'tall',
    '矮': 'short',
    '新': 'new',
    '老': 'old',
    '年轻': 'young',
    '漂亮': 'beautiful',
    '好看': 'good-looking',
    '帅': 'handsome',
    '忙': 'busy',
    '累': 'tired',
    '饿': 'hungry',
    '渴': 'thirsty',
    '热': 'hot',
    '冷': 'cold',
    '快乐': 'happy',
    '高兴': 'glad',
    '开心': 'happy',
    '伤心': 'sad',
    '难': 'difficult',
    '简单': 'simple',
    '容易': 'easy',
    '真': 'really',
    '太': 'too',
    '也': 'also',
    '都': 'all',
    '还': 'still',
    '就': 'just',
    '才': 'just',
    '又': 'again',
    '再': 'again',
    '如果': 'if',
    '因为': 'because',
    '所以': 'so',
    '但是': 'but',
    '而且': 'and',
    '或者': 'or',
    '虽然': 'although',
    '虽然...但是...': 'although...',
    '如果...就...': 'if...then...',
    '越...越...': 'the more...the more...',
  };

  const sortedKeys = Object.keys(wordMap).sort((a, b) => b.length - a.length);
  const translatedParts: string[] = [];
  let remainingText = text;

  while (remainingText.length > 0) {
    let matched = false;
    for (const key of sortedKeys) {
      if (remainingText.startsWith(key)) {
        const translation = wordMap[key];
        if (translation) {
          translatedParts.push(translation);
        }
        remainingText = remainingText.slice(key.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      translatedParts.push(remainingText[0]);
      remainingText = remainingText.slice(1);
    }
  }

  let result = translatedParts.join(' ');
  result = result.replace(/\s+/g, ' ').trim();
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}

function getStandardTranslation(text: string): string {
  const standardMap: Record<string, string> = {
    'I very miss you': 'I miss you so much',
    'Study knowledge': 'Acquire or gain knowledge',
    'Red tea': 'Black tea',
    'Eat breakfast': 'Have breakfast',
    'I think not': "I don't think so",
    'Today weather very good': 'The weather is really nice today',
    'How much money': 'How much',
    'Wish your journey happy': 'Have a nice trip',
    'Chinese people\'s people': 'Chinese people',
    'I very like music': 'I really like music',
    'I too thank you': 'Thank you so much',
  };

  const chinglish = simpleWordByWordTranslate(text);
  return standardMap[chinglish] || getNaturalEnglish(text);
}

function getNaturalEnglish(text: string): string {
  const templates: Record<string, string> = {
    '我的英语不好': "My English isn't very good",
    '明天见': 'See you tomorrow',
    '祝你旅途愉快': 'Have a nice trip!',
    '我非常想你': 'I miss you so much',
    '红茶': 'Black tea',
    '学习英语': 'Learn English',
    '很久很久以前': 'Once upon a time',
    '今天天气真好': "The weather is really nice today, isn't it?",
  };

  return templates[text] || simpleWordByWordTranslate(text);
}
