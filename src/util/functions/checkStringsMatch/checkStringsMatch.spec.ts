import { checkStringsMatch } from "./checkStringsMatch";

describe("checkStringsMatch function", () => {
  it("returns true for two identical strings", () => {
    const str1 = "Hello, world!";
    const str2 = "Hello, world!";
    expect(checkStringsMatch(str1, str2)).toBe(true);
  });

  it("returns false for two strings of different lengths", () => {
    const str1 = "foo";
    const str2 = "foobar";
    expect(checkStringsMatch(str1, str2)).toBe(false);
  });

  it("returns false for two different strings of the same length", () => {
    const str1 = "hello";
    const str2 = "world";
    expect(checkStringsMatch(str1, str2)).toBe(false);
  });

  it("returns true for two empty strings", () => {
    const str1 = "";
    const str2 = "";
    expect(checkStringsMatch(str1, str2)).toBe(true);
  });
});
