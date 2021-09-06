export function getColor(isLocked: boolean, state: string): string {
  if (isLocked) {
    return 'blue';
  } else if (state === 'unlocked') {
    return 'green';
  } else if (state === 'almostLocked') {
    return 'orange';
  } else {
    return 'red';
  }
}
