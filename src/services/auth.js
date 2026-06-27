import supabase from "./supabase";

let userData = {
    id: null,
    email: null,
    checkedWithSupabase: false,
}

let observers = [];

if (localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
}

loadCurrentUser();

async function loadCurrentUser(){
    const {data} = await supabase
        .auth
        .getUser();

        if (data.user === null) {
            return
        }
        userData = {
            ...userData,
            id: data.user.id,
            email: data.user.email,
        }

        notifyAll();
}

export async function register({email, password}){
    const {data, error} = await supabase
        .auth 
        .signUp(
            {email, password}
        );

    if (error){
        console.error("Error al crear una cuenta de usuario:", error);
        throw new Error(error.message);
    } 
    
    const user = data.user

    updateUserData({
        id: user?.id ?? null,
        email: user?.email || email,
    })

    return user;
}

export async function login({email, password}){
    const {data, error} = await supabase
        .auth 
        .signInWithPassword(
            {email, password}
        );
    if (error){
        console.error("Error al iniciar sesión:", error);
        throw new Error(error.message);
    }
    updateUserData({
        id: data.user.id,
        email: data.user.email,
    })
    return data.user;
}

export async function logout(){
    const { error } = await supabase
        .auth 
        .signOut();
    if (error){
        console.error("Error al cerrar sesión:", error);
        throw new Error(error.message);
    }
    updateUserData({
        id: null,
        email: null,
    })
}

export function subscribeToAuthStateChanges(observer){
    observers.push(observer);
    observer({
        ...userData
    })
}

function notify(observer){
    observer({...userData});
}

function notifyAll(){
    observers.forEach(observer => notify(observer));
}

function updateUserData(newUserData){
    userData = {
        ...userData,
        ...newUserData,
    }
    notifyAll();

if (userData.id !== null) {
    localStorage.setItem('user', JSON.stringify(userData));
} else {
    localStorage.removeItem('user');
}
}