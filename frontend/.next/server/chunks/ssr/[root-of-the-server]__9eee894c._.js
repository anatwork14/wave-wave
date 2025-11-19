module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Project_Sudo/wave-wave/src/store/useUserStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// store/useUserStore.js
__turbopack_context__.s([
    "useUserStore",
    ()=>useUserStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)"); // 1. Import persist
;
;
const useUserStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()(// <-- Note the extra ()
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        setUser: (user)=>set({
                user
            }),
        isMap: true,
        setIsMap: (isMap)=>set({
                isMap
            })
    }), {
    // 3. Configure persistence
    name: "user-auth-storage",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage)
}));
}),
"[project]/Project_Sudo/wave-wave/src/components/Login/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/GoogleLoginButton.js
__turbopack_context__.s([
    "default",
    ()=>GoogleLoginButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/react-icons/fc/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/@react-oauth/google/dist/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/src/store/useUserStore.ts [app-ssr] (ecmascript)"); // Make sure this path is correct
"use client";
;
;
;
;
;
function GoogleLoginButton() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserStore"])(); // Get the setUser function from your store
    const handleSuccess = async (tokenResponse)=>{
        const accessToken = tokenResponse.access_token;
        console.log("Got Access Token from Google:", accessToken);
        try {
            const response = await fetch("http://localhost:8000/api/auth/google/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_token: accessToken
                })
            });
            if (!response.ok) {
                throw new Error("Backend login failed");
            }
            // userData is what comes from your Python backend (e.g., { id: 1, name: "...", ... })
            const userData = await response.json();
            console.log("Successfully logged in to our app:", userData);
            // --- 💡 FIX 1: Map Backend Data to Frontend Store ---
            // Your store wants { id: "1", avatar: "..." }
            // Your backend sends { id: 1, user_image: "..." }
            const formattedUser = {
                id: String(userData.id),
                name: userData.name,
                email: userData.email,
                avatar: userData.user_image
            };
            // Set the *formatted* user in the global store
            setUser(formattedUser);
            // --- 💡 FIX 2: Change the Redirect Path ---
            router.push("/"); // Redirect to the homepage
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    const handleError = ()=>{
        console.log("Google Login Failed");
    };
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGoogleLogin"])({
        onSuccess: handleSuccess,
        onError: handleError
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>login(),
        className: "flex cursor-pointer items-center justify-center w-full md:w-auto gap-3 px-2 md:px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-lg    bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100    hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$react$2d$icons$2f$fc$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FcGoogle"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/src/components/Login/index.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-medium hidden md:flex text-sm 2xl:text-lg",
                children: "Đăng nhập"
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/src/components/Login/index.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/src/components/Login/index.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
}),
"[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$components$2f$Login$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/src/components/Login/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/src/store/useUserStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/@react-oauth/google/dist/index.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function NavigationItem({ name, href, actualLink }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = pathname === href || pathname.startsWith(href) && href !== "/";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: actualLink,
        className: `relative text-sm 2xl:text-base font-medium px-4 py-2 rounded-full transition-all duration-300 ease-out group
        ${isActive ? "text-[#f66868]" : "text-gray-700 hover:text-[#f66868]"}`,
        children: [
            name,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#f66868] transition-all duration-300 ${isActive ? "w-6" : "w-0 group-hover:w-6"}`
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function Navigation() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleMenu = ()=>setIsOpen((prev)=>!prev);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserStore"])((state)=>state.user);
    const setUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserStore"])((state)=>state.setUser);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const profileMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
        // Scroll effect for navbar
        const handleScroll = ()=>{
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleLogout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleLogout"])();
        setUser(null);
        setIsProfileMenuOpen(false);
        router.push("/");
    };
    const navLinks = [
        {
            name: "Trang chủ",
            href: "/",
            actualLink: "/"
        },
        {
            name: "Học tập",
            href: "/study/map",
            actualLink: "/study/map"
        },
        {
            name: "Cộng đồng",
            href: "/community",
            actualLink: "/community"
        },
        {
            name: "Từ điển",
            href: "/dictionary",
            actualLink: "/dictionary"
        },
        {
            name: "Chat Wave",
            href: "/chat",
            actualLink: "/chat"
        }
    ];
    if (pathname.startsWith("/chat")) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50" : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full mx-auto px-4 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-16 2xl:h-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-x-2.5 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/logo.svg",
                                            alt: "logo",
                                            width: 32,
                                            height: 32,
                                            className: "transition-transform duration-300 group-hover:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl 2xl:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent",
                                    children: "Wave Wave"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden xl:flex items-center space-x-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-full px-2 py-1.5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50",
                            children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavigationItem, {
                                    ...link
                                }, link.name, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden xl:flex items-center gap-x-4",
                            children: isClient ? user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: profileMenuRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsProfileMenuOpen((prev)=>!prev),
                                        className: "flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: user.avatar,
                                                        alt: user.name,
                                                        width: 36,
                                                        height: 36,
                                                        className: "rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-400 transition-all duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                lineNumber: 139,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 16,
                                                className: `text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                lineNumber: 149,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this),
                                    isProfileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 border-b border-gray-200 dark:border-gray-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-sm text-gray-900 dark:text-white truncate",
                                                        children: user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5",
                                                        children: user.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                lineNumber: 159,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                className: "w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 25
                                                    }, this),
                                                    "Đăng xuất"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                                lineNumber: 167,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                        lineNumber: 158,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                lineNumber: 134,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$components$2f$Login$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                lineNumber: 178,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "xl:hidden flex items-center gap-x-3",
                            children: [
                                isClient ? user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: user.avatar,
                                            alt: user.name,
                                            width: 40,
                                            height: 40,
                                            className: "rounded-full ring-2 ring-gray-200 dark:ring-gray-700 cursor-pointer hover:ring-red-400 transition-all duration-300"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 189,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$src$2f$components$2f$Login$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 200,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleMenu,
                                    className: "p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95",
                                    "aria-label": "Toggle Menu",
                                    children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                        lineNumber: 211,
                                        columnNumber: 25
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                        lineNumber: 211,
                                        columnNumber: 43
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "xl:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-4 space-y-1",
                    children: [
                        navLinks.map((link)=>{
                            const isActive = pathname === link.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: link.actualLink,
                                onClick: ()=>setIsOpen(false),
                                className: `block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive ? "bg-blue-50 dark:bg-blue-900/20 text-red-600" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`,
                                children: link.name
                            }, link.name, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                lineNumber: 224,
                                columnNumber: 17
                            }, this);
                        }),
                        isClient && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-gray-200 dark:border-gray-700 my-3"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 241,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        handleLogout();
                                        setIsOpen(false);
                                    },
                                    className: "w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this),
                                        "Đăng xuất"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
                lineNumber: 219,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/src/components/Navigation/index.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
}),
"[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Footer() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname.startsWith("/chat")) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: ` bg-[#C33D3D] bottom-0 text-white py-20 mt-20`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3 px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap justify-center gap-x-10 text-lg font-medium",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "hover:text-white/80 transition-colors duration-200",
                            children: "Trang chủ"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/study",
                            className: "hover:text-white/80 transition-colors duration-200",
                            children: "Học tập"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/community",
                            className: "hover:text-white/80 transition-colors duration-200",
                            children: "Cộng đồng"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dictionary",
                            className: "hover:text-white/80 transition-colors duration-200",
                            children: "Từ điển"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-white/80 mt-4",
                    children: [
                        "© Copyright 2025 – ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: "Wave Wave"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                            lineNumber: 64,
                            columnNumber: 30
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/src/components/Footer/index.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/Project_Sudo/wave-wave/src/components/AppProvider/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/node_modules/@react-oauth/google/dist/index.esm.js [app-ssr] (ecmascript)");
"use client"; // 👈 This is the most important part
;
;
function AppProviders({ children }) {
    const googleClientId = ("TURBOPACK compile-time value", "220476207053-8o90n6uqv35pfb0ntnnue54dp8hs0gss.apps.googleusercontent.com");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$node_modules$2f40$react$2d$oauth$2f$google$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleOAuthProvider"], {
        clientId: googleClientId,
        children: children
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/src/components/AppProvider/index.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9eee894c._.js.map