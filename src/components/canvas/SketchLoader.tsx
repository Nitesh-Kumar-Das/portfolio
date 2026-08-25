/** Placeholder holding the canvas's exact box so nothing shifts on load. */
export function SketchLoader() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center"
    >
      <div className="h-24 w-24 rounded-wobbly-sm border-2 border-dashed border-pencil/30" />
    </div>
  );
}
