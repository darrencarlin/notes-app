import { generateRandomString } from "@/util/functions/generateRandomString";

describe("generateRandomString function", () => {
  it("returns a string of the expected length", () => {
    const length = 10;
    const randomString = generateRandomString(length);
    expect(randomString.length).toBe(length);
  });

  it("returns a string that only contains characters from the specified character set", () => {
    const length = 20;
    const randomString = generateRandomString(length);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < randomString.length; i++) {
      const character = randomString.charAt(i);
      expect(characters.includes(character)).toBe(true);
    }
  });
});
