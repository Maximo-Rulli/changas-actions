import supabase from '../libs/supabase/server'
import { getPermissionsAsync, getExpoPushTokenAsync } from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export async function updateNotification (IdUser) {
  const status = await SecureStore.getItemAsync('notification_status')
  const pushToken = await SecureStore.getItemAsync('push_token')
  const { status: existingStatus } = await getPermissionsAsync()

  if (pushToken === 'null') {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
    if (!projectId) {
      alert('Hubo un error al buscar el ID del proyecto, las notificaciones no funcionarán. Contactese con soporte.')
    }
    else {
      const newToken = (await getExpoPushTokenAsync({projectId,})).data
      await supabase.from('users_data').update({'push_token': newToken}).eq('id_user', IdUser)
      await SecureStore.setItemAsync('push_token', newToken)
    }
  }
  
  if (existingStatus !== status) {
    const updateObject = {}
    updateObject['notifications'] = status === 'granted'
    await supabase.from('users_data').update(updateObject).eq('id_user', IdUser)
    await SecureStore.setItemAsync('notification_status', existingStatus)
  }
  
}
