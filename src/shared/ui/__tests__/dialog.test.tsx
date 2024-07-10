import { render } from "@testing-library/react";
import { Dialog } from "../dialog";

describe("Dialog should", () => {
  const props = {
    header: "header",
    footerActions: <>footerActions</>,
    formBody: <>formBody</>,
    open: true,
    onSubmit: jest.fn,
    onClose: jest.fn,
  };

  it("match snapshot", () => {
    const { container } = render(<Dialog {...props} />);

    expect(container).toMatchSnapshot();
  });
});
