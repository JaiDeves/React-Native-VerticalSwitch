import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const Colors = {
    mBackColor: '#2c3e50',
    mBorderColor: '#efefef',
    white: '#FFFFFF',
    shadowColor: '#A69E9E'
};

const Metrics = {
    containerWidth: width - 30,
    switchWidth: width / 2.7
};

const styles = StyleSheet.create({

    container: {
        width: 55,
        // height: Metrics.containerWidth,
        height: 100,
        flexDirection: 'column',
        backgroundColor: Colors.mBackColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.mBorderColor,
        padding:20
    },
    
    switcher: {
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        left: 5,
        right: 5,
        bottom:5,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        // height: Metrics.switchWidth,
        // height: 53,
        // width: 53,
        elevation: 4,
        shadowOpacity: 0.31,
        shadowRadius: 10,
        shadowColor: Colors.shadowColor
    },
    buttonStyle: {
        flex: 1,
        width:54,
        height:  Metrics.containerWidth / 3,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;
