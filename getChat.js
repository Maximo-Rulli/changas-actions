import supabase from '../libs/supabase/server'

export async function getChat (IdChat, columns) {
  const { data: chatInfo } = await supabase.from('chats').select(columns).eq('id_chat', IdChat)
  return chatInfo
}
