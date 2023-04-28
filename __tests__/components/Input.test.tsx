import Input from "@/components/inputs/Input";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Input component", () => {
  it("should render with default props", () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("w-full bg-gray-700 p-4 mb-4");
  });

  it("should apply custom class name", () => {
    render(<Input data-testid="input" className="my-custom-class" />);
    expect(screen.getByTestId("input")).toHaveClass("my-custom-class");
  });
  it("should handle change event", () => {
    const onChange = jest.fn();
    render(<Input data-testid="input" onChange={onChange} />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "test value" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
