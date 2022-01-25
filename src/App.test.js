import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Inbox Screen", () => {
  render(<App />);
  const headline = document.querySelector(".title-page");
  expect(headline).toBeInTheDocument();
});
