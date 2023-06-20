import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Image, Text } from 'react-native'
import colors from '../../constants/colors'

const ProgressBar = ({ progress }: { progress: number }) => {
    progress = progress > 100 ? 100 : progress

    const progressAnim = useRef(new Animated.Value(0)).current

    const animateProgress = () => {
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        animateProgress()
    }, [progress])

    return (
        <View style={styles.container}>
            <View style={styles.progressBG}>
                <Image source={require('../../assets/images/refresh.png')} />
                <Text style={styles.textProgress}>Syncing {progress}%</Text>
                <Animated.View
                    style={[
                        styles.progress,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%']
                            })
                        },
                        progress === 100 && { borderTopRightRadius: 40, borderBottomRightRadius: 40 }
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    progressBG: {
        width: '50%',
        height: 40,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 40,
        backgroundColor: '#E0FAFA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    progress: {
        height: '100%',
        position: 'absolute',
        left: 0,
        zIndex: 1,
        backgroundColor: colors.primary,
        opacity: 0.2,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40
    },

    textProgress: {
        color: colors.primary,
        paddingLeft: 5,
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginTop: 2,
        width: '60%'
    }
})

export default ProgressBar
