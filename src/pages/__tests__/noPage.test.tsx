import { render } from "@testing-library/react";
import { NoPage } from "../noPage";

describe("NoPage page should", () => {
  it("renders", () => {
    const { container } = render(<NoPage />);

    expect(container).toMatchSnapshot();
  });
});
