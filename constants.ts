import { Lesson, Language, ExerciseType } from './types';

export const UI_TEXT = {
  start: {
    [Language.EN]: "Start Learning",
    [Language.FR]: "Commencer",
    [Language.ES]: "Empezar",
    [Language.RU]: "Начать урок",
  },
  theory: {
    [Language.EN]: "Theory",
    [Language.FR]: "Théorie",
    [Language.ES]: "Teoría",
    [Language.RU]: "Теория",
  },
  practice: {
    [Language.EN]: "Practice",
    [Language.FR]: "Pratique",
    [Language.ES]: "Práctica",
    [Language.RU]: "Практика",
  },
  next: {
    [Language.EN]: "Next",
    [Language.FR]: "Suivant",
    [Language.ES]: "Siguiente",
    [Language.RU]: "Далее",
  },
  check: {
    [Language.EN]: "Check",
    [Language.FR]: "Vérifier",
    [Language.ES]: "Comprobar",
    [Language.RU]: "Проверить",
  },
  tryAgain: {
    [Language.EN]: "Try Again",
    [Language.FR]: "Réessayer",
    [Language.ES]: "Intentar de nuevo",
    [Language.RU]: "Пройти заново",
  },
  finish: {
    [Language.EN]: "Finish",
    [Language.FR]: "Terminer",
    [Language.ES]: "Terminar",
    [Language.RU]: "Завершить",
  },
  resultExcellent: {
    [Language.EN]: "Excellent!",
    [Language.FR]: "Excellent!",
    [Language.ES]: "¡Excelente!",
    [Language.RU]: "Отлично!",
  },
  resultGood: {
    [Language.EN]: "Good Job!",
    [Language.FR]: "Bien joué!",
    [Language.ES]: "¡Buen trabajo!",
    [Language.RU]: "Хорошая работа!",
  },
  resultRetry: {
    [Language.EN]: "Keep Practicing",
    [Language.FR]: "Continuez à pratiquer",
    [Language.ES]: "Sigue practicando",
    [Language.RU]: "Попробуйте еще раз",
  },
  backToHome: {
    [Language.EN]: "Back to Lessons",
    [Language.FR]: "Retour aux leçons",
    [Language.ES]: "Volver a las lecciones",
    [Language.RU]: "К списку уроков",
  },
  dragInstruction: {
    [Language.EN]: "Drag the word to the correct box",
    [Language.FR]: "Glissez le mot dans la bonne boîte",
    [Language.ES]: "Arrastra la palabra a la caja correcta",
    [Language.RU]: "Перетащите слово в правильную коробку",
  },
  inputInstruction: {
    [Language.EN]: "Type the correct word in Russian",
    [Language.FR]: "Tapez le mot correct en russe",
    [Language.ES]: "Escribe la palabra correcta en ruso",
    [Language.RU]: "Напишите правильное слово на русском",
  }
};

