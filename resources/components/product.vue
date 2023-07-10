<template>
    <div class="my-4">
        <TransitionRoot as="template" :show="mobileFiltersOpen">
            <Dialog
                as="div"
                class="relative z-40 lg:hidden"
                @close="mobileFiltersOpen = false"
            >
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="translate-x-full"
                    >
                        <DialogPanel
                            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl mt-20"
                        >
                            <div class="flex items-center justify-between px-4">
                                <h2 class="text-lg font-medium text-gray-900">
                                    Filters
                                </h2>
                                <button
                                    type="button"
                                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    @click="mobileFiltersOpen = false"
                                >
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon
                                        class="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <!-- Filters -->
                            <form class="mt-4 border-t border-gray-200">
                                <h3 class="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    class="px-2 py-3 font-medium text-gray-900"
                                >
                                    <li
                                        v-for="category in subCategories"
                                        :key="category.name"
                                    >
                                        <a
                                            :href="category.href"
                                            class="block px-2 py-3 hover:text-gray-800"
                                            >{{ category.name }}</a
                                        >
                                    </li>
                                </ul>

                                <Disclosure
                                    as="div"
                                    v-for="section in filters"
                                    :key="section.id"
                                    class="border-t border-gray-200 px-4 py-6"
                                    v-slot="{ open }"
                                >
                                    <h3 class="-mx-2 -my-3 flow-root">
                                        <DisclosureButton
                                            class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                                        >
                                            <span
                                                class="font-medium text-gray-900"
                                                >{{ section.name }}</span
                                            >
                                            <span
                                                class="ml-6 flex items-center"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    class="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    class="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-6">
                                            <div
                                                v-for="(
                                                    option, optionIdx
                                                ) in section.options"
                                                :key="option.value"
                                                class="flex items-center"
                                            >
                                                <input
                                                    :id="`filter-mobile-${section.id}-${optionIdx}`"
                                                    :name="`${section.id}[]`"
                                                    :value="option.value"
                                                    type="checkbox"
                                                    :checked="option.checked"
                                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    :for="`filter-mobile-${section.id}-${optionIdx}`"
                                                    class="ml-3 min-w-0 flex-1 text-gray-500"
                                                    >{{ option.label }}</label
                                                >
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
            >
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                    All Products
                </h1>

                <div class="flex items-center">
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton
                                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                                Sort
                                <ChevronDownIcon
                                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </MenuButton>
                        </div>

                        <transition
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <MenuItems
                                class="absolute right-0 z-[999] mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div class="py-1">
                                    <MenuItem
                                        v-for="option in sortOptions"
                                        :key="option.name"
                                        v-slot="{ active }"
                                    >
                                        <a
                                            :href="option.href"
                                            :class="[
                                                option.current
                                                    ? 'font-medium text-gray-900'
                                                    : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm',
                                            ]"
                                            >{{ option.name }}</a
                                        >
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                    <button
                        type="button"
                        class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        @click="mobileFiltersOpen = true"
                    >
                        <span class="sr-only">Filters</span>
                        <FunnelIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <section aria-labelledby="products-heading" class="pb-24 pt-6">
                <h2 id="products-heading" class="sr-only">Products</h2>

                <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <form class="hidden lg:block">
                        <h3 class="sr-only">Categories</h3>
                        <ul
                            role="list"
                            class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                        >
                            <li
                                v-for="category in subCategories"
                                :key="category.name"
                            >
                                <a class="text-lg" :href="category.href">{{
                                    category.name
                                }}</a>
                            </li>
                        </ul>

                        <Disclosure
                            as="div"
                            v-for="section in filters"
                            :key="section.id"
                            class="border-b border-gray-200 py-6"
                            v-slot="{ open }"
                        >
                            <h3 class="-my-3 flow-root">
                                <DisclosureButton
                                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                                >
                                    <span
                                        class="font-medium text-gray-900 text-lg"
                                        >{{ section.name }}</span
                                    >
                                    <span class="ml-6 flex items-center">
                                        <PlusIcon
                                            v-if="!open"
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        <MinusIcon
                                            v-else
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </DisclosureButton>
                            </h3>
                            <DisclosurePanel class="pt-6">
                                <div class="space-y-4">
                                    <div
                                        v-for="(
                                            option, optionIdx
                                        ) in section.options"
                                        :key="option.value"
                                        class="flex items-center"
                                    >
                                        <input
                                            :id="`filter-${section.id}-${optionIdx}`"
                                            :name="`${section.id}[]`"
                                            :value="option.value"
                                            type="checkbox"
                                            :checked="option.checked"
                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                            :for="`filter-${section.id}-${optionIdx}`"
                                            class="ml-3 text-sm text-gray-600"
                                            >{{ option.label }}</label
                                        >
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </form>

                    <div class="lg:col-span-3">
                        <div
                            class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
                        >
                            <div
                                v-for="product in resp"
                                :key="product.id"
                                class="shadow-md relative overflow-hidden border rounded-lg flex flex-col transform transition-transform duration-300 hover:scale-105"
                            >
                                <button
                                    class="z-[999]"
                                    @click="addToWishlist(product.Product_name)"
                                    ref="likeBtn"
                                >
                                    <i
                                        class="fa-regular fa-heart p-1.5 blg-32 bg-white max-lg:bottom-[38%] max-sm:left-[91%] max-sm:bottom-[36%] absolute border rounded-2xl"
                                        style="color: #000000"
                                    ></i>
                                </button>
                                <router-link
                                    :to="{
                                        name: 'ProductPage',
                                        params: {
                                            productName: product.Product_name,
                                        },
                                    }"
                                    class="flex flex-col h-full"
                                >
                                    <div class="flex-shrink-0 bg-gray-200 p-4">
                                        <img
                                            :src="product.Img_src"
                                            :alt="product.Img_alts"
                                            class="w-[300px] h-[300px] object-contain mx-auto border-b"
                                        />
                                    </div>
                                    <div
                                        class="p-4 flex flex-col justify-between flex-grow"
                                    >
                                        <div
                                            class="flex flex-col justify-start flex-grow"
                                        >
                                            <p
                                                class="text-gray-500 text-center"
                                            >
                                                <span class="font-bold">{{
                                                    product.Category
                                                }}</span>
                                            </p>
                                            <h3
                                                class="text-lg font-medium text-gray-900 text-center my-2"
                                                id="productName"
                                            >
                                                {{ product.Product_name }}
                                            </h3>
                                            <div
                                                class="flex items-center justify-between mt-auto"
                                            >
                                                <span
                                                    class="font-bold text-gray-900"
                                                    >${{ product.Price }}</span
                                                >
                                                <div
                                                    class="flex items-center space-x-2"
                                                >
                                                    <router-link
                                                        class="max-sm:flex max-sm:flex-col max-sm:items-center"
                                                        :to="{
                                                            name: 'ProductPage',
                                                            params: {
                                                                productName:
                                                                    product.Product_name,
                                                            },
                                                        }"
                                                    >
                                                        <button
                                                            class="rounded-lg bg-gray-800 text-white p-2 hover:bg-gray-700 btn"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, onMounted } from "vue";
