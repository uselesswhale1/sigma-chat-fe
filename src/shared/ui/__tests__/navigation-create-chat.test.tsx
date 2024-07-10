import { render, screen } from "@testing-library/react";
import { NavigationCreateChat } from "../navigation-create-chat";
import userEvent from "@testing-library/user-event";

jest.mock("../../../widgets", () => ({
  CreateChatModal: () => <>CreateChatModal</>,
}));

describe("NavigationCreateChat should", () => {
  const props = {
    onCreate: jest.fn,
  };

  it("match snapshot", () => {
    const { container } = render(<NavigationCreateChat {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("match snapshot with dialog", () => {
    const { container } = render(<NavigationCreateChat {...props} />);

    const btn = screen.getByTestId("create-new-chat-test");

    userEvent.click(btn);

    expect(container).toMatchSnapshot();
  });
});
