import { getFileUrl, uploadFile } from "./storage";
import supabase from "./supabase";
import { createUserProfile, fetchUserProfileById, updateUserProfile } from "./user-profiles";

let observers = [];

let userData = {
    id: null,
    email: null,
    bio: null,
    nickname: null,
    game_tag: null,
    profileFullyLoaded: false,
}

if (localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
}

supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
        updateUserData({
            id: session.user.id,
            email: session.user.email
        });
        if (!userData.profileFullyLoaded) {
            fetchUserProfileById(userData.id)
                .then(profile => {
                    updateUserData({
                        bio: profile?.bio ?? null,
                        nickname: profile?.nickname ?? null,
                        game_tag: profile?.game_tag ?? null,
                        photo_url: profile?.photo_url ?? null,
                        profileFullyLoaded: true
                    })
                })
                .catch(error => {
                    throw new Error(error.message)
                })
        }
    } else {
        updateUserData({
            id: null,
            email: null,
            bio: null,
            nickname: null,
            game_tag: null,
            profileFullyLoaded: false
        })
    }
})

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

    await createUserProfile({
        id: data.user.id,
        email: data.user.email,
    });

    const user = data.user
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
}

export async function updateCurrentUserProfile(data) {
    await updateUserProfile(userData.id, {
        bio: data.bio,
        nickname: data.nickname,
        game_tag: data.game_tag
    });

    updateUserData({
        bio: data.bio,
        nickname: data.nickname,
        game_tag: data.game_tag
    });
}

export async function updateCurrentUserAvatar(file) {
    const photoName = `${userData.id}/avatar.jpg`;
    await uploadFile(file, photoName)
    const photo_url = await getFileUrl(photoName)
    updateUserProfile(
        userData.id,
            {
            photo_url,
            }
    );
    updateUserData({
        photo_url
    })
}

export async function refreshUserProfile() {
    if (!userData.id) return;

    const profile = await fetchUserProfileById(userData.id);
    updateUserData({
        bio: profile?.bio ?? null,
        nickname: profile?.nickname ?? null,
        game_tag: profile?.game_tag ?? null,
    });
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