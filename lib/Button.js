/* Switch Button Component class
 */
import React from 'react';
import { Image, TouchableOpacity, View,Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

// const getIcon = (type, active) => {
//     let icn;
//     switch (type) {
//     case 'Open':
//         icn = active
//             ? require('./assets/slider/active/notstarted.png')
//             : require('./assets/slider/inactive/notstarted.png');
//         break;
//     case 'In Progress':
//         icn = active
//             ? require('./assets/slider/active/inprogress.png')
//             : require('./assets/slider/inactive/inprogress.png');
//         break;
//     case 'Complete':
//         icn = active
//             ? require('./assets/slider/active/complete.png')
//             : require('./assets/slider/inactive/complete.png');
//         break;
//     }
//     return icn;
// };


const getText = (type, active) => {
    let icn;
    // console.warn(type)
    switch (type) {
    case 'Auto':
        icn = "Manual"
        break;
    case 'Manual':
        icn = "Auto"
        break
    }
    return icn;
};


const Button = props => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPress}
                style={[styles.buttonStyle,{top:props.topValue  }]}
            >
            <Text style={{color:props.textColor,fontFamily:'Helvetica',fontSize:15}}>{props.type}</Text>
                {/* <Image source={getIcon(props.type, props.active)} /> */}
            </TouchableOpacity>
        </View>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func,
    topValue:PropTypes.number,
    textColor:PropTypes.string
};

Button.defaultProps = {
    active: false,
    topValue:0
};

export default Button;
