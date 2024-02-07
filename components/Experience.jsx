"use client";
import {
  PresentationControls,
  Stage,
  Box,
  RoundedBox,
  useTexture,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

export const Experience = ({
  stepHeight,
  stepWidth,
  stepDepth,
  numSteps,
  riserThickness,
  treadThickness,
  nosing,
  material,
}) => {
  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full bg-black flex items-center justify-center text-white text-9xl">
            Loading...
          </div>
        }
      >
        <Canvas className="w-full h-full">
          <PresentationControls>
            <Stage preset={"portrait"} environment={"city"}>
              <Stair
                stepHeight={stepHeight}
                stepWidth={stepWidth}
                stepDepth={stepDepth}
                numSteps={numSteps}
                riserThickness={riserThickness}
                treadThickness={treadThickness}
                nosing={nosing}
                material={material}
              />
            </Stage>
          </PresentationControls>
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
};

const Stair = ({
  stepHeight,
  stepWidth,
  stepDepth,
  numSteps,
  riserThickness,
  treadThickness,
  nosing,
  material,
}) => {
  const treadMaterial = useTexture({
    map: "/laminate_floor/textures/laminate_floor_02_disp_1k.jpg",
    normalMap: "/laminate_floor/textures/laminate_floor_02_nor_gl_1k.jpg",
    aoMap: "/laminate_floor/textures/laminate_floor_02_arm_1k.jpg",
    roughnessMap: "/laminate_floor/textures/laminate_floor_02_arm_1k.jpg",
    displacementMap: "/laminate_floor/textures/laminate_floor_02_disp_1k.jpg",
  });
  const wood = useTexture({
    map: "wood_floor/textures/wood_floor_disp_1k.jpg",
    normalMap: "wood_floor/textures/wood_floor_nor_gl_1k.jpg",
    aoMap: "wood_floor/textures/wood_floor_arm_1k.jpg",
    roughnessMap: "wood_floor/textures/wood_floor_rough_1k.jpg",
    displacementMap: "wood_floor/textures/wood_floor_disp_1k.jpg",
  });
  return (
    <>
      {Array(Math.floor(numSteps))
        .fill(null)
        .map((_, i) => (
          <>
            <Box
              position={[0, i * stepHeight, i * -stepDepth]}
              args={[stepWidth, stepHeight, riserThickness]}
            >
              {material === "wood" ? (
                <meshStandardMaterial {...wood} />
              ) : (
                <meshStandardMaterial {...treadMaterial} />
              )}
            </Box>
            <RoundedBox
              radius={5}
              position={[
                0,
                i * stepHeight + stepHeight * 0.5 + treadThickness * 0.5,
                i * -stepDepth - stepDepth * 0.5 + nosing * 0.5,
              ]}
              args={[stepWidth, treadThickness, stepDepth + nosing]}
            >
              {material === "wood" ? (
                <meshStandardMaterial {...wood} attach={'material'} />
              ) : (
                <meshStandardMaterial {...treadMaterial} attach={'material'} />
              )}
            </RoundedBox>
          </>
        ))}
    </>
  );
};
