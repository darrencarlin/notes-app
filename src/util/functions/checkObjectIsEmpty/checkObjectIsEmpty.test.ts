import { checkIfObjectIsEmpty } from "./checkObjectIsEmpty";

describe("checkIfObjectIsEmpty function", () => {
  it("returns true for an empty object", () => {
    const obj = {};
    expect(checkIfObjectIsEmpty(obj)).toBe(true);
  });

  it("returns false for an object with properties", () => {
    const obj = { prop1: "value1", prop2: "value2" };
    expect(checkIfObjectIsEmpty(obj)).toBe(false);
  });

  it("returns true for an empty array", () => {
    const arr: never[] = [];
    expect(checkIfObjectIsEmpty(arr)).toBe(true);
  });

  it("returns false for an array with elements", () => {
    const arr = [1, 2, 3];
    expect(checkIfObjectIsEmpty(arr)).toBe(false);
  });
});
