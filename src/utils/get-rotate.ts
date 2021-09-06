export function getRotate(isLocked: boolean, state: string): string {
  if (isLocked) {
    return 'translate(-50%, 35%)';
  } else if (state === 'unlocked' || state === 'almostLocked') {
    return 'rotate(-25deg) translate(-50%, -50%)';
  } else {
    return 'translate(-50%, 35%)';
  }
}
