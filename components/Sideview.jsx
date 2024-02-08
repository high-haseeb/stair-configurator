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
  const scale = Math.max(1 / numSteps * 5, 0.1)
  const centerX = canvas.current.width / 2;
  const centerY = canvas.current.height / 2;

  const scaledStepHeight = stepHeight * scale;
  const scaledStepDepth = stepDepth * scale;
  const scaledRiserThickness = riserThickness * scale;
  const scaledTreadThickness = treadThickness * scale;
  const scaledNosing = nosing * scale;

  const verticalOffset = centerY + (numSteps * scaledStepHeight + (numSteps - 1)) / 2;
  const horizontalOffset = centerX - (numSteps * scaledStepDepth + (numSteps - 1)) / 2;

  for (let i = 0; i < numSteps; i++) {
    const riserX = horizontalOffset + i * scaledStepDepth;
    const riserY = verticalOffset - (i + 1) * scaledStepHeight - (i * scaledTreadThickness) + scaledTreadThickness;  
    const treadX = riserX - scaledNosing;
    const treadY = verticalOffset - (i + 1) * scaledStepHeight - (i * scaledTreadThickness);
    ctx.strokeRect(riserX, riserY, scaledRiserThickness, scaledStepHeight);
    ctx.strokeRect(treadX, treadY, scaledStepDepth + scaledNosing + scaledRiserThickness, scaledTreadThickness);
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
