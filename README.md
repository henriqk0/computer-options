<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

![](https://img.shields.io/static/v1?label=STATUS&message=DEVELOPING&color=GREEN&style=for-the-badge)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

[![MIT License][license-shield]][license-url]

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/henriqk0/computer-options">
    <img src="favicon.png" alt="Logo" height="80">
  </a>

<h3 align="center">TechComponent</h3>

  <p align="center">
    Management and analysis of your reading productivity
    <br />
    <a href="https://github.com/henriqk0/computer-options"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/henriqk0/computer-options">View Demo</a>
    ·
    <a href="mailto:henriquedeslima2811@gmail.com?subject=BugReport">Report Bug</a>
    ·
    <a href="mailto:henriquedeslima2811@gmail.com?subject=RequestFeature">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Summary:</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Starting</a>
      <ul>
        <li><a href="#prerequisites">Pre requisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the Project

<img src="image.png" alt="TechComponent" height="">

In this project, I developed a responsive web system with role-based authorization, JWT authentication using Vue 3 (with Axios, Tailwind and TypeScript) and Laravel 12, featuring specific modular architectures for each framework. Admins can change user roles, and editors can add new components, as well as modify data such as the best price and the URL where it was offered. Regular users can write and manage reviews for each component, as well as give only one "like" to each existing review. All the application can be switched to dark theme and its only available in portuguese.

Currently, the application can only be accessed locally.

### Built with

- [![Laravel][Laravel.js]][Laravel-url]
- [![Docker][Docker.js]][Docker-url]
- [![MariaDB]][MariaDB-url]
- [![TypeScript]][TypeScript-url]
- [![Tailwind][Tailwind.css]][TypeScript-url]

<!-- GETTING STARTED -->

## Getting Started

To execute the local version, assert that

### Pre requisites:

- Have PHP, Composer and Laravel installed
- Docker: If you want to use an image as database.
- Clone this repository.
- Create a .env.local or .env with your filled variables, like .env.example, inside the cloned backend repository
- Create a a .env.local inside the cloned frontend repository containing the base route at backend with VITE_BASE_API_URL=

### Configurating:

1. With your Database Started, run, in the cloned backend repository: php artisan serve
2. Now, run in the cloned frontend repository: pnpm run dev
3. At `localhost:5173`, which is where the application is located, you will be redirected to the homepage. At navbar, you can see user options to login or register, but you can view and search each component. When logged, you can navigate to our reviews or create new reviews inside a component, and also like reviews at the screen of the element. If you is editor, you also can create, update or delete components, and, if admin, you also can delete or change user roles.

<!-- USAGE EXAMPLES -->

## Usage

This system provides an intuitive web interface for searching for the best technological components, as well as analyzing them and accessing the best user reviews.

<!--

## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

-->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that could improve this, please fork the repository and create a pull request. You can also simply open an issue with the "improvement" tag.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
<!-- ## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information. -->

<!-- CONTACT -->

## Contact

Me: [linkedin-url]

Project: [github.com/henriqk0/computer-options](https://github.com/henriqk0/computer-options/tree/main)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Laravel-url]: https://laravel.com
[Laravel.js]: https://img.shields.io/static/v1?style=for-the-badge&message=Laravel&color=FF2D20&logo=Laravel&logoColor=FFFFFF&label=
[Vue-url]: https://vuejs.org/
[Vue.js]: https://img.shields.io/static/v1?style=for-the-badge&message=Vue.js&color=4FC08D&logo=Vue.js&logoColor=FFFFFF&label=
[Tailwind-url]: https://tailwindcss.com/
[Tailwind.css]: https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind%20CSS&color=06B6D4&logo=Tailwind-CSS&logoColor=FFFFFF&label=
[TypeScript-url]: https://www.typescriptlang.org/
[TypeScript]: https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=
[Axios-url]: https://axios-http.com/
[Axios]: https://img.shields.io/static/v1?style=for-the-badge&message=Axios&color=5A29E4&logo=Axios&logoColor=FFFFFF&label=
[MariaDB-url]: https://mariadb.org/
[MariaDB]: https://img.shields.io/static/v1?style=for-the-badge&message=MariaDB&color=003545&logo=MariaDB&logoColor=FFFFFF&label=
[Docker-url]: https://www.docker.com/
[Docker.js]: https://img.shields.io/static/v1?style=for-the-badge&message=Docker&color=2496ED&logo=Docker&logoColor=FFFFFF&label=
[contributors-shield]: https://img.shields.io/github/contributors/henriqk0/computer-options.svg?style=for-the-badge
[contributors-url]: https://github.com/henriqk0/computer-options/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/henriqk0/computer-options.svg?style=for-the-badge
[forks-url]: https://github.com/henriqk0/computer-options/network/members
[stars-shield]: https://img.shields.io/github/stars/henriqk0/computer-options.svg?style=for-the-badge
[stars-url]: https://github.com/henriqk0/computer-options/stargazers
[issues-shield]: https://img.shields.io/github/issues/henriqk0/computer-options.svg?style=for-the-badge
[issues-url]: https://github.com/henriqk0/computer-options/issues
[license-shield]: https://img.shields.io/github/license/henriqk0/computer-options.svg?style=for-the-badge
[license-url]: https://github.com/henriqk0/computer-options/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/henriqdeslima/
[product-screenshot]: https://github.com/henriqk0/computer-options/blob/main/2readme/image.png
