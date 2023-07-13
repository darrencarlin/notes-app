import { bookmarkUrl } from "@/util/functions";
import { BASE_URL } from "@/util/constants";

describe("bookmarkUrl", () => {
  it("returns the correct URL", () => {
    const userId = "123";
    const passcode = "abc";
    const expectedUrl = `${BASE_URL}/?userId=123&passcode=abc`;
    expect(bookmarkUrl(userId, passcode)).toEqual(expectedUrl);
  });
});
