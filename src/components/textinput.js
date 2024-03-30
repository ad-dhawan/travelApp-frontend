import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { PLACEHOLDER_COLOR, TEXT, TEXTINPUT_UNFOCUSED } from '../utils/colors';

/**
 * <EwTextInput
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

const EwTextInput = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  secureText = false,
  leftIcon = null,
  rightIcon = null,
  onPressRightIcon = () => {},
  customStyle = {},
  maxLength = null,
  keyboardType = 'default',
  editable = true
}) => {
  const renderLeftIcon = () => {
    if (leftIcon) {
      return <View style={{ marginRight: 8 }}>{leftIcon}</View>;
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
          paddingHorizontal: 12
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
        style={{ flex: 1, fontSize: 20, paddingVertical: 12, color: TEXT }}
        maxLength={maxLength}
        keyboardType={keyboardType}
        placeholderTextColor={PLACEHOLDER_COLOR}
        editable={editable}
        
      />
      {renderRightIcon()}
    </View>
  );
};

export default EwTextInput;
