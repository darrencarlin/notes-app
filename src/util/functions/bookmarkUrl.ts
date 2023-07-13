import { BASE_URL } from "../constants";

export const bookmarkUrl = (userId: string, passcode: string): string =>
  `${BASE_URL}/?userId=${userId}&passcode=${passcode}`;
