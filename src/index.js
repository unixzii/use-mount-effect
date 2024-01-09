import { useEffect, useRef } from "react";

const scheduleCallback = (() => {
  if (typeof window === "undefined" || !window.MessageChannel) {
    // Fallback implementation in non-browser environments.
    return (cb) => {
      setTimeout(cb, 0);
    };
  }

  const channel = new MessageChannel();
  let head = [null, null];
  let tail = head;
  channel.port1.onmessage = () => {
    const cb = head[0];
    if (cb) {
      head = head[1];
      cb();
    }
  };
  return (cb) => {
    const nextNode = [null, null];
    tail[0] = cb;
    tail[1] = nextNode;
    tail = nextNode;
    channel.port2.postMessage(0);
  };
})();

export function useMountEffect(cb) {
  const state = useRef({
    mounted: false,
    cleanup: null,
    scheduledCleanups: [],
  });

  useEffect(() => {
    const invokeCleanup = () => {
      const cleanup = state.current.cleanup;
      if (!cleanup) {
        return;
      }

      const cancellationToken = { value: false };
      scheduleCallback(() => {
        if (cancellationToken.value) {
          return;
        }

        cleanup();
      });

      state.current.scheduledCleanups.push(cancellationToken);
    };

    if (state.current.mounted) {
      // Ignore the second invocation in DEV but cancel the
      // scheduled cleanups.
      state.current.scheduledCleanups.forEach((t) => {
        t.value = true;
      });
      state.current.scheduledCleanups = [];
      return invokeCleanup;
    }

    state.current.mounted = true;
    state.current.cleanup = cb();

    return invokeCleanup;
  }, []);
}
