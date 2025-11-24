<!DOCTYPE html>
<html lang="en">

<head>
    @include('home.head')
</head>

<body>
    @include('home.nav')

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Loading Spinner -->
        <div id="loading" class="hidden flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div id="showView"></div>

        <!-- Add Review Modal (Medium-style) -->
        <div id="addReviewModal" class="hidden fixed inset-0 bg-white z-50 only-auth">
            <div class="h-full flex flex-col">
                <!-- Header -->
                <div class="border-b border-gray-200">
                    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                        <button id="btnCloseReviewModal" class="text-gray-600 hover:text-gray-900 transition">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="flex items-center space-x-4">
                            <span id="characterCount" class="text-sm text-gray-500">0 caracteres</span>
                            <button type="submit" form="reviewForm"
                                class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="flex-1 overflow-y-auto">
                    <div class="max-w-4xl mx-auto px-6 py-12">
                        <form id="reviewForm" class="space-y-8">
                            <!-- Title Input -->
                            <div>
                                <input type="text" id="reviewTitle" name="title" required maxlength="150"
                                    class="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:outline-none focus:ring-0 p-0"
                                    placeholder="Título da sua avaliação" autocomplete="off">
                            </div>

                            <!-- Rating Section -->
                            <div class="flex items-center space-x-4 py-6 border-t border-b border-gray-200">
                                <span class="text-lg text-gray-700 font-medium">Sua nota:</span>
                                <div class="flex items-center space-x-3">
                                    <div class="flex space-x-1">
                                        <button type="button" class="star-btn" data-rating="1">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="2">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="3">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="4">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="5">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="6">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="7">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="8">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="9">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" class="star-btn" data-rating="10">
                                            <svg class="w-5 h-5 md:h-8 md:w-8 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                    <span id="ratingDisplay" class="text-2xl font-bold text-gray-400">0/10</span>
                                </div>
                                <input type="hidden" id="reviewRating" name="rating" value="0" required>
                            </div>

                            <!-- Content Textarea -->
                            <div>
                                <textarea id="reviewContent" name="content" required rows="15"
                                    class="w-full text-xl text-gray-800 placeholder-gray-400 border-none focus:outline-none focus:ring-0 p-0 resize-none leading-relaxed"
                                    placeholder="Conte sua experiência e conhecimento sobre o componente..."></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        @vite(
            [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/detailsComponent.js',
                'resources/js/auth_user_wapi.js'
            ]
        )

        @include('home.footerjs')

</body>

</html>
</body>

</html>