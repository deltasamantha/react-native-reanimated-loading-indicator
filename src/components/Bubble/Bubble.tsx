import React from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {styles} from './Bubble.styles';

interface Props {
  progress: Animated.Value<number>;
  bubble: number;
  delta: number;
  count: number;
  width: number;
  height: number;
  radius: number;
  centerX: number;
  centerY: number;
  color: string;
}

const Bubble: React.FC<Props> = ({
  progress,
  bubble,
  delta,
  count,
  width,
  height,
  radius,
  centerX,
  centerY,
  color,
}: Props) => {
  const start = bubble * delta;
  const end = start + delta;
  const opacity = interpolate(progress, {
    inputRange: [start, end],
    outputRange: [0.2, 0.6],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={[
        styles.item,
        {backgroundColor: color},
        {width: width, height: height, borderRadius: height / 2},
        {
          left:
            centerX -
            radius * Math.cos((2 * bubble * Math.PI) / count) +
            (width / 2) * Math.cos((2 * bubble * Math.PI) / count),
          top:
            centerY -
            radius * Math.sin((2 * bubble * Math.PI) / count) +
            (width / 2) * Math.sin((2 * bubble * Math.PI) / count),
        },
        {opacity: opacity},
        {transform: [{rotate: `${(2 * bubble * Math.PI) / count}rad`}]},
      ]}
    />
  );
};

export default Bubble;
