import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'

import { BottomContent } from '../'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/dimensions'
import { FONT_SIZE_14 } from '../../constants/fontsSizes'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

// @types

interface QrcodeScannerProps {
    cameraActive: boolean
    setCameraActive: (value: boolean) => void
    handleQRCodeScanned: (event: BarCodeReadEvent) => void
    modalMode?: boolean
    setModalMode?: (value: boolean) => void
}

const QrcodeScanner = ({
    cameraActive,
    setCameraActive,
    handleQRCodeScanned,
    modalMode,
    setModalMode
}: QrcodeScannerProps): JSX.Element => {
    const [flashMode, setFlashMode] = useState<boolean>(false)

    return (
        <>
            <View style={styles.container}>
                {cameraActive ? (
                    <QRCodeScanner
                        onRead={handleQRCodeScanned}
                        cameraStyle={styles.cameraStyle}
                        reactivate={true}
                        reactivateTimeout={3000}
                        showMarker={true}
                        flashMode={flashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                        customMarker={<View style={styles.customMarker} />}
                        bottomContent={
                            <BottomContent
                                flashMode={flashMode}
                                setFlashMode={() => setFlashMode(!flashMode)}
                                modalMode={modalMode}
                                setModalMode={setModalMode}
                            />
                        }
                        cameraProps={{ ratio: '16:9', captureAudio: false }}
                        fadeIn={true}
                        cameraTimeoutView={
                            cameraActive ? (
                                <View style={styles.offContainer}>
                                    <Text style={styles.text}>Appuyez pour activer la caméra</Text>
                                </View>
                            ) : (
                                <></>
                            )
                        }
                        cameraTimeout={3000}
                    />
                ) : (
                    <Pressable style={styles.activeCamera} onPress={() => setCameraActive(true)}>
                        <Text style={styles.activeCameraText}>Tapez pour activer la caméra</Text>
                    </Pressable>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
    cameraStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    offContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: FONT_SIZE_14,
        color: 'white'
    },

    customMarker: {
        width: wp(60),
        height: hp(15),
        backgroundColor: 'lightgray',
        borderColor: 'white',
        opacity: 0.3,
        borderRadius: wp(2)
    },
    activeCamera: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },

    activeCameraText: {
        fontSize: FONT_SIZE_14,
        color: 'white'
    }
})

export default QrcodeScanner
