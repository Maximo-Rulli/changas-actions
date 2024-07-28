import * as SecureStore from 'expo-secure-store'
import supabase from '../libs/supabase/server'

export default async function Logout({navigation, IdUser}){
  // Delete the push token from the DB
  const updateObject = {}
  updateObject['push_token'] = null
  await supabase.from('users_data').update(updateObject).eq('id_user', IdUser)

  await SecureStore.deleteItemAsync('id_user')
  await SecureStore.deleteItemAsync('username')
  
  // Reset the stack as the user just logged out and cannot go back
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  })
}
