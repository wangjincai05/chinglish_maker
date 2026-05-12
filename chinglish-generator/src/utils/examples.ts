export interface Example {
  id: string;
  title: string;
  scene: string;
  chinese: string;
  chinglish: string;
  standard: string;
  explanation: string;
}

export const examples: Example[] = [
  {
    id: '1',
    title: '童话开头',
    scene: '讲故事',
    chinese: '很久很久以前',
    chinglish: 'Very long long time ago',
    standard: 'Once upon a time',
    explanation: '中文喜欢用重复词强调，但在英语中"long long"是不自然的表达。标准英语使用"once upon a time"这个固定短语。'
  },
  {
    id: '2',
    title: '表达思念',
    scene: '日常交流',
    chinese: '我非常想你',
    chinglish: 'I very miss you',
    standard: 'I miss you so much',
    explanation: '"Very"不能直接修饰动词"miss"。正确的表达是用副词"so much"修饰动词，或使用"I really miss you"等表达。'
  },
  {
    id: '3',
    title: '茶类饮品',
    scene: '点餐',
    chinese: '我要一杯红茶',
    chinglish: 'I want a cup of red tea',
    standard: 'I want a cup of black tea',
    explanation: '这是典型的文化差异导致的翻译错误。虽然茶叶泡出来是红色的，但西方人称之为"black tea"。类似的还有"绿茶"不是"green tea"而是"green tea"（这个是对的）。'
  },
  {
    id: '4',
    title: '三餐表达',
    scene: '日常对话',
    chinese: '吃早饭',
    chinglish: 'Eat breakfast',
    standard: 'Have breakfast',
    explanation: '在英语中，早餐、午餐、晚餐通常用"have"而非"eat"。说"eat breakfast"虽然语法正确，但听起来像是"把早餐吃下去"而不是"吃早餐"。'
  },
  {
    id: '5',
    title: '发表意见',
    scene: '讨论问题',
    chinese: '我认为不行',
    chinglish: 'I think not',
    standard: "I don't think so",
    explanation: '"I think not"虽然是正确的英语，但听起来比较生硬。标准的美式/英式英语更常用"I don\'t think so"或"I disagree"。'
  },
  {
    id: '6',
    title: '询问价格',
    scene: '购物',
    chinese: '这个多少钱？',
    chinglish: 'How much money?',
    standard: 'How much is this? / How much?',
    explanation: '"How much"已经包含了"money"的意思，加上"money"就显得多余。在英语中，"How much?"单独使用就足够表达询问价格。'
  },
  {
    id: '7',
    title: '天气寒暄',
    scene: '日常寒暄',
    chinese: '今天天气真好！',
    chinglish: 'Today weather very good!',
    standard: "The weather is really nice today!",
    explanation: '缺少定冠词"the"，词序也混乱。正确的英语需要用"the weather"（特指），并使用正确的系表结构。'
  },
  {
    id: '8',
    title: '表达喜欢',
    scene: '表达喜好',
    chinese: '我非常喜欢音乐',
    chinglish: 'I very like music',
    standard: 'I really like music / I like music very much',
    explanation: '"Very"不能直接修饰动词。要表达程度，应该使用"really"修饰动词，或将"very much"放在句末修饰动词。'
  },
  {
    id: '9',
    title: '祝福旅途',
    scene: '送别',
    chinese: '祝你旅途愉快',
    chinglish: 'Wish you journey happy',
    standard: 'Have a nice trip! / Enjoy your trip!',
    explanation: '中文祝福语直译为英语显得生硬。英语中有固定的祝福表达，如"Have a nice trip"、"Enjoy your trip"或"Bon voyage"。'
  },
  {
    id: '10',
    title: '回家表达',
    scene: '回家',
    chinese: '让我们回家吧',
    chinglish: "Let's go to home",
    standard: "Let's go home",
    explanation: '"Home"在这里是副词，表示"回家"这个方向，不需要介词"to"。类似的有"go there"、"come here"等。'
  },
  {
    id: '11',
    title: '学习方法',
    scene: '学习讨论',
    chinese: '学习知识',
    chinglish: 'Study knowledge',
    standard: 'Acquire/Gain knowledge / Learn new things',
    explanation: '"Knowledge"不是"study"的对象。在英语中，知识是通过"获取(acquire/gain)"或"学习(learn)"获得的，而不是"研究(study)"。'
  },
  {
    id: '12',
    title: '中式数量',
    scene: '介绍朋友',
    chinese: '他是我的一个朋友',
    chinglish: 'He is my one friend',
    standard: 'He is a friend of mine / He is one of my friends',
    explanation: '中文的"一个"表示泛指，但英语中不需要"one"。正确的表达是"a friend of mine"或"one of my friends"。'
  }
];
