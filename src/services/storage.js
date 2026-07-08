export async function uploadFile(file, filename, bucket = 'avatares'){
    const {error} = await supabase
    .storage
    .from(bucket)
    .upload(filename, file);
    if (error) {
        console.error('Error al subir el archivo deseado:', error.message);
        throw error;
    }
}

export async function getFileUrl(filename, bucket = 'avatares'){
    
}