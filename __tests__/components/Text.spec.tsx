import { render } from "@testing-library/react";
import Text from "@/components/Text";

describe("Text component", () => {
  it("should render with default props", () => {
    const { getByText } = render(<Text>Hello world!</Text>);
    expect(getByText("Hello world!")).toBeInTheDocument();
    expect(getByText("Hello world!")).toHaveClass("text-white");
  });

  it("should render with gray color", () => {
    const { getByText } = render(<Text color="gray">Hello world!</Text>);
    expect(getByText("Hello world!")).toBeInTheDocument();
    expect(getByText("Hello world!")).toHaveClass("text-gray-700");
  });
});
