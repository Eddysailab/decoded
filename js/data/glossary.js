/* ============================================================================
   DECODED - GLOSSARY (the 11 concept cards, in level order)
   ----------------------------------------------------------------------------
   Each card unlocks at the end of its level and is collected on the certificate.
   Keep definitions plain-English, one to two sentences. No dashes in text.
   ============================================================================ */

window.DECODED = window.DECODED || {};

DECODED.glossary = [
  {
    id: "machine-learning",
    icon: "brain",
    term: "Machine Learning",
    definition: "Software that learns patterns from examples instead of following rules a human wrote by hand. Show it enough examples and it figures out the rule itself."
  },
  {
    id: "training-data",
    icon: "list",
    term: "Training Data",
    definition: "The labeled examples a model learns from. If the examples are messy or wrong, the model learns the wrong thing. Garbage in, garbage out."
  },
  {
    id: "large-language-model",
    icon: "chat-bubble",
    term: "Large Language Model",
    definition: "A system trained on huge amounts of text that works by predicting the next most likely word, over and over. That simple trick is what powers chatbots."
  },
  {
    id: "hallucination",
    icon: "cloud",
    term: "Hallucination",
    definition: "When AI states something false with total confidence. Confident does not mean correct, so verify anything that actually matters."
  },
  {
    id: "prompt-engineering",
    icon: "edit-pencil",
    term: "Prompt Engineering",
    definition: "Writing clear instructions that get you a better answer. Add a role, specifics, a format, and the audience, and the output jumps in quality."
  },
  {
    id: "ai-agent",
    icon: "sparks",
    term: "AI Agent",
    definition: "An AI given tools and a goal, so it can take steps and get real tasks done rather than just chatting. The tools you give it decide what it can actually do."
  },
  {
    id: "vibe-coding",
    icon: "code",
    term: "Vibe Coding",
    definition: "Building software by describing what you want in plain English and letting AI write the code. Always run it and review what it built before you trust it."
  },
  {
    id: "responsible-ai-use",
    icon: "check-circle",
    term: "Responsible AI Use",
    definition: "Using AI in ways that are fair, honest, and safe. Great for drafts and ideas, not for passing off its work as yours or leaking private data."
  },
  {
    id: "ai-risks",
    icon: "prohibition",
    term: "AI Risks",
    definition: "The real downsides: biased data, deepfakes, over-reliance, and misuse. Named risks are manageable risks, so spotting them is the first step."
  },
  {
    id: "ai-opportunities",
    icon: "star",
    term: "AI Opportunities",
    definition: "Where AI creates real value: small teams doing more, wider access, faster discovery, and freeing people for human work. AI is leverage you can aim."
  },
  {
    id: "ai-policy",
    icon: "book",
    term: "AI Policy",
    definition: "The rules societies write for AI, built around transparency, accountability, privacy, and safety. This is still being written and debated worldwide."
  }
];

/* Look up a glossary card by id. */
DECODED.glossaryById = function (id) {
  return DECODED.glossary.filter(function (g) { return g.id === id; })[0];
};
