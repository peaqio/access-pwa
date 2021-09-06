export function getText(isLocked: boolean, state: string): string {
  if (isLocked) {
    return 'Locked';
  } else if (state === 'unlocked' || state === 'almostLocked') {
    return 'Unlocked';
  } else {
    return 'Locked';
  }
}
