import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
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

    const [progressState, setProgressState] = useState<number>(progress)

    useEffect(() => {
        animateProgress()
    }, [progressState])

    return (
        <View style={styles.container}>
            <View style={styles.progressBG}>
                <Animated.Image source={require('../../assets/images/refresh.png')} />
                <Animated.Text style={styles.textProgress}>Syncing {progressState}%</Animated.Text>
                <Animated.View
                    style={[
                        styles.progress,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%']
                            })
                        },
                        progressState === 100 && { borderBottomRightRadius: 40, borderTopRightRadius: 40 }
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
        fontFamily: 'Poppins-Regular',
        marginTop: 2,
        width: '60%'
    }
})

export default ProgressBar
