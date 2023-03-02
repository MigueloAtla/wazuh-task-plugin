import {describe, expect, test} from '@jest/globals';
import { sum } from "./calculator";
describe("Calculator tests", () => {
    it("should return sum correctly", () => {
        expect(sum(2, 3)).toBe(5);
    });
    
    it("should return sum correctly with negative number", () => {
        expect(sum(-2, 3)).toBe(1);
    });
});

it('runs the first test', () => {
    expect(true).toBe(true);
  });