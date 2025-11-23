export enum Language {
  RU = 'ru',
  EN = 'en',
  FR = 'fr',
  ES = 'es',
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  DRAG_DROP = 'drag_drop',
  INPUT_WRITE = 'input_write',
}

export interface Translation {
  [Language.EN]: string;
  [Language.FR]: string;
  [Language.ES]: string;
  [Language.RU]: string;
}

export interface RulePoint {
  ending: string;
  example: string;
  note?: Translation;
}

export interface GrammarSection {
  title: Translation;
  pronoun: string; // e.g., "ОН", "ОНА"
  color: string;
  rules: RulePoint[];
}

export interface TheoryContent {
  intro: Translation;
  sections: GrammarSection[];
  exceptions: {
    title: Translation;
    items: Translation[];
  };
}

export interface Question {
  id: string;
  type: ExerciseType;
  prompt: string; // The word or sentence to test
  correctAnswer: string;
  options?: string[]; // For multiple choice
  hint?: Translation;
  genderGroup?: 'm' | 'f' | 'n'; // For drag & drop logic
}

export interface Lesson {
  id: string;
  title: Translation;
  description: Translation;
  icon: string;
  difficulty: 1 | 2 | 3;
  theory: TheoryContent;
  questions: Question[];
}

export type AppView = 'home' | 'theory' | 'practice' | 'results';