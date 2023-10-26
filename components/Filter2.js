import React from "react";
import { Image, View } from "react-native";

const Filter2 = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight }
    },
    leftEyePosition,
    rightEyePosition,
    noseBasePosition
  }
}) => {
  const filterWidth = faceWidth * 3.5;
  const filterHeight = faceHeight * 1.2;

  const transformAngle = (
    angleRad = Math.atan(
      (rightEyePosition.y - leftEyePosition.y) /
        (rightEyePosition.x - leftEyePosition.x)
    )
  ) => (angleRad * 180) / Math.PI;

  return (
    <View
      style={{
        position: "absolute",
        left: leftEyePosition.x - filterWidth * 0.46,
        right: rightEyePosition.x - filterWidth * 0.15,
        top: noseBasePosition.y - filterHeight * 0.7
      }}
    >
      <Image
        source={require("../assets/crown-pic2.png")}
        style={{
          width: filterWidth,
          height: filterHeight,
          resizeMode: "contain",
          transform: [{ rotate: `${transformAngle()}deg` }]
        }}
      />
    </View>
  );
};

export default Filter2;
