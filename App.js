/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SwitchToggle from 'react-native-switch-toggle';
import MultiSwitch from './lib/MultiSwitch.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOn1: false,
      switchOn2: false,
      switchOn4: false
    };
  }
  
  getButtonText() {
    return this.state.switchOn4 ? 'Hour' : 'Day';
  }
  
  getRightText() {
    return this.state.switchOn4 ? '' : 'Hour';
  }
  
  getLeftText() {
    return this.state.switchOn4 ? 'Day' : '';
  }

  render() {
    return (
      <View style={styles.container}>
<MultiSwitch
height={150}
width={80}
                    currentStatus={'Manual'}
                    disableScroll={value => {
                        console.log('scrollEnabled', value);
                        // this.scrollView.setNativeProps({
                        //     scrollEnabled: value
                        // });
                    }}
                    isParentScrollEnabled={false}
                    onStatusChanged={text => {
                        console.log('Change Status ', text);
                    }}/>








                    
{/*        
        <SwitchToggle
        buttonText={this.getButtonText()}
        backTextRight={this.getRightText()}
        backTextLeft={this.getLeftText()}
          containerStyle={{
            marginTop: 16,
            width: 200,
            height: 65,
            borderRadius: 30,
            padding: 5,
            transform: [{ rotate: '90deg'}]
          }}
          textRightStyle={{fontSize: 20,transform: [{ rotate: '90deg'}]}}
          textLeftStyle={{fontSize: 20,transform: [{ rotate: '90deg'}]}}

          backgroundColorOn='#a0e1e5'
          backgroundColorOff='#e5e1e0'
          circleStyle={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            backgroundColor: 'blue', // rgb(102,134,205)
          }}
          switchOn={this.state.switchOn3}
          onPress={this.onPress3}
          circleColorOff='#ff11ff'
          circleColorOn='green'
          duration={500}
        /> */}
       
      </View>
    );
  }
  onPress1 = () => {
    this.setState({ switchOn1: !this.state.switchOn1 });
  }
  onPress2 = () => {
    this.setState({ switchOn2: !this.state.switchOn2 });
  }
  onPress3 = () => {
    this.setState({ switchOn3: !this.state.switchOn3 });
  }
  onPress4 = () => {
    this.setState({switchOn4: !this.state.switchOn4});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection:'column'
  },
});
