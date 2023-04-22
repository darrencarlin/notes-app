import Input from "@/components/inputs/Input";
import { render, fireEvent } from "@testing-library/react";

describe("Input component", () => {
  it("should render with default props", () => {
    const { getByTestId } = render(<Input data-testid="input" />);
    expect(getByTestId("input")).toHaveClass("w-full bg-gray-700 p-4 mb-4");
  });

  it("should apply custom class name", () => {
    const { getByTestId } = render(
      <Input data-testid="input" className="my-custom-class" />
    );
    expect(getByTestId("input")).toHaveClass("my-custom-class");
  });

  it("should handle change event", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input data-testid="input" onChange={onChange} />
    );
    const input = getByTestId("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test value" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("test value");
  });
});
