/* ============================================================================
   DECODED - LEVELS (all game content)
   ----------------------------------------------------------------------------
   This is where you edit questions, answers, and copy for every level.
   You can change the text freely. Do NOT rename the "mechanic" field, that tells
   the game which mini-game to run. Keep all visible text free of dashes.

   Icons: the "icon" fields use Iconoir icon names (see js/icons.js for the
   available set). Change them to any name listed there.

   Each level has:
     num         the level number, 1 to 11
     chapter     the chapter it belongs to
     title       the level title
     tag         the one line teaser
     glossaryId  which concept card unlocks (see data/glossary.js)
     intro       the guide's spoken intro line
     howToPlay   the bright "how to play" callout: what to tap and what it is worth
     assignment  a realistic task the player can try to test their understanding
     mechanic    which mini-game engine to use (do not rename)
     ...         mechanic-specific content
   ============================================================================ */

window.DECODED = window.DECODED || {};

DECODED.chapters = [
  { id: "foundations", name: "Foundations" },
  { id: "building",    name: "Building with AI" },
  { id: "responsible", name: "Using AI Responsibly" },
  { id: "risks",       name: "Risks and Opportunities" },
  { id: "society",     name: "AI and Society" }
];

DECODED.levels = [

  /* ======================= CHAPTER: FOUNDATIONS ======================= */

  {
    num: 1,
    chapter: "foundations",
    title: "What is AI, really?",
    tag: "Sort the rule followers from the learners.",
    glossaryId: "machine-learning",
    intro: "Some machines follow rules a human typed in. Others learn from examples. Let's tell them apart.",
    howToPlay: "Tap Follows rules or Learns from examples for each item. Worth 10 points each.",
    assignment: "Look at three apps on your phone. For each one, decide out loud whether a human wrote its rules or it learned from examples. Text a friend your three picks and see if they agree.",
    mechanic: "sort-binary",
    points: 10,
    options: [
      { key: "rules",  label: "Follows rules", icon: "book" },
      { key: "learns", label: "Learns from examples", icon: "brain" }
    ],
    items: [
      { icon: "calculator", label: "A calculator",            answer: "rules",  why: "A person wrote the exact math rules. It never learns, it just follows them." },
      { icon: "headset",    label: "Spotify recommendations", answer: "learns", why: "It learns your taste from what millions of people actually listen to." },
      { icon: "bell",       label: "A 7am alarm",             answer: "rules",  why: "You set a rule: ring at 7am. Simple, fixed, no learning." },
      { icon: "face-id",    label: "Face recognition",        answer: "learns", why: "It learned what faces look like from huge piles of example photos." },
      { icon: "sun-light",  label: "A basic thermostat",      answer: "rules",  why: "A fixed rule: if it drops below the set temperature, turn on the heat." },
      { icon: "mail",       label: "Spam filtering",          answer: "learns", why: "It learned what spam looks like from millions of emails people marked as junk." }
    ],
    reveal: {
      title: "What just happened",
      body: "Everything you put in the Learns pile has one thing in common: nobody wrote its rules by hand. It figured out the pattern from examples. That is Machine Learning, and it is the engine under almost everything people call AI."
    }
  },

  {
    num: 2,
    chapter: "foundations",
    title: "How does it learn?",
    tag: "Train a model and watch data matter.",
    glossaryId: "training-data",
    intro: "A model is only as good as the examples you feed it. Let's train one and find out.",
    howToPlay: "Tap Nature or Made by people to label each picture. Worth 10 points per correct label. Then watch your model take a test.",
    assignment: "Think of a simple thing you would want AI to recognize, like your handwriting or your dog. Write down 5 example inputs and their correct labels. That tiny list is training data.",
    mechanic: "train-model",
    points: 10,
    labels: [
      { key: "nature", label: "Nature",         icon: "leaf" },
      { key: "made",   label: "Made by people", icon: "calculator" }
    ],
    training: [
      { icon: "sun-light", truth: "nature" },
      { icon: "calculator", truth: "made" },
      { icon: "leaf",      truth: "nature" },
      { icon: "headset",   truth: "made" },
      { icon: "cloud",     truth: "nature" },
      { icon: "book",      truth: "made" }
    ],
    testing: [
      { icon: "fire-flame", truth: "nature" },
      { icon: "bell",       truth: "made" },
      { icon: "half-moon",  truth: "nature" },
      { icon: "code",       truth: "made" }
    ],
    reveal: {
      title: "What just happened",
      body: "The pictures you labeled are the Training Data. Label them well and the model aces the test. Feed it messy or wrong labels and it fails, no matter how clever it is. That is the whole game: garbage in, garbage out."
    }
  },

  {
    num: 3,
    chapter: "foundations",
    title: "How does it guess?",
    tag: "Beat the AI at predicting the next word.",
    glossaryId: "large-language-model",
    intro: "A chatbot is really a next word guesser. Think you can out guess it? Let's see.",
    howToPlay: "Read each sentence and tap the word you think is most likely next. Worth 15 points when you match the AI's top pick.",
    assignment: "Open your phone's keyboard and type 'I am going to the'. Watch the words it suggests next, and note the top three. That is next word prediction sitting in your pocket.",
    mechanic: "next-word",
    points: 15,
    rounds: [
      {
        stub: "The cat sat on the ___",
        options: [
          { word: "mat",    p: 0.72 },
          { word: "roof",   p: 0.15 },
          { word: "moon",   p: 0.08 },
          { word: "idea",   p: 0.05 }
        ]
      },
      {
        stub: "I would like a hot cup of ___",
        options: [
          { word: "coffee", p: 0.58 },
          { word: "tea",    p: 0.30 },
          { word: "soup",   p: 0.09 },
          { word: "sand",   p: 0.03 }
        ]
      },
      {
        stub: "Once upon a ___",
        options: [
          { word: "time",   p: 0.88 },
          { word: "hill",   p: 0.06 },
          { word: "while",  p: 0.04 },
          { word: "table",  p: 0.02 }
        ]
      },
      {
        stub: "Thanks so much, I really appreciate ___",
        options: [
          { word: "it",     p: 0.64 },
          { word: "you",    p: 0.27 },
          { word: "cars",   p: 0.06 },
          { word: "rain",   p: 0.03 }
        ]
      }
    ],
    reveal: {
      title: "What just happened",
      body: "You just did what a chatbot does all day: pick the most likely next word, then repeat. A Large Language Model has read almost everything, so its odds are sharp. It is not thinking, it is predicting, one word at a time."
    }
  },

  {
    num: 4,
    chapter: "foundations",
    title: "Why does it make things up?",
    tag: "Catch the confident false claims.",
    glossaryId: "hallucination",
    intro: "AI can sound totally sure and be totally wrong. Let's train your radar for it.",
    howToPlay: "For each statement, tap Real fact or Hallucination. Worth 10 points each.",
    assignment: "Ask any chatbot for three facts about a topic you already know well. Fact check each one. Note which, if any, were stated confidently but turned out wrong.",
    mechanic: "true-false",
    points: 10,
    options: [
      { key: "real",  label: "Real fact", icon: "check-circle" },
      { key: "fake",  label: "Hallucination", icon: "cloud" }
    ],
    statements: [
      { text: "Honey found in ancient sealed jars can still be safe to eat.", answer: "real", why: "True. Honey's low moisture and acidity keep it from spoiling for a very long time." },
      { text: "The Great Wall of China is clearly visible to the naked eye from the Moon.", answer: "fake", why: "False, and a classic myth. It is far too narrow to see from that distance." },
      { text: "Octopuses have three hearts.", answer: "real", why: "True. Two pump blood to the gills, one to the rest of the body." },
      { text: "Humans only use ten percent of their brains.", answer: "fake", why: "False. Brain scans show we use virtually all of it, just not all at once." },
      { text: "Bananas are, botanically, a type of berry.", answer: "real", why: "True. By botanical definition bananas qualify as berries, while strawberries do not." },
      { text: "Goldfish have a memory span of only three seconds.", answer: "fake", why: "False. Goldfish can remember things for weeks or even months." }
    ],
    reveal: {
      title: "What just happened",
      body: "The false ones sounded just as confident as the true ones. When AI does this it is called a Hallucination: it states something wrong with a straight face. The lesson is simple. Confident does not mean correct, so verify what matters."
    }
  },

  {
    num: 5,
    chapter: "foundations",
    title: "How do I talk to it?",
    tag: "Turn a weak prompt into a great one.",
    glossaryId: "prompt-engineering",
    intro: "Same AI, wildly different answers, all down to how you ask. Let's upgrade a weak prompt.",
    howToPlay: "Tap the upgrade chips to improve the prompt. Worth 10 points per upgrade, plus a 20 point bonus when all 4 are on.",
    assignment: "Take a vague request you have, like 'help me write something'. Rewrite it once with a role, specifics, a format, and the audience. Notice how much sharper the ask becomes.",
    mechanic: "prompt-upgrade",
    points: 10,
    completionBonus: 20,
    basePrompt: "Write me an email.",
    upgrades: [
      { key: "role",     chip: "Add a role",      icon: "user",      text: "You are a friendly customer support lead." },
      { key: "specific", chip: "Add specifics",   icon: "search",    text: "Apologize for a late order and offer a 10 percent discount." },
      { key: "format",   chip: "Add a format",    icon: "list",      text: "Keep it under 120 words with a clear subject line." },
      { key: "audience", chip: "Add the audience", icon: "community", text: "Written for a first time customer who is frustrated." }
    ],
    reveal: {
      title: "What just happened",
      body: "Same request, but now the AI knows who to be, what to say, how to shape it, and who is reading. That is Prompt Engineering: not magic words, just clear instructions. Role, specifics, format, and audience do most of the heavy lifting."
    }
  },

  /* ===================== CHAPTER: BUILDING WITH AI ===================== */

  {
    num: 6,
    chapter: "building",
    title: "What is an agent?",
    tag: "Equip an AI to get real tasks done.",
    glossaryId: "ai-agent",
    intro: "A chatbot talks. An agent acts. But only if you give it the right tools. Let's equip one.",
    howToPlay: "Tap tools to equip your agent, then tap Run. Pick the right kit and earn a 30 point bonus. One tool is a trap.",
    assignment: "Write down a real task with three steps, like planning a night out. For each step, name the one tool an AI agent would need to do it, such as search, calendar, or email.",
    mechanic: "agent-tools",
    bonus: 30,
    goal: "Find a pizza place, check I am free this weekend, and email my friend Sam.",
    tools: [
      { key: "search",     icon: "search",     label: "Web Search",  needed: true },
      { key: "calendar",   icon: "task-list",  label: "Calendar",    needed: true },
      { key: "email",      icon: "mail",       label: "Email",       needed: true },
      { key: "calculator", icon: "calculator", label: "Calculator",  needed: false }
    ],
    steps: [
      { need: "search",   ok: "Searched the web and found Tony's Pizza nearby.",      fail: "Wanted to find a pizza place, but it has no way to search the web." },
      { need: "calendar", ok: "Checked your calendar. Saturday afternoon is free.",   fail: "Tried to check the weekend, but it cannot see your calendar." },
      { need: "email",    ok: "Drafted and sent an email to Sam with the plan.",      fail: "Wanted to email Sam, but it has no email tool." }
    ],
    reveal: {
      title: "What just happened",
      body: "You did not make the AI smarter, you made it capable. Give it Search, Calendar, and Email and it can actually get things done. That is an AI Agent: a model with tools and a goal. The Calculator was a trap, because more tools is not the point, the right tools are."
    }
  },

  {
    num: 7,
    chapter: "building",
    title: "What is vibe coding?",
    tag: "Build software by describing it.",
    glossaryId: "vibe-coding",
    intro: "You can now build software without writing code, just by describing it. Let's get the flow right.",
    howToPlay: "Tap the steps in the correct order, top to bottom. Worth 10 points for each step you place correctly.",
    assignment: "Describe one small tool you wish existed in two plain sentences, as if you were telling a person. That description is the exact first step of vibe coding it into reality.",
    mechanic: "order-steps",
    points: 10,
    steps: [
      { order: 1, icon: "chat-bubble", text: "Describe what you want in plain English." },
      { order: 2, icon: "code",        text: "The AI writes the code." },
      { order: 3, icon: "play",        text: "Run it and see what happens." },
      { order: 4, icon: "edit-pencil", text: "Refine by describing the change you want." }
    ],
    reveal: {
      title: "What just happened",
      body: "You describe, the AI builds, you run it, you refine. That loop is Vibe Coding, and it lets non coders make real things. One caution stays true: always run it and review what the AI builds, because it can be confidently wrong here too."
    }
  },

  /* ================== CHAPTER: USING AI RESPONSIBLY ================== */

  {
    num: 8,
    chapter: "responsible",
    title: "Using AI the right way.",
    tag: "Judge what is fair and safe to do.",
    glossaryId: "responsible-ai-use",
    intro: "AI is powerful, so the how matters. Let's sort the fair uses from the ones that cross a line.",
    howToPlay: "For each situation, tap Okay to do or Not okay. Worth 10 points each.",
    assignment: "Think back to the last time you used AI. Was it fair, honest, and private? Write one sentence on how you would keep that same task responsible next time.",
    mechanic: "judge-scenarios",
    points: 10,
    options: [
      { key: "okay",   label: "Okay to do", icon: "thumbs-up" },
      { key: "notok",  label: "Not okay",   icon: "prohibition" }
    ],
    scenarios: [
      { text: "Brainstorming ideas with AI, then doing the actual work yourself.", answer: "okay",  why: "Great use. It is a thinking partner, and the work is still yours." },
      { text: "Submitting an AI written essay as your own original work.",          answer: "notok", why: "Not okay. Passing off AI work as yours is dishonest, and often against the rules." },
      { text: "Pasting a client's private data into a public AI tool.",             answer: "notok", why: "Not okay. That data can be stored or exposed. Keep private info out of public tools." },
      { text: "Drafting a report with AI, then fact checking every claim yourself.", answer: "okay",  why: "Responsible. You use the speed, then you own the accuracy." },
      { text: "Letting AI reject job candidates automatically with no human review.", answer: "notok", why: "Not okay. High stakes decisions about people need a human in the loop." }
    ],
    reveal: {
      title: "What just happened",
      body: "Notice the pattern. AI is a fine helper and a bad stand in for honesty, privacy, and human judgment. That is Responsible AI Use: lean on it for drafts and ideas, and keep a person accountable for the things that really matter."
    }
  },

  /* ============== CHAPTER: RISKS AND OPPORTUNITIES ============== */

  {
    num: 9,
    chapter: "risks",
    title: "The risks of AI.",
    tag: "Name the danger in each scenario.",
    glossaryId: "ai-risks",
    intro: "You cannot manage a risk you cannot name. Let's put names to the big ones.",
    howToPlay: "Read each scenario and tap the risk it shows. Worth 12 points each.",
    assignment: "Find one news story about AI this week. In a sentence, name which risk it shows: bias, deepfakes, over-reliance, or misuse. Spotting it is the first step to managing it.",
    mechanic: "multiple-choice",
    points: 12,
    questions: [
      {
        scenario: "A hiring AI was trained mostly on resumes from men, so it quietly downranks women.",
        options: ["Bias from unrepresentative data", "Deepfakes and misinformation", "Over-reliance", "Security misuse"],
        answer: 0,
        why: "When the training data is skewed, the model learns and repeats that skew as if it were fair."
      },
      {
        scenario: "A realistic fake video shows a leader saying something they never said, and it goes viral.",
        options: ["Bias from unrepresentative data", "Deepfakes and misinformation", "Over-reliance", "Security misuse"],
        answer: 1,
        why: "AI can fabricate convincing fake media, which makes it easy to spread false information."
      },
      {
        scenario: "A student uses AI for every answer and slowly loses the ability to solve problems alone.",
        options: ["Bias from unrepresentative data", "Deepfakes and misinformation", "Over-reliance", "Security misuse"],
        answer: 2,
        why: "Leaning on AI for everything can quietly erode your own skills and judgment."
      },
      {
        scenario: "Someone uses AI to write convincing scam emails at massive scale.",
        options: ["Bias from unrepresentative data", "Deepfakes and misinformation", "Over-reliance", "Security misuse"],
        answer: 3,
        why: "The same tools that help can be aimed at harm, like automating fraud and attacks."
      }
    ],
    reveal: {
      title: "What just happened",
      body: "Bias, deepfakes, over-reliance, and misuse. These are the AI Risks worth watching. None of them are reasons to panic. Named risks are manageable risks, and now you can spot them in the wild."
    }
  },

  {
    num: 10,
    chapter: "risks",
    title: "The opportunities in AI.",
    tag: "Spot where AI creates real value.",
    glossaryId: "ai-opportunities",
    intro: "Now the upside. Let's find where AI is genuine leverage, not just hype.",
    howToPlay: "Read each scenario and tap the opportunity it shows. Worth 12 points each.",
    assignment: "Pick one thing you do that takes too long. Write one specific way AI could give you leverage on it, then try it this week and see what happens.",
    mechanic: "multiple-choice",
    points: 12,
    questions: [
      {
        scenario: "A two person startup ships work that used to need a whole department.",
        options: ["Small team leverage", "Wider access and inclusion", "Faster discovery", "Freeing time for human work"],
        answer: 0,
        why: "AI lets tiny teams punch far above their weight."
      },
      {
        scenario: "A free app translates lessons in real time so more people can learn in their own language.",
        options: ["Small team leverage", "Wider access and inclusion", "Faster discovery", "Freeing time for human work"],
        answer: 1,
        why: "AI can lower barriers and bring tools to people who were left out before."
      },
      {
        scenario: "Researchers screen millions of molecules in days to find promising new medicines.",
        options: ["Small team leverage", "Wider access and inclusion", "Faster discovery", "Freeing time for human work"],
        answer: 2,
        why: "AI can accelerate research that would take humans years by hand."
      },
      {
        scenario: "AI handles a nurse's paperwork so they spend more time with patients.",
        options: ["Small team leverage", "Wider access and inclusion", "Faster discovery", "Freeing time for human work"],
        answer: 3,
        why: "Offloading busywork frees people for the human parts of the job."
      }
    ],
    reveal: {
      title: "What just happened",
      body: "Small teams doing more, wider access, faster discovery, and more time for human work. Those are the AI Opportunities. The theme is simple: AI is leverage you can aim, so point it at something worth doing."
    }
  },

  /* ==================== CHAPTER: AI AND SOCIETY ==================== */

  {
    num: 11,
    chapter: "society",
    title: "How AI gets governed.",
    tag: "Match each policy idea to its goal.",
    glossaryId: "ai-policy",
    intro: "Societies are writing the rules for AI right now. Let's match each rule to the goal behind it.",
    howToPlay: "Read each policy idea and tap the principle behind it. Worth 12 points each.",
    assignment: "In one sentence, say which matters most to you in AI rules: transparency, accountability, privacy, or safety, and why. There is no wrong answer, this debate is still being had worldwide.",
    mechanic: "multiple-choice",
    points: 12,
    questions: [
      {
        scenario: "A rule says AI generated content must be clearly labeled as AI made.",
        options: ["Transparency", "Accountability", "Privacy", "Safety"],
        answer: 0,
        why: "The goal is transparency: people should know when they are dealing with AI."
      },
      {
        scenario: "A rule says a company stays legally responsible when its AI causes harm.",
        options: ["Transparency", "Accountability", "Privacy", "Safety"],
        answer: 1,
        why: "The goal is accountability: someone must answer for what the system does."
      },
      {
        scenario: "A rule limits how companies collect and use your personal data to train AI.",
        options: ["Transparency", "Accountability", "Privacy", "Safety"],
        answer: 2,
        why: "The goal is privacy: protecting your personal information from misuse."
      },
      {
        scenario: "A rule requires testing powerful AI systems before they are released to the public.",
        options: ["Transparency", "Accountability", "Privacy", "Safety"],
        answer: 3,
        why: "The goal is safety: catch serious problems before they can cause harm."
      }
    ],
    reveal: {
      title: "What just happened",
      body: "Transparency, accountability, privacy, and safety are the goals most AI rules aim at. Worth remembering: AI policy is still being written and debated worldwide, and reasonable people disagree about how far the rules should go. This is AI Policy, and it is a live conversation you are now part of."
    }
  }
];

/* Convenience lookups */
DECODED.levelByNum = function (n) {
  return DECODED.levels.filter(function (l) { return l.num === n; })[0];
};
DECODED.chapterName = function (id) {
  var c = DECODED.chapters.filter(function (x) { return x.id === id; })[0];
  return c ? c.name : "";
};
