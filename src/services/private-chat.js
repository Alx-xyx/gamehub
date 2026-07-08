import supabase from "./supabase";

function sortUserIds(userId1, userId2) {
    return [userId1, userId2].sort();
}

const privateChatCache = {};


async function findOrCreatePrivateChat(senderId, receiverId) {
    const [userId1, userId2] = sortUserIds(senderId, receiverId);
    const cacheKey = [senderId, receiverId].sort().join('_');
    console.log('Buscando la conversacion privada en el cache')
    if (privateChatCache[cacheKey]) {
        console.log('Conversacion privada encontrada en el cache')
        return privateChatCache[cacheKey];
    } else{
        console.log('Conversacion privada no encontrada en el cache, buscando en la base de datos')
    }



    const { data, error } = await supabase
        .from('private_chats')
        .select()
        .or(`and(user_id1.eq.${senderId},user_id2.eq.${receiverId}),and(user_id1.eq.${receiverId},user_id2.eq.${senderId})`)
        .limit(1);

    if (error) throw new Error(error.message);

    let privateChat;
    if (data && data.length > 0) {
        privateChat = data[0];
    } else {
        const { data: newChat, error: createError } = await supabase
            .from('private_chats')
            .insert({ user_id1: senderId, user_id2: receiverId })
            .select()
            .single();

        if (createError) throw new Error(createError.message);
        privateChat = newChat;
    }

    privateChatCache[cacheKey] = privateChat;
    return privateChat;

}

export async function sendPrivateChatMessage({ senderId, receiverId, body }) {
    const chat = await findOrCreatePrivateChat(senderId, receiverId);

    const { error } = await supabase
        .from('private_chats_messages')
        .insert({
            chat_id: chat.id,
            sender_id: senderId,
            body,
        });

    if (error) {
        console.error("[private-chat.js | sendPrivateChatMessage] Error:", error);
        throw new Error(error.message);
    }
}

export async function fetchPrivateChatMessages(senderId, receiverId) {

    const [userId1, userId2] = sortUserIds(senderId, receiverId);

    const chat = await findOrCreatePrivateChat(senderId, receiverId);

    const { data, error } = await supabase
        .from('private_chats_messages')
        .select()
        .eq('chat_id', chat.id)
        .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);
    return data;



}

export function subscribeToPrivateChatMessages(senderId, receiverId, callback) {
    let channel;

    (async () => {
        const chat = await findOrCreatePrivateChat(senderId, receiverId);
        const channelName = `private_chat_${chat.id}`;

        const existingChannel = supabase.getChannels().find(c => c.topic === `realtime:${channelName}`);
        if (existingChannel) {
            await supabase.removeChannel(existingChannel);
        }

        channel = supabase.channel(channelName);
        channel
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'private_chats_messages',
                filter: `chat_id=eq.${chat.id}`,
            }, payload => callback(payload.new))
            .subscribe();
    })();

    return () => {
        if (channel) supabase.removeChannel(channel);
    };
}