import { toggleLikeBtn } from "../js/App.vue";
import axios from "axios";
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
} from "@heroicons/vue/20/solid";

// add function to each one la ne2dar nsewe filter la products (idea{men sewe 1 function w we pass el value w el Product. shou houwe li 3am njibo for example eza kabaset 3al clothing men bte5oud as parameter el value te3eta which is clothing men w then it filter from el resp el prods li 3ndoun category hek bas kif bade 5aliya ta3ruf eno el category})
const sortOptions = [
    { name: "Price: Random", href: "#", current: true, func: "" },
    { name: "Brand: A to Z", href: "#", current: false, func: "" },
    { name: "Brand: Z to A", href: "#", current: false, func: "" },
    { name: "Price: Low to High", href: "#", current: false, func: "" },
    { name: "Price: High to Low", href: "#", current: false, func: "" },
];

const subCategories = [
    { name: "Clothing", href: "#", func: "" },
    { name: "Footwear", href: "#", func: "" },
    { name: "Computer parts", href: "#", func: "" },
    { name: "Computer and Laptops", href: "#", func: "" },
    { name: "Accessories", href: "#", func: "" },
];

const filters = [
    {
        id: "category",
        name: "Category",
        options: [
            { value: "All", label: "All", checked: true },
            { value: "Electronics", label: "Electronics", checked: false },
            {
                value: "Men's Clothing",
                label: "Men's Clothing",
                checked: false,
                func: "",
            },
            {
                value: "Women's Clothing",
                label: "Women's Clothing",
                checked: false,
                func: "",
            },
        ],
    },
    {
        id: "Customer Reviews",
        name: "Customer Reviews",
        options: [
            { value: "5", label: "5 Stars", checked: false, func: "" },
            { value: "4", label: "4 Stars", checked: false, func: "" },
            { value: "3", label: "3 Stars", checked: false, func: "" },
            { value: "2", label: "2 Stars", checked: false, func: "" },
            { value: "1", label: "1 Star", checked: false, func: "" },
        ],
    },
];

const mobileFiltersOpen = ref(false);

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const resp = ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get("/api/posts");
        resp.value = response.data;
    } catch (error) {
        console.error(error);
    }
};
console.log(resp);

const addToWishlist = (productName) => {
    toggleLikeBtn(wishlist, productName);
};

onMounted(() => {
    fetchData();
});
</script>
