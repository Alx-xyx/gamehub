import supabase from "./supabase";

export async function uploadFile(file, filename, bucket = 'avatares', upsert = true) {
    const {error} = await supabase
    .storage
    .from(bucket)
    .upload(filename, file,{
        upsert,
    });
    if (error) {
        console.error('Error al subir el archivo deseado:', error.message);
        throw error;
    }
}

export async function getFileUrl(filename, bucket = 'avatares'){
    const {data} = await supabase
    .storage
    .from(bucket)
    .getPublicUrl(filename);
    return `${data.publicUrl}?t=${Date.now()}`;
}