import supabase from "./supabase";

export async function createUserProfile(){

}
export async function updateUserProfile(){
    
}
export async function fetchUserProfileById(id){
    const {data, error} = await supabase
        .from('user_profiles')
        .select()
        .eq('id',id)
    if (error) {
        console.error("[user-profiles.js | fetchUserProfileById] Error al obtener la data del usuario");
        throw new Error(error.message);
    }
    return data[0]
    
}
export async function fetchUserProfiles(){
    
}
export async function deleteUserProfile(){
}