import { isDeepEqual } from "./deepEqual";

describe("isDeepEqual function", () => {
  it("returns true for two empty objects", () => {
    const obj1 = {};
    const obj2 = {};
    expect(isDeepEqual(obj1, obj2)).toBe(true);
  });

  it("returns true for two objects with the same properties and values", () => {
    const obj1 = { a: 1, b: "hello", c: { d: true } };
    const obj2 = { a: 1, b: "hello", c: { d: true } };
    expect(isDeepEqual(obj1, obj2)).toBe(true);
  });

  it("returns false for two objects with different property values", () => {
    const obj1 = { a: 1, b: "hello", c: { d: true } };
    const obj2 = { a: 1, b: "world", c: { d: true } };
    expect(isDeepEqual(obj1, obj2)).toBe(false);
  });

  it("returns false for two objects with different property names", () => {
    const obj1 = { a: 1, b: "hello" };
    const obj2 = { x: 1, y: "hello" };
    expect(isDeepEqual(obj1, obj2)).toBe(false);
  });

  it("returns false for an object and null", () => {
    const obj1 = { a: 1, b: "hello" };
    const obj2 = null;
    expect(isDeepEqual(obj1, obj2)).toBe(false);
  });

  it("returns false for an object and undefined", () => {
    const obj1 = { a: 1, b: "hello" };
    const obj2 = undefined;
    expect(isDeepEqual(obj1, obj2)).toBe(false);
  });
});
