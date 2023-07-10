<template>
    <section
        id="navbar"
        class="select-none z-[999] fixed top-0 z-10 mx-auto shadow-xl bg-gray-900"
    >
        <nav class="flex justify-between text-white w-screen">
            <div
                class="px-5 xl:px-12 py-6 flex w-full items-center max-md:w-9/12"
            >
                <div class="text-3xl font-bold font-heading">
                    <router-link to="/">
                        <img
                            class="h-9 pl-4"
                            src="../images/shopzone-low-resolution-logo-white-on-transparent-background.png"
                            alt="logo"
                        />
                    </router-link>
                </div>
                <ul
                    class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12"
                >
                    <li
                        class="cursor-pointer text-lg hover:transition-all hover:underline"
                    >
                        <router-link to="/Men">
                            <span>Men</span>
                        </router-link>
                    </li>
                    <li
                        class="cursor-pointer text-lg hover:transition-all hover:underline"
                    >
                        <router-link to="/Electronics">
                            <span>Electronics</span>
                        </router-link>
                    </li>
                    <li
                        class="cursor-pointer text-lg hover:transition-all hover:underline"
                    >
                        <router-link to="/Products">
                            <span>Products</span>
                        </router-link>
                    </li>
                    <li
                        class="cursor-pointer text-lg hover:transition-all hover:underline"
                    >
                        <router-link to="/Wishlist">
                            <span>Wish List</span>
                        </router-link>
                    </li>
                </ul>
                <div class="hidden md:flex items-center space-x-5 items-center">
                    <button @click="toggleSearch()">
                        <i class="fa-solid fa-magnifying-glass text-xl"></i>
                    </button>
                    <button>
                        <router-link to="/Cart">
                            <i class="fa-solid fa-cart-shopping text-xl"></i>
                        </router-link>
                    </button>
                </div>
            </div>

            <div
                class="fixed top-0 right-[-100%] w-full bg-gray-900 h-screen text-center z-[999] md:hidden"
                id="container"
            >
                <div
                    class="text-2xl float-right m-5 text-white rotate-45 cursor-pointer text-6xl"
                    @click="closeMenu()"
                >
                    +
                </div>
                <ul
                    class="absolute top-1/2 left-2/4 transform -translate-x-2/4 -translate-y-2/4 list-none opacity-0 text-center text-white"
                    id="menu"
                >
                    <li
                        class="my-4 hover:text-white transition duration-500 hover:scale-125 hover:bg-gray-800 p-4 text-3xl"
                    >
                        <button>
                            <router-link to="/" @click="closeMenu()">
                                <span>Home</span>
                            </router-link>
                        </button>
                    </li>
                    <li
                        class="my-4 hover:text-white transition duration-500 hover:scale-125 hover:bg-gray-800 p-4 text-3xl"
                    >
                        <button>
                            <router-link to="/Men" @click="closeMenu()">
                                <span>Men</span>
                            </router-link>
                        </button>
                    </li>
                    <li
                        class="my-4 hover:text-white transition duration-500 hover:scale-125 hover:bg-gray-800 p-4 text-3xl"
                    >
                        <button>
                            <router-link to="/Electronics" @click="closeMenu()">
                                <span>Electronics</span>
                            </router-link>
                        </button>
                    </li>
                    <li
                        class="my-4 hover:text-white transition duration-500 hover:scale-125 hover:bg-gray-800 p-4 text-3xl"
                    >
                        <router-link to="/Products" @click="closeMenu()">
                            <span>Products</span>
                        </router-link>
                    </li>
                    <li
                        class="my-4 hover:text-white transition duration-500 hover:scale-125 hover:bg-gray-800 p-4 text-3xl"
                    >
                        <button>
                            <router-link to="/Wishlist" @click="closeMenu()">
                                <span>Wishlist</span>
                            </router-link>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex gap-3 items-center pr-6 md:hidden">
                <button>
                    <router-link to="/Cart">
                        <i class="fa-solid fa-cart-shopping text-xl"></i>
                    </router-link>
                </button>

                <button @click="openMenu()">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
            </div>
        </nav>
    </section>
</template>
<style scoped>
#lisa {
    position: relative;
    transition: all 0.5s;
}
#lisa:hover {
    color: rgb(37 99 235);
    z-index: 1;
}
#lisa:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    color: transparent;
    background: rgb(37 99 235);
    height: 1px;
    text-align: left;
    margin: 0;
    opacity: 0;
}
#lisa:hover:after {
    width: 100%;
    z-index: -10;
    animation: fill 0.5s forwards;
    -webkit-animation: fill 0.5s forwards;
    -moz-animation: fill 0.5s forwards;
    opacity: 1;
}
#menu {
    transform: translate(-50%, -50%);
    transition: all 1s ease;
}

#container {
    transition: all 0.6s ease;
}
.scroll-up {
    right: 0;
    bottom: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
}
.show {
    opacity: 1;
    visibility: visible;
}
</style>
<script>
export default {
    setup() {
        const openMenu = () => {
            document.getElementById("container").style.right = "0%";
            document.getElementById("menu").style.opacity = "1";
        };
        const closeMenu = () => {
            document.getElementById("container").style.right = "-100%";
            document.getElementById("menu").style.opacity = "0";
        };

        return {
            openMenu,
            closeMenu,
        };
    },
};
</script>
