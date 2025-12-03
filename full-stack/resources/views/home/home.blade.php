<!DOCTYPE html>
<html lang="en">

<head>
    @include('home.head')
</head>

<body>
    @include('home.nav')

    <section>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">Bem Vindo!</h1>
            <p class="text-gray-600">Não erre na escolha! Pesquise aqui a respeito do Componente (Periférico ou
                Hardware) em
                que tenha
                interesse para conhecê-lo melhor e ser capaz de tomar a melhor decisão.</p>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div id="loading" class="hidden flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>

            <div id="errorMessage" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <span id="errorText"></span>
            </div>

            <h1 class="text-2xl font-bold text-gray-900 mb-4" id="best-comp-label"></h1>

            <div id="cardView" class="space-y-4" bis_skin_checked="1">
            </div>
        </div>
    </section>

    @include('home.main_body')

    @vite([
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/js/auth_user_wapi.js',
        'resources/js/bestComponents.js'
    ])

    @include('home.footerjs')
</body>

</html>
