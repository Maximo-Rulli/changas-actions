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
    
    const { data: userdata, error: usererror} = await supabase.from('users_data').select('username').ilike('email', email).single()

    if (!usererror){
        // Save the data to secure store
        await SecureStore.setItemAsync('id_user', data.id_user)
        await SecureStore.setItemAsync('username', userdata.username)
        return [data.id_user, username]
    }
    else {
        throw new Error(messages.error.error)
    }

}