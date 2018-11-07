import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    View,
    Platform,
    Text
} from 'react-native';
import Button from './Button';
import styles from './styles';
const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';

export default class MultiSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false,
            position: new Animated.Value(0),
            posValue: 0,
            selectedPosition: 0,
            duration: 100,
            // mainWidth: width - 30,
            mainWidth: this.props.width,
            mainHeight:this.props.height,
            // switcherWidth: width / 2.7,
            switcherWidth: this.props.width / 1.2,
            thresholdDistance: this.props.width - 8 - this.props.width / 2.4
        };
        this.isParentScrollDisabled = false;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: () => {
                // disable parent scroll if slider is inside a scrollview
                if (!this.isParentScrollDisabled) {
                    this.props.disableScroll(false);
                    this.isParentScrollDisabled = true;
                }
            },

            onPanResponderMove: (evt, gestureState) => {
                let finalValue = gestureState.dy + this.state.posValue;
                if (
                    finalValue >= 0 &&
                    finalValue <= this.state.thresholdDistance
                )
                    this.state.position.setValue(
                        this.state.posValue + gestureState.dy
                    );
            },

            onPanResponderTerminationRequest: () => true,

            onPanResponderRelease: (evt, gestureState) => {
                let finalValue = gestureState.dy + this.state.posValue;
                this.isParentScrollDisabled = false;
                this.props.disableScroll(true);
                if (gestureState.dy > 0) {
                    if (finalValue >= 0 && finalValue <= 30) {
                        this.manualSelected();
                    } else if (finalValue >= 30 && finalValue <= 121) {
                        // this.inProgressSelected();
                    } else if (finalValue >= 121 && finalValue <= 280) {
                        if (gestureState.dy > 0) {
                            this.autoSelected();
                        } else {
                            // this.inProgressSelected();
                        }
                    }
                } else {
                    if (finalValue >= 78 && finalValue <= 175) {
                        // this.inProgressSelected();
                    } else if (finalValue >= -100 && finalValue <= 78) {
                        this.manualSelected();
                    } else {
                        this.autoSelected();
                    }
                }
            },

            onPanResponderTerminate: () => {},
            onShouldBlockNativeResponder: () => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            }
        });
    }

    manualSelected = () => {
       

        Animated.timing(this.state.position, {
            toValue: Platform.OS === 'ios' ? -2 : 0,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue: Platform.OS === 'ios' ? -2: 0,
                selectedPosition: 0
            });
        }, 100);
        if (this.state.isComponentReady) this.props.onStatusChanged('Manual');

        // Animated.timing(this.state.position, {
        //     toValue:
        //         Platform.OS === 'ios'
        //             ? this.state.mainWidth + this.state.switcherWidth
        //             : this.state.mainWidth + this.state.switcherWidth - 2,
        //     duration: this.state.duration
        // }).start();
        // setTimeout(() => {
        //     this.setState({
        //         posValue:
        //             Platform.OS === 'ios'
        //                 ? this.state.mainWidth + this.state.switcherWidth
        //                 : this.state.mainWidth + this.state.switcherWidth - 2,
        //         selectedPosition: 1
        //     });
        // }, 100);
        // if (this.state.isComponentReady) this.props.onStatusChanged('Manual');
    };

    
    autoSelected = () => {
        Animated.timing(this.state.position, {
            toValue:
                Platform.OS === 'ios'
                    ? this.state.mainHeight - this.state.switcherWidth - 12
                    : this.state.mainHeight - this.state.switcherWidth - 12,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue:
                    Platform.OS === 'ios'
                        ? this.state.mainHeight - this.state.switcherWidth - 12
                        : this.state.mainHeight - this.state.switcherWidth - 12,
                selectedPosition: 1
            });
        }, 100);
        if (this.state.isComponentReady) this.props.onStatusChanged('Auto');

    };

    getStatus = () => {
        switch (this.state.selectedPosition) {
        case 0:
        return 'Manual';
        case 1:
        return 'Auto';
            
        }
    };

    render() {
        return (
            <View style={[styles.container,{height:this.props.height,width:this.props.width,borderRadius: this.props.width/2}]}>
                <Button type="Manual" onPress={this.manualSelected} topValue={10.0} textColor={'#bdc3c7'}/>
                <Button type="Auto" onPress={this.autoSelected}  topValue={-10.0} textColor={'#bdc3c7'}/>
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[
                        styles.switcher,
                        {
                            transform: [{ translateY: this.state.position }],
                            width:this.state.switcherWidth,
                            height:this.state.switcherWidth,
                            borderRadius: this.state.switcherWidth / 2,
                        }
                    ]}
                >
                
                    <Button type={this.getStatus()} active={true} />
                </Animated.View>
                {/* <Text>{JSON.stringify(this.state.position)}</Text> */}
            </View>
            
        );
    }
}

MultiSwitch.propTypes = {
    disableScroll: PropTypes.func,
    onStatusChanged: PropTypes.func,
    height:PropTypes.number,
    width:PropTypes.number,
};
