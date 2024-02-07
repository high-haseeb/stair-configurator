"use client";
import React, { useEffect, useRef } from "react";
import { useControls } from "leva";

const TwoD = ({stepHeight, stepWidth, stepDepth, numSteps}) => {
  const canvas = useRef();
  const factor = 20;
  const drawStep = (ctx, x, y , i) => {
    ctx.fillRect(x + 10, y + 500, stepDepth * factor, stepHeight * factor);
  };
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = canvas.current.clientWidth;
    canvas.current.height = canvas.current.clientHeight;
    ctx.imageSmoothingEnabled = false;
    for(let  i = 0; i < numSteps; i++){
      drawStep(ctx, factor * stepDepth * i, -factor * stepHeight * i, i);
    }
  }, [stepDepth, stepHeight, numSteps]);

  return <canvas ref={canvas} className="w-full h-full"></canvas>;
};

export default TwoD;
