export const verifyPasscode = (userPasscode: string, passcode: string): boolean => {
  const PASSCODE_LENGTH = 10;

  const hasInputs = !!userPasscode && !!passcode;
  const isMatch = userPasscode === passcode;
  const isCorrectLength =
    userPasscode.length === PASSCODE_LENGTH && passcode.length === PASSCODE_LENGTH;

  return hasInputs && isMatch && isCorrectLength;
};
