import { render } from "@testing-library/react";
import { ChatMessage } from "../chat-message";

describe("ChatMessage should", () => {
  const props = {
    message: {
      content: "content",
      creator: {
        id: "123",
        firstName: "mock-user-first-name",
        email: "mock-user-email",
        name: "mock-user-name",
        createdAt: "2024-06-07T20:10:04.000Z",
        chats: [],
      },
      chatId: "chatId",
      createdAt: "2024-06-07T20:10:04.000Z",
    },
    isOwnMessage: true,
  };

  it("match snapshot", () => {
    const { container } = render(<ChatMessage {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("match snapshot when not own message", () => {
    const { container } = render(
      <ChatMessage {...props} isOwnMessage={false} />
    );

    expect(container).toMatchSnapshot();
  });
});
