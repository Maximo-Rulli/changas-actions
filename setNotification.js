import supabase from '../libs/supabase/server'

export async function setNotification (IdUser, pushToken, status) {
  const updateObject = {}
  updateObject['notifications'] = status === 'granted'
  updateObject['push_token'] = pushToken
  await supabase.from('users_data').update(updateObject).eq('id_user', IdUser)
}
