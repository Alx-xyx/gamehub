//! Imports
import supabase from "./supabase";

export async function sendPublicChatMessage({user_id, email, body}){
            const {error} = await supabase
                .from('public_chat_messages')
                .insert({
                    user_id,
                    email,
                    body,
                });
                if (error) {
                    console.error("Error:", error);
                    throw new Error("No se pudo enviar el mensaje");
                }
}

export async function fetchPublicChatMessages(){
    const {data, error} = await supabase
        .from ('public_chat_messages')
        .select()
        if (error) {
            console.error("Error", error);
            throw new Error("No se pudieron obtener los mensajes" + error.message);
        }
        return data;
}

export function subscribeToPublicChatMessages(callback){
        const chatChannel = supabase.channel('public_chat');
        chatChannel.on(
            'postgres_changes',
            {
                event: 'INSERT',
                'schema': 'public',
                'table': 'public_chat_messages'
            },
            payload =>{
                callback(payload.new);
            }
        );
        chatChannel.subscribe();

        return () => {
            chatChannel.unsubscribe();
        }
}
