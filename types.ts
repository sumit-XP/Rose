
export type MessageMood = 'Sincere' | 'Playful' | 'Poetic';

export interface PoemResponse {
  poem: string;
  title: string;
}

export interface RoseReason {
  id: number;
  text: string;
  color: string;
}
