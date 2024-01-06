import { sum } from "../components/sUm";

test("Checks Sum", () => {
  const result = sum(3, 4);
  expect(result).toBe(7);
});
