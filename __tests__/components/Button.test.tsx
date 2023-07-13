import Button from "@/components/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { SlPlus } from "react-icons/sl";

describe("Button", () => {
  it("renders text and icon", () => {
    render(<Button text="Click me" icon={<SlPlus title="icon" />} />);
    const buttonText = screen.getByText("Click me");
    const buttonIcon = screen.getByTitle("icon");
    expect(buttonText).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
  });

  it("renders with default props", () => {
    render(<Button text="Click me" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-gray-600");
    expect(button).not.toHaveClass("bg-gray-600");
    fireEvent.mouseEnter(button);
    expect(button).toHaveClass("hover:border-gray-400");
  });

  it("renders with fullWidth prop", () => {
    render(<Button text="Click me" fullWidth />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  it("renders with backgroundColor prop", () => {
    render(<Button text="Click me" backgroundColor="bg-red-600" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-600");
    expect(button).toHaveClass("text-white");
    fireEvent.mouseEnter(button);
    expect(button).toHaveClass("hover:bg-red-700");
  });

  it("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
