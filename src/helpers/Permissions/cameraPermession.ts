import { PermissionsAndroid } from 'react-native'

const requestAccessCameraPermission = async () => {
    let isGranted = false

    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Camera Permission',
            message: 'App needs access to your camera ' + 'so you can take pictures of your prescriptions.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
        })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera')
            isGranted = true
        } else {
            console.log('Camera permission denied')
            isGranted = false
        }
    } catch (err) {
        console.warn(err)
    }

    return isGranted
}

export default requestAccessCameraPermission
