export const actions = {
  HIDE_ERROR: 'HIDE_ERROR',
  DISPLAY_ERROR: 'DISPLAY_ERROR',
};

export const HIDE_ERROR = () => ({
  type: actions.HIDE_ERROR,
});

export const DISPLAY_ERROR = (status: number, isConnectionError: boolean) => ({
  type: actions.DISPLAY_ERROR,
  status,
  isConnectionError,
});
