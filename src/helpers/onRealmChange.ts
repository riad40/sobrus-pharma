import realm from '../configs/realm'

const onRealmChange = (callback: () => void) => {
    realm.addListener('change', callback)
}

export default onRealmChange
