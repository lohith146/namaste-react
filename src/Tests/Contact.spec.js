import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";
import "@testing-library/jest-dom";

it("should load contact us component", () => {
  render(<Contact />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});

it("button is present", () => {
  render(<Contact />);
  const btn = screen.getByText("Submit");
  expect(btn).toBeInTheDocument();
});
