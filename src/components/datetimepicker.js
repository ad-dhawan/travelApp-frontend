import React from 'react';
import { View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AppDateTimePicker = (props) => {
  const _hideDateTimePicker = () => {
    console.log("ewdatetimepicker.js : In _hideDateTimePicker");
    console.log("Mod is - ", props.modeEwDateTimePicker);
    console.log("For Element is - ", props.elementKey);

    props._hideEwDateTimePicker(props.elementKey, props.modeEwDateTimePicker);
  };

  const _handleDateTimePicked = (date) => {
    console.log("ewdatetimepicker.js : In _handleDateTimePicked");
    console.log("Returned value is - ", date);
    console.log("Mod is - ", props.modeEwDateTimePicker);
    console.log("For Element is - ", props.elementKey);
    props._handleEwDateTimePicked(date, props.modeEwDateTimePicker, props.elementKey);
    _hideDateTimePicker();
  };

  return (
    <View>
      <DateTimePicker
        isVisible={props.isEwDateTimePickerVisible}
        mode={props.modeEwDateTimePicker}
        onConfirm={_handleDateTimePicked}
        onCancel={_hideDateTimePicker}
        minimumDate={props.minDateTimePicker}
        maximumDate={props.maxDateTimePicker}
        date={props.setDateTimePicker}
        is24Hour={props.set24TimeFormat}
      />
    </View>
  );
}

export default AppDateTimePicker;
