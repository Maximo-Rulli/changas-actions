import supabase from '../libs/supabase/server'

export async function updateNotification (IdUser, status) {
  const updateObject = {}
  updateObject['notifications'] = status === 'granted'
  await supabase.from('users_data').update(updateObject).eq('id_user', IdUser)
}
