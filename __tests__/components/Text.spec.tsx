import { screen, render } from "@testing-library/react";
import Text from "@/components/Text";

describe("Text component", () => {
  it("should render with default props", () => {
    render(<Text>Hello world!</Text>);
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toHaveClass("text-white");
  });

  it("should render with gray color", () => {
    render(<Text color="gray">Hello world!</Text>);
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toHaveClass("text-gray-700");
  });
});
