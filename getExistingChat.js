import supabase from '../libs/supabase/server'

export async function getExistingChat (IdUser1, IdUser2) {
  const { data: IdChat } = await supabase.from('chats').select('id_chat').or(
    `and(id_user1.eq.${IdUser1}, id_user2.eq.${IdUser2}), and(id_user2.eq.${IdUser1}, id_user1.eq.${IdUser2})`).single()
  return { IdChat }
}
