import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { PRIMARY_BRAND_1, PRIMARY_BRAND_2 } from '../utils/colors';

/**
 * <AnimatedLogo scale={0.7} playAnimation={false} />
 */

const WIDTH = 28;
const HEIGHT = 95;

const LOGO_COLOR1 = PRIMARY_BRAND_1;
const LOGO_COLOR2 = PRIMARY_BRAND_2;

const EwAnimatedLogo = ({scale, playAnimation = true}) => {
  // const [rectRightAnimatedValue] = useState(new Animated.ValueXY({ x: 48, y: 0 }));
  // const [rectLeftAnimatedValue] = useState(new Animated.ValueXY({ x: -48, y: 0 }));

  // const [circleCenterAnimatedValue] = useState(new Animated.ValueXY({ x: 0, y: 45 }));
  // const [circleRightAnimatedValue] = useState(new Animated.ValueXY({ x: 48, y: 45 }));
  // const [circleLeftAnimatedValue] = useState(new Animated.ValueXY({ x: -48, y: 45 }));

  const [rectRightAnimatedValue] = useState(new Animated.ValueXY({ x: playAnimation ? 48 : 0, y: playAnimation ? 0 : 0 }));
  const [rectLeftAnimatedValue] = useState(new Animated.ValueXY({ x: playAnimation ? -48 : 0, y: playAnimation ? 0 : 0 }));

  const [circleCenterAnimatedValue] = useState(new Animated.ValueXY({ x: playAnimation ? 0 : 0, y: playAnimation ? 45 : 0 }));
  const [circleRightAnimatedValue] = useState(new Animated.ValueXY({ x: playAnimation ? 48 : 0, y: playAnimation ? 45 : 0 }));
  const [circleLeftAnimatedValue] = useState(new Animated.ValueXY({ x: playAnimation ? -48 : 0, y: playAnimation ? 45 : 0 }));


  useEffect(() => {
    if(playAnimation) startAnimation();
  }, [])

  const startAnimation = () => {
      let toValue = 6;
      let duration = 200;
      delay = 0;
      
    Animated.sequence([

        Animated.parallel([
            Animated.timing(rectRightAnimatedValue, {
              toValue: { x: `-${toValue}`, y: 0 },
              duration: duration,
              delay: delay,
              useNativeDriver: true,
            }),
            Animated.timing(rectLeftAnimatedValue, {
              toValue: { x: `${toValue}`, y: 0 },
              duration: duration,
              delay: delay,
              useNativeDriver: true,
            }),
            Animated.timing(circleRightAnimatedValue, {
              toValue: { x: `-${toValue}`, y: 45 },
              duration: duration,
              delay: delay,
              useNativeDriver: true,
            }),
            Animated.timing(circleLeftAnimatedValue, {
              toValue: { x: `${toValue}`, y: 45 },
              duration: duration,
              delay: delay,
              useNativeDriver: true,
            }),
          ]),

          Animated.parallel([
            Animated.timing(circleCenterAnimatedValue, {
              toValue: { x: `-${toValue}`, y: 0 },
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(circleLeftAnimatedValue, {
              toValue: { x: `-${toValue}`, y: 0 },
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(circleRightAnimatedValue, {
              toValue: { x: `-${toValue}`, y: 0 },
              duration: duration,
              useNativeDriver: true,
            }),
          ]),

    ]).start(() => startLoadingAnimation(toValue));

  };

  const startLoadingAnimation = (toValue) => {
    let duration = 180;

  Animated.sequence([
      Animated.timing(circleRightAnimatedValue, {
        toValue: { x: `-${toValue}`, y: -15 },
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(circleRightAnimatedValue, {
        toValue: { x: `-${toValue}`, y: 0 },
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(circleCenterAnimatedValue, {
          toValue: { x: `-${toValue}`, y: -15 },
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(circleCenterAnimatedValue, {
            toValue: { x: `-${toValue}`, y: 0 },
            duration: duration,
            useNativeDriver: true,
          }),
        Animated.timing(circleLeftAnimatedValue, {
          toValue: { x: `-${toValue}`, y: -15 },
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(circleLeftAnimatedValue, {
          toValue: { x: `-${toValue}`, y: 0 },
          duration: duration,
          useNativeDriver: true,
        })
  ]).start(() => startLoadingAnimation())
}


  const containerStyle = [
      styles.containerStyle,
      {
        transform: [{ scale: scale }],
      }
  ]

  const circleStyle = [
    styles.circle,
    {
      transform: [{ translateX: circleCenterAnimatedValue.x }, { translateY: circleCenterAnimatedValue.y }]
    }
  ];

  const circleRightStyle = [
      styles.circle,
      {
        transform: [{ translateX: circleRightAnimatedValue.x }, { translateY: circleRightAnimatedValue.y }]
      }
  ]

  const circleLeftStyle = [
      styles.circle,
      {
        transform: [{ translateX: circleLeftAnimatedValue.x }, { translateY: circleLeftAnimatedValue.y }]
      }
  ]

  const rectangleStyle = [
    styles.rectangle,
  ];

  const rectangleRightStyle = [
    styles.rectangle,
    {
      transform: [{ translateX: rectRightAnimatedValue.x }, { translateY: rectRightAnimatedValue.y }]
    },
  ];

  const rectangleLeftStyle = [
    styles.rectangle,
    {
      transform: [{ translateX: rectLeftAnimatedValue.x }, { translateY: rectLeftAnimatedValue.y }]
    },
  ];


  return (
    <View style={containerStyle}>
      
      <View style={[ styles.itemContainer ]} >
          <Animated.View style={circleRightStyle} />
          <Animated.View style={rectangleRightStyle} />
      </View>
      
      <View style={[ styles.itemContainer, { marginHorizontal: 20 } ]} >
          <Animated.View style={[ circleStyle, { backgroundColor: LOGO_COLOR2 } ]} />
          <Animated.View style={[ rectangleStyle, { backgroundColor: LOGO_COLOR2 } ]} />
      </View>
      
      <View style={[ styles.itemContainer ]} >
          <Animated.View style={circleLeftStyle} />
          <Animated.View style={rectangleLeftStyle} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    circle: {
      alignSelf: 'center',
      width: WIDTH,
      height: WIDTH,
      borderRadius: WIDTH,
      backgroundColor: LOGO_COLOR1,
      marginBottom: 15,
    },
    rectangle: {
      alignSelf: 'center',
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: LOGO_COLOR1,
    },
  });

export default EwAnimatedLogo;
