export const verifyPasscode = (
  userPasscode: string,
  passcode: string
): boolean => {
  const hasInputs = !!userPasscode && !!passcode;
  const isMatch = userPasscode === passcode;
  const isCorrectLength =
    userPasscode?.length >= 10 &&
    userPasscode?.length <= 20 &&
    passcode?.length >= 10 &&
    passcode?.length <= 20;

  return hasInputs && isMatch && isCorrectLength;
};
