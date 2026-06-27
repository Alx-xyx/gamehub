import supabase from "./supabase";
import { fetchUserProfileById } from "./user-profiles";

// let userData = {
//     id: null,
//     email: null,
//     bio: null,
//     nickname: null,
//     game_tag: null,
//     checkedWithSupabase: false,
// }

let observers = [];

if (localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
}
supabase.onAuthStateChange((event, session) => {
    if (session) {
        updateUserData({
            id: session.user.id,
            email: session.user.email
        });

        fetchUserProfileById(userData.id)
            .then(prodile => {
                updateUserData({
                    bio: profile.bio,
                    nickname: profile.nickname,
                    game_tag: profile.game_tag,
                })
            })
            .catch(error =>{
                throw new Error(error.message)
            })
    } else {
        updateUserData({
            id: null,
            email: null,
            bio: null,
            nickname: null,
            game_tag: null,
        })
    }
})

// loadCurrentUser();

// async function loadCurrentUser() {
//     const { data } = await supabase
//         .auth
//         .getUser();

//     if (data.user === null) {
//         return
//     }
//     userData = {
//         ...userData,
//         id: data.user.id,
//         email: data.user.email,
//     }

//     loadCurrentUserProfile()

//     notifyAll();
// }

// async function loadCurrentUserProfile() {
//     const profile = await fetchUserProfileById(userData.id);
//     updateUserData({
//         bio: profile.bio,
//         nickname: profile.nickname,
//         game_tag: profile.game_tag
//     })
// }

export async function register({ email, password }) {
    const { data, error } = await supabase
        .auth
        .signUp(
            { email, password }
        );

    if (error) {
        console.error("Error al crear una cuenta de usuario:", error);
        throw new Error(error.message);
    }

    const user = data.user

    // updateUserData({
    //     id: user?.id ?? null,
    //     email: user?.email || email,
    // })

    return user;
}

export async function login({ email, password }) {
    const { data, error } = await supabase
        .auth
        .signInWithPassword(
            { email, password }
        );
    if (error) {
        console.error("Error al iniciar sesión:", error);
        throw new Error(error.message);
    }
    // updateUserData({
    //     id: data.user.id,
    //     email: data.user.email,
    // })
    // loadCurrentUserProfile()
    return data.user;
}

export async function logout() {
    const { error } = await supabase
        .auth
        .signOut();
    if (error) {
        console.error("Error al cerrar sesión:", error);
        throw new Error(error.message);
    }
    // updateUserData({
    //     id: null,
    //     email: null,
    //     bio: null,
    //     nickname: null,
    //     game_tag: null,
    // })
}

export function subscribeToAuthStateChanges(observer) {
    observers.push(observer);
    observer({
        ...userData
    })
}

function notify(observer) {
    observer({ ...userData });
}

function notifyAll() {
    observers.forEach(observer => notify(observer));
}

function updateUserData(newUserData) {
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