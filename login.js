import * as SecureStore from 'expo-secure-store'
import supabase from '../libs/supabase/server'
import messages from '../utils/messages'

export default async function AuthLogin(email){
    const { data, error} = await supabase.from('users').select('id_user').ilike('email', email).single()
    
    if (error) {
        throw new Error(messages.error.error)
    }
    if (!data) {
        throw new Error(messages.error.user_not_found)
    }
    
    const { data: userdata, error: usererror} = await supabase.from('users_data').select('username, status').ilike('email', email).single()

    if (!usererror){
        // Save the data to secure store
        await SecureStore.setItemAsync('id_user', data.id_user)
        await SecureStore.setItemAsync('username', userdata.username)
        await SecureStore.setItemAsync('status', userdata.status)
        return [data.id_user, userdata.username, userdata.status]
    }
    else {
        throw new Error(messages.error.error)
    }

}