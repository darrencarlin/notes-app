import React from "react";
import { screen, render } from "@testing-library/react";
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
    render(
      <Screen>
        <div>Hello World</div>
      </Screen>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
