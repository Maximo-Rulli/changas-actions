import supabase from '../libs/supabase/server'

export async function createChat (message, IdUser1, IdUser2) {
  // Create JSON to upload
  const newChat = {
    id_user1: IdUser1,
    id_user2: IdUser2,
    read_user_1: true,
    read_user_2: false,
    last_message: new Date().toISOString().split('.')[0]
  }
  const { data, error } = await supabase.from('chats').insert(newChat).select().single()

  const { sendError } = await supabase.from('messages')
    .insert([
      {
        id_chat: data.id_chat,
        content: message,
        user_1: true
      },
    ])

  if (error) return { error: error.message }
  if (sendError) return { error: sendError.message }
  return data.id_chat
}
