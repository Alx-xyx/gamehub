<template>
    <section class="bg-gray-900 text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="max-w-xl">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight reveal-el transition-all duration-700 delay-100">
            <span class="text-white">
                Postea sobre tus 
            </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                juegos favoritos 
            </span>
            <span class="text-white">
                y conocé otros gamers
            </span>
            
        </h2>
        <p class="text-gray-300 text-lg mt-8 font-changa">
            Postea las ideas de tus juegos favoritos, descubrí que es lo que a otros les apasiona
            y conectá con una comunidad que le gusta el gaming al igual que vos - desde jugadores
            casuales hasta veteranos coperativos
        </p>
        </div>
        <button
            @click="$router.push('/feed')"
            class="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl font-semibold"
        >
        Ir al feed
        </button>
    </section>
</template>