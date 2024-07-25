import * as SecureStore from 'expo-secure-store'

export default async function Register(IdUser, username){
    // Save the data to secure store
    await SecureStore.setItemAsync('id_user', IdUser)
    await SecureStore.setItemAsync('username', username)
}