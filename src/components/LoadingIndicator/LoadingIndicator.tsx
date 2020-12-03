import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  Easing,
  eq,
  not,
  set,
  startClock,
  timing,
  useCode,
  Value,
} from 'react-native-reanimated';
import {colors} from '../../Theme/Colors';
import Bubble from '../Bubble/Bubble';

const runTiming = (clock: Animated.Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(1),
    duration: 800,
    easing: Easing.linear,
  };
  return block([
    cond(not(clockRunning(clock)), startClock(clock)),
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1)),
    ]),
    state.position,
  ]);
};

export type IndicatorType = 'default' | 'dot';

interface Props {
  size: number;
  type?: IndicatorType;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const LoadingIndicator: React.FC<Props> = ({
  size,
  type = 'default',
  color = colors.darkColor,
  containerStyle,
}: Props) => {
  const bubbles = [0, 1, 2, 3, 4, 5, 6, 7];
  const INDICATOR_RADIUS = size / 2;
  const ITEM_WIDTH =
    type === 'dot' ? size / bubbles.length : (2.2 * size) / bubbles.length;
  const ITEM_HEIGHT = size / bubbles.length;
  const CENTER_X = INDICATOR_RADIUS - ITEM_WIDTH / 2;
  const CENTER_Y = INDICATOR_RADIUS - ITEM_HEIGHT / 2;

  const progress = new Value(0);
  const clock = new Clock();
  const delta = 1 / bubbles.length;
  useCode(() => block([set(progress, runTiming(clock))]), []);

  return (
    <View
      style={[
        {
          width: size,
          height: size,
        },
        containerStyle,
      ]}>
      {bubbles.map((bubble) => {
        return (
          <Bubble
            progress={progress}
            color={color}
            bubble={bubble}
            delta={delta}
            count={bubbles.length}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            radius={INDICATOR_RADIUS}
            centerX={CENTER_X}
            centerY={CENTER_Y}
            key={bubble}
          />
        );
      })}
    </View>
  );
};

export default LoadingIndicator;
