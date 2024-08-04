import supabase from '../libs/supabase/server'

export async function blockUser (IdChat, user_number) {
  const updateObject = {}
  // If not user_number is passed, the user is unblocked
  updateObject['blocked'] = (user_number ? (user_number === 1 ? 1 : 2) : 'null')
  //console.log(user_number=== 1, user_number===2, user_number)
  await supabase.from('chats').update(updateObject).eq('id_chat', IdChat)
}
