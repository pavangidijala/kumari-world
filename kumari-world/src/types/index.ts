export type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked"
  | "answered_marked";

export interface MockQuestion {
  id: string;
  section: string;
  questionText: string;
  options: { key: string; text: string }[];
  correctOption: string;
}

export interface MockSection {
  name: string;
  questionCount: number;
}

export interface MockTestMeta {
  id: string;
  title: string;
  durationMins: number;
  negativeMark: number;
  sections: MockSection[];
  questions: MockQuestion[];
}

export interface QuestionState {
  selected: string | null;
  status: QuestionStatus;
  timeSpentSec: number;
}
