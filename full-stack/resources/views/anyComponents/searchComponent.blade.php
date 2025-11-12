<!DOCTYPE html>
<html lang="en">

<head>
    @include('home.head')
</head>

<body>
    @include('home.nav')

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-3 flex space-x-3">
            <h1 class="text-1xl font-bold text-gray-900" id="titleSearch"></h1>
            <p class="text-gray-600" id="searchedLabel"></p>
        </div>

        <!-- Loading Spinner -->
        <div id="loading" class="hidden flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error Message -->
        <div id="errorMessage" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <span id="errorText"></span>
        </div>

        <!-- Success Message -->
        <div id="successMessage"
            class="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <span id="successText"></span>
        </div>

        <div id="cardView" class="space-y-4">
            <!-- will be inserted here -->
        </div>
    </div>

    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/searchManager.js', 'resources/js/auth_user_wapi.js'])

    @include('home.footerjs')

</body>

</html>
