import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button from "./button";
import {vi} from "vitest"


describe("Button Component", () => {
  test("renders children correctly", () => {
    render(<Button>click me</Button>);
    
    // /click me/i is a Case-Insensitive Regular Expression. 
    // It is more flexible than a string because it matches "CLICK ME", "click me", etc.
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  test("applies primary classes by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    // .toHaveClass is provided by @testing-library/jest-dom.
    // It checks the element's classList for a partial match.
    expect(button).toHaveClass("bg-blue-500");
  });

  test("triggers onClick when clicked", async () => {
    // userEvent.setup() starts a session that simulates realistic browser events 
    // (like hover, focus, and click) rather than just triggering a single event.
    const user = userEvent.setup();
    
    // jest.fn() creates a "Mock Function." It doesn't do anything, but it 
    // tracks how many times it was called and with what arguments.
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click</Button>);
    
    // Interaction is Asynchronous. We 'await' the click because user-event 
    // simulates the time it takes for a real browser to process events.
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when the prop is passed", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    
    // .toBeDisabled() checks both the HTML attribute 'disabled' 
    // and ARIA states to ensure the button is truly non-interactive.
    expect(button).toBeDisabled();
  });

  test("forwards the ref to the underlying button element", () => {
    // React.createRef<HTMLButtonElement>() is a TS Generic. 
    // It tells TypeScript "this ref will eventually point to a Button element."
    const ref = React.createRef<HTMLButtonElement>();
    
    render(<Button ref={ref}>Ref Button</Button>);
    
    // ref.current is null initially. After render, it should point to the DOM node.
    // We check .tagName to verify it's the <button> and not a wrapper <div>.
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});