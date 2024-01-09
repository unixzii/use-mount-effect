import { render, cleanup, waitFor } from "@testing-library/react";

import { useMountEffect } from "../src/index";

test("useMountEffect should invoke the callback once on mount", async () => {
  const mountCallback = jest.fn();
  const unmountCallback = jest.fn();

  const TestComponent = () => {
    useMountEffect(() => {
      mountCallback();
      return () => {
        unmountCallback();
      };
    });

    return null;
  };

  render(<TestComponent />);
  await waitFor(() => expect(mountCallback).toHaveBeenCalledTimes(1));

  cleanup();
  await waitFor(() => expect(unmountCallback).toHaveBeenCalledTimes(1));

  // Ensure our callback was called exactly once.
  expect(mountCallback).toHaveBeenCalledTimes(1);
});
