import { render } from "@testing-library/react";
import { Card } from "../card";

describe("Card should", () => {
  const props = {
    name: "name",
    text: "message",
    header: "header",
  };

  it("match snapshot", () => {
    const { container } = render(<Card {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("match snapshot when reversed", () => {
    const { container } = render(<Card {...props} isReversed />);

    expect(container).toMatchSnapshot();
  });
});
