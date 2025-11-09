import { Profiler, memo } from "react";

function PerformanceMonitor({ id, children }) {
  const handleProfiler = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    // Log only in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${id} - ${phase}`);
      console.log(`Actual time: ${actualDuration.toFixed(2)}ms`);
      console.log(`Base time: ${baseDuration.toFixed(2)}ms`);
      console.log(
        `Improvement: ${(baseDuration - actualDuration).toFixed(2)}ms`
      );

      // Alert if render time is too high
      if (actualDuration > 16) {
        // 16ms = 60fps threshold
        console.warn(`⚠️ Slow render detected in ${id}`);
      }
    }
  };

  return (
    <Profiler id={id} onRender={handleProfiler}>
      {children}
    </Profiler>
  );
}

export default memo(PerformanceMonitor);
