import React, {
  Component,
  PropTypes,
} from 'react';
import {
  DatePickerIOS,
  PickerIOS,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'


const { width: screenWidth } = Dimensions.get('window');

class Picker extends Component {

  render () {
    const {
      pickerType: type,
      pickerProps,
      pickerTitle,
      onDone
    } = this.props;

    const {
      value,
      date,
      initialValue,
      initialDate,
      pickerData,
      pickerItemKey,
      pickerItemValue,
      pickerItemLabel
    } = pickerProps;

    const modifiedPickerProps = {
      ...pickerProps,
      value: value === undefined ? initialValue : value,
      date:  date === undefined  ? initialDate : date
    };

    let Picker;

    if (type === 'date') {
      Picker = (
        <DatePickerIOS
          style = {styles.picker}
          {...modifiedPickerProps}
        />
      );
    } else if (type === 'custom') {
      Picker = (
        <PickerIOS {...modifiedPickerProps} >
          {pickerData.map(elem => {
            return (
              <PickerIOS.Item
                key   = { elem[pickerItemKey] }
                value = { elem[pickerItemValue] }
                label = { elem[pickerItemLabel] }
              />
            )
          })}
        </PickerIOS>
      )
    }
    return (
      <View style = {styles.container} >
        <View style = {styles.pickerHeader} >
          <View style = {styles.done} />
          <Text style = {styles.pickerTitle} >{pickerTitle}</Text>
          <TouchableOpacity style = {styles.done} onPress = {onDone} >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
        <View style = { styles.pickerWrapper }>
          {Picker}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    flexDirection:   'column',
    alignItems:      'stretch',
    backgroundColor: 'white'
  },
    pickerHeader: {
      height:            45,
      flexDirection:     'row',
      justifyContent:    'space-between',
      alignItems:        'center',
      paddingHorizontal: 10,
      borderWidth:       1,
      backgroundColor:   '#E3E3E3'
    },
      pickerTitle: {
        fontSize: 20
      },
      done: {
        width: 40
      },
    pickerWrapper: {
      flex:            1,
      flexDirection:   'column',
      justifyContent:  'center',
      overflow:        'hidden',
      backgroundColor: '#F2F2F2',
      paddingBottom:   10
    },
      picker: {
        alignSelf: 'center'
      }
});

Picker.propTypes = {
  pickerType:  PropTypes.string.isRequired,
  pickerProps: PropTypes.object.isRequired,
  onDone:      PropTypes.func.isRequired,
  pickerTitle: PropTypes.string
};

export default Picker;
