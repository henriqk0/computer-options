<!DOCTYPE html>
<html lang="en">

<head>
    @include('home.head')
</head>

<body>
    @include('home.nav')

    <!-- Demo Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Bem Vindo!</h1>
        <p class="text-gray-600">Não erre na escolha! Pesquise aqui a respeito do Componente (Periférico ou Hardware) em
            que tenha
            interesse para conhecê-lo melhor e ser capaz de seguir a melhor opção.</p>
    </div>

    @include('home.main_body')

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @include('home.footerjs')
</body>

</html>