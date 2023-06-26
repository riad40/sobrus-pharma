import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import InventoryStackParamsList from '../../navigations/stacks/InventoryStack/InventoryStackParamsList'

interface BottomContentProps {
    setFlashMode: (value: boolean) => void
    flashMode: boolean
}

const BottomContent = ({ setFlashMode, flashMode }: BottomContentProps): JSX.Element => {
    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    return (
        <View style={styles.bottomContent}>
            <TouchableOpacity style={styles.bottomContentButtom} onPress={() => navigation.navigate('InventoriesList')}>
                <Ionicons name="close-outline" size={20} color="white" />
                <Text style={styles.bottomContentText}>férmé</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.bottomContentButtom,
                    {
                        backgroundColor: flashMode ? colors.primary : '#707070'
                    }
                ]}
                onPress={() => setFlashMode(!flashMode)}
            >
                <Ionicons name="flash" size={20} color="white" />
                <Text style={styles.bottomContentText}>flash</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomContent: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '60%',
        bottom: hp(20),
        alignSelf: 'center'
    },
    bottomContentButtom: {
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
        backgroundColor: '#707070',
        borderRadius: wp(20)
    },

    bottomContentText: {
        color: '#FFF',
        marginHorizontal: wp(1),
        fontFamily: 'Poppins-Regular',
        textTransform: 'capitalize'
    }
})

export default BottomContent
