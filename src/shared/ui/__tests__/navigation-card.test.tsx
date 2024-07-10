import { render } from "@testing-library/react";
import { NavigationCard } from "../navigation-card";

describe("NavigationCard should", () => {
  const props = {
    id: "test-mock-id",
    name: "test-mock-name",
    lastMessage: "test-mock-lastMessage",
    isSelected: false,
    onSelect: jest.fn,
    actions: [],
  };

  it("match snapshot", () => {
    const { container } = render(<NavigationCard {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("match snapshot for selected", () => {
    const { container } = render(<NavigationCard {...props} isSelected />);

    expect(container).toMatchSnapshot();
  });
});
