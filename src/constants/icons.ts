import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from './colors'

const tabsIcons = [
    {
        active: Ionicons.getImageSourceSync('home-outline', 25, colors.primary),
        inactive: Ionicons.getImageSourceSync('home-outline', 25, colors.secondary)
    },
    {
        active: Ionicons.getImageSourceSync('receipt-outline', 25, colors.primary),
        inactive: Ionicons.getImageSourceSync('receipt-outline', 25, colors.secondary)
    },
    {
        active: Ionicons.getImageSourceSync('list-outline', 25, colors.primary),
        inactive: Ionicons.getImageSourceSync('list-outline', 25, colors.secondary)
    },
    {
        active: Ionicons.getImageSourceSync('pricetag-outline', 25, colors.primary),
        inactive: Ionicons.getImageSourceSync('pricetag-outline', 25, colors.secondary)
    },
    {
        active: Ionicons.getImageSourceSync('menu-outline', 25, colors.primary),
        inactive: Ionicons.getImageSourceSync('menu-outline', 25, colors.secondary)
    }
]

export { tabsIcons }
