import { IDoor } from './door';

export interface ILockedProps {
  toggleButton: () => void;
  isLocked: boolean;
  time: number;
  currentTime: number;
  selected: IDoor;
  state: 'locked' | 'unlocked' | 'almostLocked';
  closeDoor: () => void;
}
