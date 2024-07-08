import supabase from '../libs/supabase/server'

export async function getMessages (IdChat) {
  const { data: chat } = await supabase.from('messages').select('content, user_1')
    .eq('id_chat', IdChat).order('time', { ascending: false })
  return chat
}
