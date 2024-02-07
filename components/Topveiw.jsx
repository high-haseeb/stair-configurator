import { useRef, useEffect } from "react";

const Topveiw = ({
  stepWidth,
  stepDepth,
  numSteps,
  nosing,
  ...props
}) => {
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const centerX = canvas.current.width / 2;
    const centerY = canvas.current.height / 2;

    // Set canvas size
    canvas.current.width = canvas.current.clientWidth;
    canvas.current.height = canvas.current.clientHeight;

    // Set canvas properties
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Calculate scaleFactor
    const scaleFactor = 4;
    const scaledStepWidth = stepWidth / scaleFactor;
    const scaledStepDepth = stepDepth / scaleFactor;

    // Draw rounded rectangles for each step
    const totalHeight = numSteps * (scaledStepDepth + nosing);
    for (let i = 0; i < numSteps; i++) {
      const stepY = centerY - totalHeight / 2 + i * (scaledStepDepth + nosing);
      ctx.beginPath();
      ctx.roundRect(
        centerX - scaledStepWidth / 2,
        stepY,
        scaledStepWidth,
        scaledStepDepth + nosing,
        [10, 10, 0, 0]
      );
      ctx.stroke();
    }
  }, [stepWidth, stepDepth, numSteps, nosing]);

  return (
    <div {...props}>
      Topveiw
      <canvas ref={canvas} className="w-full h-full"></canvas>
    </div>
  );
};

export default Topveiw;
