import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import Modal from 'react-native-modal'

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
    AnimatedStyleProp
} from 'react-native-reanimated'

import colors from '../../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface ModalContainerProps {
    children: React.ReactNode
    visible: boolean
    onClose: () => void
    style?: {
        backgroundColor?: string
        modalHeight?: number | string
    }
}

const ModalContainer = ({ children, visible, onClose, style }: ModalContainerProps): JSX.Element => {
    const translateY = useSharedValue(0)

    const handleOnClose = () => {
        onClose()
        translateY.value = withTiming(0)
    }

    const context = useSharedValue({ y: 0 })

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate(event => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, 0)
        })
        .onEnd(event => {
            if (event.translationY < 200) {
                translateY.value = withTiming(0)
            } else runOnJS(onClose)()
        })

    const translateYStyle = useAnimatedStyle<AnimatedStyleProp<ViewStyle>>(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transform: any = { translateY: translateY.value }

        return transform
    })

    const bgColor = style?.backgroundColor || colors.white

    const modalHeight = style?.modalHeight || '50%'

    return (
        <Modal
            isVisible={visible}
            style={styles.modal}
            useNativeDriver={true}
            onBackdropPress={handleOnClose}
            animationIn="slideInUp"
            animationInTiming={500}
            animationOut="slideOutDown"
            animationOutTiming={500}
        >
            <GestureHandlerRootView style={{ flex: 1, justifyContent: 'flex-end' }}>
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        style={[
                            styles.modalContainer,
                            translateYStyle,
                            {
                                backgroundColor: bgColor,
                                height: modalHeight
                            }
                        ]}
                    >
                        {children}
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    modalContainer: {
        paddingHorizontal: wp(5),
        borderTopLeftRadius: hp(5),
        borderTopRightRadius: hp(5),
        paddingBottom: wp(5),
        maxHeight: '90%',
        minHeight: '50%'
    }
})

export default ModalContainer
