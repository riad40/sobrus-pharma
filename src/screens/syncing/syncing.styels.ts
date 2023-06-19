import { StyleSheet, Dimensions } from 'react-native'

const syncingStyles = StyleSheet.create({
    screenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 20
    },
    centeredImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredImage: {
        resizeMode: 'contain',
        width: 300,
        height: Dimensions.get('window').height / 2
    },
    bottomContent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    boldText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10
    },
    lightText: {
        fontSize: 13,
        color: '#000',
        fontFamily: 'Poppins-Regular',
        marginBottom: 20
    }
})

export default syncingStyles
