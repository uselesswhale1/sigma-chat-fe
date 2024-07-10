import { fireEvent, render, screen } from "@testing-library/react";
import { ChatInput } from "../chat-input";
import userEvent from "@testing-library/user-event";

describe("ChatInput should", () => {
  it("match snapshot", () => {
    const enterMock = jest.fn;
    const { container } = render(
      <ChatInput initial="123-321" onEnter={enterMock} />
    );

    expect(container).toMatchSnapshot();
  });

  it("handle text enter", () => {
    const enterMock = jest.fn();

    render(<ChatInput onEnter={enterMock} />);

    const input = screen.getByTestId("chat-test-input");
    const inputBox = screen.getByTestId("chat-test-wrapper");
    const enterBtn = screen.getByTestId("chat-enter-button");

    fireEvent.change(input, { target: { value: "abcc" } });

    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter", charCode: 13 });

    expect(enterMock).toBeCalledWith("abcc");

    fireEvent.change(input, { target: { value: "ha-haa" } });

    enterBtn.click();

    expect(enterMock).toBeCalledWith("ha-haa");
  });
});
