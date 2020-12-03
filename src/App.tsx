import React, {useState} from 'react';
import {Button, StatusBar, View} from 'react-native';
import {styles} from './App.styles';
import LoadingIndicator, {
  IndicatorType,
} from './components/LoadingIndicator/LoadingIndicator';
import {colors} from './Theme/Colors';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [type, setType] = useState<IndicatorType>('default');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          {type === 'dot' && (
            <LoadingIndicator
              size={40}
              type="dot"
              color={colors.successColor}
            />
          )}
          {type === 'default' && (
            <LoadingIndicator
              size={40}
              type="default"
              color={colors.darkColor}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Dot"
            onPress={() => {
              setType('dot');
            }}
          />
          <Button
            title="Bar"
            onPress={() => {
              setType('default');
            }}
          />
        </View>
      </View>
    </>
  );
};

export default App;
