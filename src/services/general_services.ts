import http from '@/plugin/axios'


export const getListUser = () => {
    return http.get<{users: {[key: string]: any}}>('/', )
}