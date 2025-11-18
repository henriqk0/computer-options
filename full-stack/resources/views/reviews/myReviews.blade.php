<!DOCTYPE html>
<html lang="en">

<head>
    @include('home.head')
</head>

<body>
    @include('home.nav')

    <div class="max-w-[728px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-4" id="titlePageLabel">
            </h2>

            <p class="text-gray-500" id="titleParagraph"></p>
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
        </div>
    </div>

    <!-- Modal for Edit Review -->
    <div id="reviewModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
    </div>

    <!-- Sentinel: invisible element to detect -->
    <div id="sentinel"></div>

    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/auth_user_wapi.js', 'resources/js/myReviewsManager.js'])

    @include('home.footerjs')

</body>

</html>
