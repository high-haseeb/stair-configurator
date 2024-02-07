"use client";
import React, { useEffect, useRef } from "react";

const Sideveiw = ({
  stepHeight,
  stepWidth,
  stepDepth,
  numSteps,
  riserThickness,
  treadThickness,
  nosing,
  material,
  ...props
}) => {
  const canvas = useRef();

  const drawStep = (ctx, i) => {
    const centerX = canvas.current.width / 2;
    const centerY = canvas.current.height / 2;

    const verticalOffset = centerY + (numSteps * stepHeight + (numSteps - 1)) / 2;
    const horizontalOffset = centerX - (numSteps * stepDepth + (numSteps - 1)) / 2;

    for (let i = 0; i < numSteps; i++) {
      const riserX = horizontalOffset + i * stepDepth;
      const riserY = verticalOffset - (i + 1) * stepHeight - (i * treadThickness) + treadThickness;  
      const treadX = riserX - nosing;
      const treadY = verticalOffset - (i + 1) * stepHeight - (i * treadThickness);
      ctx.strokeRect(riserX, riserY, riserThickness, stepHeight);
      ctx.strokeRect(treadX, treadY, stepDepth + nosing + riserThickness, treadThickness);
    }
  };

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = canvas.current.clientWidth;
    canvas.current.height = canvas.current.clientHeight;

    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    for (let i = 0; i < numSteps; i++) {
      drawStep(ctx, i);
    }
  }, [
    stepHeight,
    stepWidth,
    stepDepth,
    numSteps,
    riserThickness,
    treadThickness,
    nosing,
  ]);

  return (
    <div {...props}>
      <section>Side veiw</section>
      <canvas ref={canvas} className="w-full h-full"></canvas>
    </div>
  );
};

export default Sideveiw;
