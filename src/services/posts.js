//* Imports
import supabase from "./supabase";

//^ Funciones para los posteos
export async function fetchPosts(){
    const {data, error} = await supabase
    .from('posts')
    .select();
    if (error){
        console.error("Error al obtener los posteos:", error);
        throw new Error("No se pudieron obtener los posteos");
    }
    return data;
}

export async function createPost({ content }) {
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
        .from('posts')
        .insert({
        user_id: user.id,
        email: user.email,
        content,
        })

    if (error) {
        console.error(error)
        throw new Error("No se pudo crear el posteo")
    }
}

let channel;

export async function subscribeToPosts(callback){
    
    if (channel) {
        supabase.removeChannel(channel);
    }
    
    channel = supabase
    .channel("posts-channel")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "posts"
        },
        (payload) => {
            console.log('REALTIME PAYLOAD:', payload)
            callback(payload.new);
        },
    )
    .subscribe();
    
    return () => {
        supabase.removeChannel(channel);
    };
}