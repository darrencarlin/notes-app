import React from "react";
import { screen, render } from "@testing-library/react";
import ScreenLayout from "@/components/layout/AppLayout";

describe("Screen", () => {
  it("renders without crashing", () => {
    render(
      <ScreenLayout>
        <div>Hello World</div>{" "}
      </ScreenLayout>
    );
  });

  it("renders children", () => {
    render(
      <ScreenLayout>
        <div>Hello World</div>
      </ScreenLayout>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