export const LESSONS: Lesson[] = [
  {
    id: 'noun-gender',
    title: {
      [Language.EN]: "Gender of Nouns",
      [Language.FR]: "Genre des Noms",
      [Language.ES]: "Género de Sustantivos",
      [Language.RU]: "Род существительных",
    },
    description: {
      [Language.EN]: "Learn to identify Masculine, Feminine, and Neuter nouns.",
      [Language.FR]: "Apprenez à identifier les noms masculins, féminins et neutres.",
      [Language.ES]: "Aprende a identificar sustantivos masculinos, femeninos y neutros.",
      [Language.RU]: "Научитесь определять мужской, женский и средний род существительных.",
    },
    icon: "Shapes",
    difficulty: 1,
    theory: {
      intro: {
        [Language.EN]: "In Russian, every noun has a gender: Masculine, Feminine, or Neuter. You can usually tell the gender by the last letter of the word.",
        [Language.FR]: "En russe, chaque nom a un genre : Masculin, Féminin ou Neutre. On peut généralement déterminer le genre par la dernière lettre du mot.",
        [Language.ES]: "En ruso, cada sustantivo tiene un género: Masculino, Femenino o Neutro. Generalmente puedes saber el género por la última letra de la palabra.",
        [Language.RU]: "В русском языке у каждого существительного есть род: Мужской, Женский или Средний. Обычно род можно определить по последней букве слова.",
      },
      sections: [
        {
          title: { [Language.EN]: "Masculine", [Language.FR]: "Masculin", [Language.ES]: "Masculino", [Language.RU]: "Мужской род" },
          pronoun: "ОН",
          color: "bg-blue-100 border-blue-500 text-blue-900",
          rules: [
            { ending: "Consonant", example: "Стол, Парк" },
            { ending: "-Й", example: "Музей, Чай" },
            { ending: "-Ь", example: "Словарь, День" }
          ]
        },
        {
          title: { [Language.EN]: "Feminine", [Language.FR]: "Féminin", [Language.ES]: "Femenino", [Language.RU]: "Женский род" },
          pronoun: "ОНА",
          color: "bg-pink-100 border-pink-500 text-pink-900",
          rules: [
            { ending: "-А", example: "Мама, Книга" },
            { ending: "-Я", example: "Семья, Песня" },
            { ending: "-Ь", example: "Ночь, Любовь" }
          ]
        },
        {
          title: { [Language.EN]: "Neuter", [Language.FR]: "Neutre", [Language.ES]: "Neutro", [Language.RU]: "Средний род" },
          pronoun: "ОНО",
          color: "bg-yellow-100 border-yellow-500 text-yellow-900",
          rules: [
            { ending: "-О", example: "Окно, Кино" },
            { ending: "-Е", example: "Море, Поле" },
            { ending: "-МЯ", example: "Имя, Время" }
          ]
        }
      ],
      exceptions: {
        title: { [Language.EN]: "Important Exceptions", [Language.FR]: "Exceptions Importantes", [Language.ES]: "Excepciones Importantes", [Language.RU]: "Важные исключения" },
        items: [
          {
            [Language.EN]: "Words designating men (Папа, Дядя) are Masculine.",
            [Language.FR]: "Les mots désignant des hommes (Папа, Дядя) sont Masculins.",
            [Language.ES]: "Las palabras que designan hombres (Папа, Дядя) son Masculinas.",
            [Language.RU]: "Слова, обозначающие мужчин (Папа, Дядя) — Мужского рода."
          },
          {
            [Language.EN]: "Кофе (Coffee) is Masculine.",
            [Language.FR]: "Кофе (Café) est Masculin.",
            [Language.ES]: "Кофе (Café) es Masculino.",
            [Language.RU]: "Слово Кофе — Мужского рода."
          }
        ]
      }
    },
    questions: [
      { id: 'q1', type: ExerciseType.DRAG_DROP, prompt: "Дом", correctAnswer: "m", genderGroup: "m", hint: { [Language.EN]: "Ends in consonant", [Language.FR]: "Se termine par une consonne", [Language.ES]: "Termina en consonante", [Language.RU]: "Заканчивается на согласный" } },
      { id: 'q2', type: ExerciseType.DRAG_DROP, prompt: "Окно", correctAnswer: "n", genderGroup: "n", hint: { [Language.EN]: "Ends in -O", [Language.FR]: "Se termine par -O", [Language.ES]: "Termina en -O", [Language.RU]: "Заканчивается на -О" } },
      { id: 'q3', type: ExerciseType.DRAG_DROP, prompt: "Мама", correctAnswer: "f", genderGroup: "f", hint: { [Language.EN]: "She", [Language.FR]: "Elle", [Language.ES]: "Ella", [Language.RU]: "Она" } },
      { id: 'q6', type: ExerciseType.DRAG_DROP, prompt: "Папа", correctAnswer: "m", genderGroup: "m", hint: { [Language.EN]: "Biological male", [Language.FR]: "Homme biologique", [Language.ES]: "Hombre biológico", [Language.RU]: "Обозначает мужчину" } },
      { id: 'q7', type: ExerciseType.DRAG_DROP, prompt: "Россия", correctAnswer: "f", genderGroup: "f" },
      { id: 'q8', type: ExerciseType.DRAG_DROP, prompt: "Море", correctAnswer: "n", genderGroup: "n" },
      { id: 'q11', type: ExerciseType.DRAG_DROP, prompt: "Семья", correctAnswer: "f", genderGroup: "f" },
      { id: 'q12', type: ExerciseType.DRAG_DROP, prompt: "Стол", correctAnswer: "m", genderGroup: "m" },
      { id: 'q13', type: ExerciseType.DRAG_DROP, prompt: "Кофе", correctAnswer: "m", genderGroup: "m", hint: { [Language.EN]: "Exception", [Language.FR]: "Exception", [Language.ES]: "Excepción", [Language.RU]: "Исключение (он)" } },
      { id: 'q14', type: ExerciseType.DRAG_DROP, prompt: "Имя", correctAnswer: "n", genderGroup: "n", hint: { [Language.EN]: "Ends in -мя", [Language.FR]: "Se termine par -мя", [Language.ES]: "Termina en -мя", [Language.RU]: "Заканчивается на -мя" } },
    ]
  },
  {
    id: 'plurals',
    title: {
      [Language.EN]: "Plural Forms",
      [Language.FR]: "Le Pluriel",
      [Language.ES]: "El Plural",
      [Language.RU]: "Множественное число",
    },
    description: {
      [Language.EN]: "Learn to form plurals for regular and irregular nouns.",
      [Language.FR]: "Apprenez à former le pluriel des noms réguliers et irréguliers.",
      [Language.ES]: "Aprende a formar plurales para sustantivos regulares e irregulares.",
      [Language.RU]: "Учимся образовывать множественное число существительных.",
    },
    icon: "Users",
    difficulty: 2,
    theory: {
      intro: {
        [Language.EN]: "To make a noun plural in Russian, you typically change the ending. The ending depends on the gender and the last letter of the singular word.",
        [Language.FR]: "Pour mettre un nom au pluriel en russe, on change généralement la terminaison. La terminaison dépend du genre et de la dernière lettre du mot au singulier.",
        [Language.ES]: "Para poner un sustantivo en plural en ruso, normalmente cambias la terminación. La terminación depende del género y la última letra de la palabra en singular.",
        [Language.RU]: "Чтобы поставить существительное во множественное число, обычно меняют окончание. Окончание зависит от рода и последней буквы слова.",
      },
      sections: [
        {
          title: { [Language.EN]: "Hard Endings (-Ы)", [Language.FR]: "Terminaisons Dures (-Ы)", [Language.ES]: "Terminaciones Duras (-Ы)", [Language.RU]: "Твердые окончания (-Ы)" },
          pronoun: "ОНИ",
          color: "bg-blue-100 border-blue-500 text-blue-900",
          rules: [
            { ending: "Consonant (M)", example: "Стол -> Столы" },
            { ending: "-А (F)", example: "Мама -> Мамы" }
          ]
        },
        {
          title: { [Language.EN]: "Soft / Spelling Rule (-И)", [Language.FR]: "Terminaisons Molles (-И)", [Language.ES]: "Terminaciones Suaves (-И)", [Language.RU]: "Мягкие / Правило 7 букв (-И)" },
          pronoun: "ОНИ",
          color: "bg-green-100 border-green-500 text-green-900",
          rules: [
            { ending: "-Й, -Ь (M)", example: "Музей -> Музеи" },
            { ending: "-Я, -Ь (F)", example: "Семья -> Семьи" },
            { ending: "Г, К, Х...", example: "Книга -> Книги" }
          ]
        },
        {
          title: { [Language.EN]: "Neuter Plurals", [Language.FR]: "Pluriel Neutre", [Language.ES]: "Plurales Neutros", [Language.RU]: "Средний род (Мн.ч.)" },
          pronoun: "ОНИ",
          color: "bg-yellow-100 border-yellow-500 text-yellow-900",
          rules: [
            { ending: "-О -> -А", example: "Окно -> Окна" },
            { ending: "-Е -> -Я", example: "Море -> Моря" }
          ]
        }
      ],
      exceptions: {
        title: { [Language.EN]: "Common Irregular Forms", [Language.FR]: "Formes irrégulières courantes", [Language.ES]: "Formas irregulares comunes", [Language.RU]: "Частые исключения" },
        items: [
          { [Language.EN]: "Дом -> Дома (House -> Houses)", [Language.FR]: "Дом -> Дома", [Language.ES]: "Дом -> Дома", [Language.RU]: "Дом -> Дома" },
          { [Language.EN]: "Город -> Города (City -> Cities)", [Language.FR]: "Город -> Города", [Language.ES]: "Город -> Города", [Language.RU]: "Город -> Города" },
          { [Language.EN]: "Друг -> Друзья (Friend -> Friends)", [Language.FR]: "Друг -> Друзья", [Language.ES]: "Друг -> Друзья", [Language.RU]: "Друг -> Друзья" },
          { [Language.EN]: "Человек -> Люди (Person -> People)", [Language.FR]: "Человек -> Люди", [Language.ES]: "Человек -> Люди", [Language.RU]: "Человек -> Люди" },
          { [Language.EN]: "Ребёнок -> Дети (Child -> Children)", [Language.FR]: "Ребёнок -> Дети", [Language.ES]: "Ребёнок -> Дети", [Language.RU]: "Ребёнок -> Дети" }
        ]
      }
    },
    questions: [
      { id: 'p1', type: ExerciseType.DRAG_DROP, prompt: "Стол", correctAnswer: "y", hint: { [Language.EN]: "Hard consonant (M)", [Language.FR]: "Consonne dure (M)", [Language.ES]: "Consonante dura (M)", [Language.RU]: "Согласный (Мужской)" } },
      { id: 'p2', type: ExerciseType.DRAG_DROP, prompt: "Лампа", correctAnswer: "y", hint: { [Language.EN]: "Ends in -A (Hard)", [Language.FR]: "Se termine par -A (Dur)", [Language.ES]: "Termina en -A (Dura)", [Language.RU]: "На -А" } },
      { id: 'p3', type: ExerciseType.DRAG_DROP, prompt: "Музей", correctAnswer: "i", hint: { [Language.EN]: "Ends in -Й (Soft)", [Language.FR]: "Se termine par -Й (Mou)", [Language.ES]: "Termina en -Й (Suave)", [Language.RU]: "На -Й" } },
      { id: 'p4', type: ExerciseType.DRAG_DROP, prompt: "Окно", correctAnswer: "a", hint: { [Language.EN]: "Neuter -O -> -A", [Language.FR]: "Neutre -O -> -A", [Language.ES]: "Neutro -O -> -A", [Language.RU]: "Средний -О -> -А" } },
      { id: 'p5', type: ExerciseType.DRAG_DROP, prompt: "Море", correctAnswer: "ya", hint: { [Language.EN]: "Neuter -E -> -Я", [Language.FR]: "Neutre -E -> -Я", [Language.ES]: "Neutro -E -> -Я", [Language.RU]: "Средний -Е -> -Я" } },
      { id: 'p6', type: ExerciseType.DRAG_DROP, prompt: "Книга", correctAnswer: "i", hint: { [Language.EN]: "7-letter rule (after Г, К, Х...)", [Language.FR]: "Règle des 7 lettres", [Language.ES]: "Regla de las 7 letras", [Language.RU]: "Правило Г, К, Х -> И" } },
      { id: 'p7', type: ExerciseType.DRAG_DROP, prompt: "Ночь", correctAnswer: "i", hint: { [Language.EN]: "Feminine Soft Sign", [Language.FR]: "Signe mou féminin", [Language.ES]: "Signo suave femenino", [Language.RU]: "Женский род на Ь -> И" } },
      { id: 'p8', type: ExerciseType.DRAG_DROP, prompt: "Семья", correctAnswer: "i", hint: { [Language.EN]: "Ends in -Я -> -И", [Language.FR]: "Se termine par -Я -> -И", [Language.ES]: "Termina en -Я -> -И", [Language.RU]: "На -Я -> -И" } },
      { id: 'p9', type: ExerciseType.DRAG_DROP, prompt: "Студент", correctAnswer: "y", hint: { [Language.EN]: "Hard consonant", [Language.FR]: "Consonne dure", [Language.ES]: "Consonante dura", [Language.RU]: "Согласный" } },
      { id: 'p10', type: ExerciseType.DRAG_DROP, prompt: "Письмо", correctAnswer: "a", hint: { [Language.EN]: "-O -> -A", [Language.FR]: "-O -> -A", [Language.ES]: "-O -> -A", [Language.RU]: "-О -> -А" } },
      { id: 'p11', type: ExerciseType.DRAG_DROP, prompt: "Автобус", correctAnswer: "y" },
      { id: 'p12', type: ExerciseType.DRAG_DROP, prompt: "Парк", correctAnswer: "y" },
    ]
  }
];
