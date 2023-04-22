import React from "react";
import { render } from "@testing-library/react";
import Screen from "@/components/layout/Screen";

describe("Screen", () => {
  it("renders without crashing", () => {
    render(
      <Screen>
        <div>Hello World</div>{" "}
      </Screen>
    );
  });

  it("renders children", () => {
    const { getByText } = render(
      <Screen>
        <div>Hello World</div>
      </Screen>
    );

    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
