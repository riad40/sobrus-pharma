import { useMemo } from 'react'

const useSearch = (data: [], search: string) => {
    const memoizedSearch = useMemo(() => {
        if (!search) {
            return data
        }
        return data.filter(item => {
            return Object.keys(item).some(key => {
                return String(item[key]).toLowerCase().includes(search.toLowerCase())
            })
        })
    }, [data, search])
    return memoizedSearch
}

export default useSearch
