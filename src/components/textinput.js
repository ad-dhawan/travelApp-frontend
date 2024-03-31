import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { PLACEHOLDER_COLOR, TEXT, TEXTINPUT_UNFOCUSED } from '../utils/colors';

/**
 * <AppTextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        customStyle={{ width: '50%', marginTop: 30 }}
        secureText={hidePassword}
        leftIcon={<Entypo name="lock" size={20} color={TEXTINPUT_ICON} />}
        rightIcon={<Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={20} color={TEXT} />}
        onPressRightIcon={() => setHidePassword(!hidePassword)}
    />
 */

const AppTextInput = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  secureText = false,
  leftIcon = null,
  rightIcon = null,
  onPressRightIcon = () => {},
  customStyle = {},
  customTextStyle = {},
  placeholderColor = PLACEHOLDER_COLOR,
  maxLength = null,
  keyboardType = 'default',
  editable = true
}) => {
  const renderLeftIcon = () => {
    if (leftIcon) {
      return <View style={{ marginRight: 4 }}>{leftIcon}</View>;
    }
    return null;
  };

  const renderRightIcon = () => {
    if (rightIcon) {
    //   return <View style={{ marginLeft: 8 }}>{rightIcon}</View>;
        return(
            <TouchableOpacity onPress={onPressRightIcon} activeOpacity={1} hitSlop={{top: 4, bottom: 4, left: 4, right: 4}} >
                {rightIcon}
            </TouchableOpacity>
        )
    }
    return null;
  };

  return (
    <View
      style={[
        {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: TEXTINPUT_UNFOCUSED,
          paddingHorizontal: 8
        },
        customStyle,
      ]}
    >
      {renderLeftIcon()}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureText}
        style={[{ flex: 1, fontSize: 14, paddingVertical: 6, color: TEXT }, customTextStyle]}
        maxLength={maxLength}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderColor}
        editable={editable}
        
      />
      {renderRightIcon()}
    </View>
  );
};

export default AppTextInput;
