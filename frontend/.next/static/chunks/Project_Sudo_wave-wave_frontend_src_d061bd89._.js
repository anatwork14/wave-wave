(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Project_Sudo/wave-wave/frontend/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatActor",
    ()=>formatActor,
    "formatTime",
    ()=>formatTime,
    "removeBrackets",
    ()=>removeBrackets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatActor(name) {
    if (name == "teacher_agent") return "Mini Wave Teacher";
    else "Agent";
}
function removeBrackets(text) {
    // Remove anything inside parentheses (and the parentheses)
    return text.replace(/\s*\(.*?\)/g, "").trim();
}
function formatTime(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    // Get the difference in seconds
    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    // Less than 5 seconds
    if (seconds < 5) {
        return "just now";
    }
    // Less than 1 minute
    if (seconds < 60) {
        return "".concat(seconds, " seconds ago");
    }
    // Less than 1 hour
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return "".concat(minutes, " minute").concat(minutes > 1 ? "s" : "", " ago");
    }
    // Less than 1 day
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return "".concat(hours, " hour").concat(hours > 1 ? "s" : "", " ago");
    }
    // Less than 1 month
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return "".concat(days, " day").concat(days > 1 ? "s" : "", " ago");
    }
    // Less than 1 year
    const months = Math.floor(days / 30);
    if (months < 12) {
        return "".concat(months, " month").concat(months > 1 ? "s" : "", " ago");
    }
    // Years
    const years = Math.floor(months / 12);
    return "".concat(years, " year").concat(years > 1 ? "s" : "", " ago");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-[#C73B3B] text-primary-foreground hover:bg-[#C33D3D]/80 transition-all duration-500 cursor-pointer",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button(param) {
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/button.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger(param) {
    let { className, size = "default", children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent(param) {
    let { className, children, position = "popper", align = "center", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem(param) {
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
            lineNumber: 171,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreatePostModal",
    ()=>CreatePostModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/store/useUserStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const CATEGORIES = [
    "Tâm sự",
    "Tips học tập",
    "Câu chuyện",
    "Blog",
    "Khác"
];
// Mock data - replace with real data from your API
const USER_QUIZZES = [
    {
        id: "quiz_1",
        title: "Bài kiểm tra ngôn ngữ kí hiệu chủ đề động vật trong nhà",
        createdDate: "2025-11-22"
    },
    {
        id: "quiz_2",
        title: "Bài tập ngôn ngữ kí hiệu nâng cao",
        createdDate: "2025-11-01"
    },
    {
        id: "quiz_3",
        title: "Ôn tập 10 nội dung cơ bản",
        createdDate: "2025-11-15"
    }
];
const USER_SYLLABUSES = [
    {
        id: "syl_1",
        title: "Lộ trình học Python cơ bản",
        createdDate: "2024-01-10"
    },
    {
        id: "syl_2",
        title: "Kế hoạch ôn thi THPT Quốc gia",
        createdDate: "2024-01-18"
    },
    {
        id: "syl_3",
        title: "Chương trình học Toán 12",
        createdDate: "2024-01-22"
    }
];
function CreatePostModal(param) {
    let { isOpen, onClose, onSubmit } = param;
    var _user_email, _USER_QUIZZES_find, _USER_QUIZZES_find1, _USER_SYLLABUSES_find, _USER_SYLLABUSES_find1;
    _s();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Chọn chủ đề");
    const [selectedQuiz, setSelectedQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedSyllabus, setSelectedSyllabus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"])();
    const handleSubmit = async ()=>{
        if (!title.trim() || !content.trim()) {
            alert("Vui lòng điền đầy đủ tiêu đề và nội dung.");
            return;
        }
        setIsSubmitting(true);
        try {
            const postData = {
                title,
                content,
                category
            };
            if (selectedQuiz) {
                const quiz = USER_QUIZZES.find((q)=>q.id === selectedQuiz);
                if (quiz) postData.attachedQuiz = quiz;
            }
            if (selectedSyllabus) {
                const syllabus = USER_SYLLABUSES.find((s)=>s.id === selectedSyllabus);
                if (syllabus) postData.attachedSyllabus = syllabus;
            }
            onSubmit(postData);
            setTitle("");
            setContent("");
            setCategory("Chọn chủ đề");
            setSelectedQuiz("");
            setSelectedSyllabus("");
            onClose();
        } finally{
            setIsSubmitting(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in-0 duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl transform transition-all animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600",
            style: {
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db transparent"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 flex items-center justify-between p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-[#f66868]/10 via-[#ff8585]/10 to-[#f66868]/10 dark:from-[#f66868]/20 dark:via-[#ff8585]/20 dark:to-[#f66868]/20 backdrop-blur-xl z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-gradient-to-br from-[#f66868] to-[#ff5252] rounded-xl shadow-lg shadow-[#f66868]/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-5 h-5 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f66868] to-[#ff5252] bg-clip-text text-transparent",
                                    children: "Tạo bài viết mới"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 group",
                            "aria-label": "Đóng",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 22,
                                className: "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 sm:p-6 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: user === null || user === void 0 ? void 0 : user.avatar,
                                            alt: "Profile",
                                            className: "h-12 w-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700",
                                            width: 48,
                                            height: 48
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-gray-900 dark:text-white",
                                            children: "Bạn"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500 dark:text-gray-400",
                                            children: [
                                                "@",
                                                user === null || user === void 0 ? void 0 : (_user_email = user.email) === null || _user_email === void 0 ? void 0 : _user_email.split("@")[0]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold mb-2 text-gray-900 dark:text-white",
                                    children: [
                                        "Tiêu đề bài viết ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 169,
                                            columnNumber: 32
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: title,
                                    onChange: (e)=>setTitle(e.target.value),
                                    placeholder: "Bạn đang nghĩ gì hôm nay?",
                                    className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-[#f66868] focus:border-transparent outline-none transition-all",
                                    maxLength: 200
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 dark:text-gray-400 mt-2",
                                    children: [
                                        title.length,
                                        "/200 ký tự"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold mb-2 text-gray-900 dark:text-white",
                                    children: [
                                        "Danh mục ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 187,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    value: category,
                                    onValueChange: setCategory,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "w-full h-12 rounded-xl border-gray-300 dark:border-gray-700",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Chọn chủ đề"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                        children: "Chọn chủ đề"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 19
                                                    }, this),
                                                    CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: cat,
                                                            children: cat
                                                        }, cat, false, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold mb-2 text-gray-900 dark:text-white",
                                    children: [
                                        "Nội dung ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-500",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 209,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: content,
                                    onChange: (e)=>setContent(e.target.value),
                                    placeholder: "Chia sẻ suy nghĩ, kiến thức, hoặc câu hỏi của bạn...",
                                    className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-[#f66868] focus:border-transparent outline-none transition-all scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600",
                                    style: {
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "#d1d5db transparent"
                                    },
                                    rows: 6,
                                    maxLength: 5000
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 dark:text-gray-400 mt-2",
                                    children: [
                                        content.length,
                                        "/5000 ký tự"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-blue-100 dark:border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-gray-900 dark:text-white flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "w-4 h-4 text-blue-600 dark:text-blue-400"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 231,
                                            columnNumber: 15
                                        }, this),
                                        "Đính kèm nội dung (tùy chọn)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300",
                                            children: "Đính kèm bài quiz"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: selectedQuiz,
                                            onValueChange: setSelectedQuiz,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-full h-12 rounded-xl bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Chọn bài quiz của bạn"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                                children: "Bài quiz của bạn"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 21
                                                            }, this),
                                                            USER_QUIZZES.map((quiz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: quiz.id,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-medium",
                                                                                children: quiz.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                                lineNumber: 250,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-500 flex items-center gap-1 mt-0.5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                        className: "w-3 h-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                                        lineNumber: 252,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    new Date(quiz.createdDate).toLocaleDateString("vi-VN")
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                                lineNumber: 251,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                        lineNumber: 249,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, quiz.id, false, {
                                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this),
                                        selectedQuiz && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    className: "w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-gray-900 dark:text-white truncate",
                                                            children: (_USER_QUIZZES_find = USER_QUIZZES.find((q)=>q.id === selectedQuiz)) === null || _USER_QUIZZES_find === void 0 ? void 0 : _USER_QUIZZES_find.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                    lineNumber: 271,
                                                                    columnNumber: 23
                                                                }, this),
                                                                new Date(((_USER_QUIZZES_find1 = USER_QUIZZES.find((q)=>q.id === selectedQuiz)) === null || _USER_QUIZZES_find1 === void 0 ? void 0 : _USER_QUIZZES_find1.createdDate) || "").toLocaleDateString("vi-VN")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSelectedQuiz(""),
                                                    className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-4 h-4 text-gray-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300",
                                            children: "Đính kèm giáo trình"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: selectedSyllabus,
                                            onValueChange: setSelectedSyllabus,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-full h-12 rounded-xl bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Chọn giáo trình của bạn"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                                children: "Giáo trình của bạn"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 21
                                                            }, this),
                                                            USER_SYLLABUSES.map((syllabus)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: syllabus.id,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-medium",
                                                                                children: syllabus.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                                lineNumber: 306,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-500 flex items-center gap-1 mt-0.5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                        className: "w-3 h-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                                        lineNumber: 308,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    new Date(syllabus.createdDate).toLocaleDateString("vi-VN")
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                                lineNumber: 307,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                        lineNumber: 305,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, syllabus.id, false, {
                                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 293,
                                            columnNumber: 15
                                        }, this),
                                        selectedSyllabus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                    className: "w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-gray-900 dark:text-white truncate",
                                                            children: (_USER_SYLLABUSES_find = USER_SYLLABUSES.find((s)=>s.id === selectedSyllabus)) === null || _USER_SYLLABUSES_find === void 0 ? void 0 : _USER_SYLLABUSES_find.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "w-3 h-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                                    lineNumber: 330,
                                                                    columnNumber: 23
                                                                }, this),
                                                                new Date(((_USER_SYLLABUSES_find1 = USER_SYLLABUSES.find((s)=>s.id === selectedSyllabus)) === null || _USER_SYLLABUSES_find1 === void 0 ? void 0 : _USER_SYLLABUSES_find1.createdDate) || "").toLocaleDateString("vi-VN")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSelectedSyllabus(""),
                                                    className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-4 h-4 text-gray-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-gradient-to-br from-[#f66868]/10 to-[#ff8585]/10 dark:from-[#f66868]/20 dark:to-[#ff8585]/20 rounded-xl border border-[#f66868]/20 dark:border-[#f66868]/30",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-[#f66868] dark:text-[#ff8585] mb-2 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this),
                                        "Mẹo để viết bài hay:"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "text-sm text-gray-700 dark:text-gray-300 space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#f66868] mt-1",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Viết tiêu đề ngắn gọn, rõ ràng và thu hút"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#f66868] mt-1",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Giải thích đầy đủ nội dung và bối cảnh"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 359,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#f66868] mt-1",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Trình bày dễ đọc, chia đoạn hợp lý"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#f66868] mt-1",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Đính kèm quiz/giáo trình để tăng giá trị bài viết"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                            lineNumber: 367,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky bottom-0 flex items-center justify-end gap-3 p-5 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onClose,
                            disabled: isSubmitting,
                            className: "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl h-11 px-6",
                            children: "Hủy"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmit,
                            disabled: isSubmitting || !title.trim() || !content.trim(),
                            className: "bg-gradient-to-r from-[#f66868] to-[#ff5252] hover:from-[#e45a5a] hover:to-[#e44545] text-white shadow-lg shadow-[#f66868]/30 hover:shadow-xl hover:shadow-[#f66868]/40 rounded-xl h-11 px-6 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                            children: isSubmitting ? "Đang đăng..." : "Đăng bài viết"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                            lineNumber: 385,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(CreatePostModal, "Bhl0xB9oTuWxYEkuQ7itEOPhqrU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"]
    ];
});
_c = CreatePostModal;
var _c;
__turbopack_context__.k.register(_c, "CreatePostModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
let toastId = 0;
const toasts = [];
const listeners = [];
function useToast() {
    var _this = this;
    _s();
    const [toastList, setToastList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useToast.useEffect": ()=>{
            const listener = {
                "useToast.useEffect.listener": (newToasts)=>{
                    setToastList(newToasts);
                }
            }["useToast.useEffect.listener"];
            listeners.push(listener);
            return ({
                "useToast.useEffect": ()=>{
                    listeners.splice(listeners.indexOf(listener), 1);
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], []);
    const showToast = function(message) {
        let type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "info", duration = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3000;
        const id = String(toastId++);
        const icon = type === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx",
            lineNumber: 35,
            columnNumber: 28
        }, _this) : type === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx",
            lineNumber: 35,
            columnNumber: 69
        }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx",
            lineNumber: 35,
            columnNumber: 97
        }, _this);
        const newToast = {
            id,
            message,
            type,
            icon
        };
        toasts.push(newToast);
        listeners.forEach((listener)=>listener([
                ...toasts
            ]));
        setTimeout(()=>{
            const index = toasts.findIndex((t)=>t.id === id);
            if (index > -1) {
                toasts.splice(index, 1);
                listeners.forEach((listener)=>listener([
                        ...toasts
                    ]));
            }
        }, duration);
    };
    return {
        showToast,
        toasts: toastList
    };
}
_s(useToast, "WpJ49KiSKAHhRhZEFE/F6CBRHcU=");
function ToastContainer() {
    _s1();
    const { toasts } = useToast();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 space-y-2 z-40 pointer-events-none",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto animate-in fade-in slide-in-from-bottom-4 ".concat(toast.type === "success" ? "bg-green-500 text-white" : toast.type === "error" ? "bg-red-500 text-white" : "bg-primary text-primary-foreground"),
                children: [
                    toast.icon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: toast.message
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, toast.id, true, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s1(ToastContainer, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        useToast
    ];
});
_c = ToastContainer;
var _c;
__turbopack_context__.k.register(_c, "ToastContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function DropdownMenu(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dropdown-menu",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = DropdownMenu;
function DropdownMenuPortal(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dropdown-menu-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = DropdownMenuPortal;
function DropdownMenuTrigger(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dropdown-menu-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = DropdownMenuTrigger;
function DropdownMenuContent(param) {
    let { className, sideOffset = 4, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "dropdown-menu-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c3 = DropdownMenuContent;
function DropdownMenuGroup(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "dropdown-menu-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c4 = DropdownMenuGroup;
function DropdownMenuItem(param) {
    let { className, inset, variant = 'default', ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "dropdown-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c5 = DropdownMenuItem;
function DropdownMenuCheckboxItem(param) {
    let { className, children, checked, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        "data-slot": "dropdown-menu-checkbox-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_c6 = DropdownMenuCheckboxItem;
function DropdownMenuRadioGroup(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
        "data-slot": "dropdown-menu-radio-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_c7 = DropdownMenuRadioGroup;
function DropdownMenuRadioItem(param) {
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
        "data-slot": "dropdown-menu-radio-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                        className: "size-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_c8 = DropdownMenuRadioItem;
function DropdownMenuLabel(param) {
    let { className, inset, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "dropdown-menu-label",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_c9 = DropdownMenuLabel;
function DropdownMenuSeparator(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "dropdown-menu-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c10 = DropdownMenuSeparator;
function DropdownMenuShortcut(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "data-slot": "dropdown-menu-shortcut",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground ml-auto text-xs tracking-widest', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_c11 = DropdownMenuShortcut;
function DropdownMenuSub(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"], {
        "data-slot": "dropdown-menu-sub",
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 198,
        columnNumber: 10
    }, this);
}
_c12 = DropdownMenuSub;
function DropdownMenuSubTrigger(param) {
    let { className, inset, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
        "data-slot": "dropdown-menu-sub-trigger",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
                className: "ml-auto size-4"
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_c13 = DropdownMenuSubTrigger;
function DropdownMenuSubContent(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
        "data-slot": "dropdown-menu-sub-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
_c14 = DropdownMenuSubContent;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "DropdownMenu");
__turbopack_context__.k.register(_c1, "DropdownMenuPortal");
__turbopack_context__.k.register(_c2, "DropdownMenuTrigger");
__turbopack_context__.k.register(_c3, "DropdownMenuContent");
__turbopack_context__.k.register(_c4, "DropdownMenuGroup");
__turbopack_context__.k.register(_c5, "DropdownMenuItem");
__turbopack_context__.k.register(_c6, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c7, "DropdownMenuRadioGroup");
__turbopack_context__.k.register(_c8, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c9, "DropdownMenuLabel");
__turbopack_context__.k.register(_c10, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c11, "DropdownMenuShortcut");
__turbopack_context__.k.register(_c12, "DropdownMenuSub");
__turbopack_context__.k.register(_c13, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c14, "DropdownMenuSubContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$vi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/vi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function PostCard(param) {
    let { post, onToggleBookmark, onToggleLike, onFollowUser } = param;
    var _post_quiz, _post_syllabus;
    _s();
    const timeAgo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(post.timestamp, {
        addSuffix: true,
        locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$vi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vi"]
    });
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showComments, setShowComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "relative bg-white/80 backdrop-blur-xl rounded-[24px] border-2 border-[#ff978e]/30 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#f66868]/10 transition-all duration-300 group",
        whileHover: {
            y: -4
        },
        layout: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-[#f66868]/0 to-[#e14640]/0 group-hover:from-[#f66868]/5 group-hover:to-[#e14640]/5 transition-all duration-300 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-[20px] pb-[12px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "relative",
                                        whileHover: {
                                            scale: 1.1
                                        },
                                        transition: {
                                            type: "spring",
                                            stiffness: 400
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative size-[48px] rounded-full overflow-hidden cursor-pointer",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                alt: post.author.name,
                                                className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full",
                                                src: post.author.avatar
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-baloo font-semibold leading-[normal] text-[15px] text-black",
                                                children: post.author.name
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-[6px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-baloo font-normal leading-[normal] text-[#b1acac] text-[11px]",
                                                        children: [
                                                            "@",
                                                            post.author.username
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#b1acac]",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-baloo font-normal leading-[normal] text-[#b1acac] text-[11px]",
                                                        children: timeAgo
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px] items-center",
                                children: [
                                    !post.author.isFollowing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>onFollowUser(post.author.id),
                                        className: "bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] text-white px-[16px] py-[6px] rounded-[12px] flex items-center gap-[6px] shadow-md",
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                className: "size-[14px]"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-baloo text-[12px]",
                                                children: "Theo dõi"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>onFollowUser(post.author.id),
                                        className: "bg-white/60 backdrop-blur-sm border border-[#e2e2e2] text-[#5b5858] px-[16px] py-[6px] rounded-[12px] flex items-center gap-[6px] hover:border-[#f66868]",
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                className: "size-[14px]"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-baloo text-[12px]",
                                                children: "Đang theo dõi"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    className: "bg-white/60 backdrop-blur-sm border border-[#e2e2e2] p-[6px] rounded-[10px] hover:border-[#f66868] transition-colors",
                                                    whileHover: {
                                                        scale: 1.1
                                                    },
                                                    whileTap: {
                                                        scale: 0.9
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                        className: "size-[16px] text-[#5b5858]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                align: "end",
                                                className: "w-[180px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        className: "font-baloo gap-[8px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                className: "size-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 19
                                                            }, this),
                                                            "Chỉnh sửa"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        className: "font-baloo gap-[8px] text-red-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "size-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                                lineNumber: 128,
                                                                columnNumber: 19
                                                            }, this),
                                                            "Xóa bài viết"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-[20px] pb-[12px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-[8px] items-center flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "bg-gradient-to-r from-[#f66868]/20 to-[#e14640]/20 backdrop-blur-sm flex items-center justify-center px-[12px] py-[5px] relative rounded-[10px]",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-baloo font-semibold leading-[normal] relative shrink-0 text-[#e14640] text-[13px] text-nowrap whitespace-pre",
                                        children: post.category
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                post.tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "bg-white/40 backdrop-blur-sm border border-[#ff978e]/20 flex items-center justify-center px-[10px] py-[4px] relative rounded-[8px] hover:border-[#f66868] transition-colors cursor-pointer",
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-baloo leading-[normal] relative shrink-0 text-[#e14640] text-[11px] text-nowrap whitespace-pre",
                                            children: [
                                                "#",
                                                tag
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this)
                                    }, tag, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this)),
                                post.tags.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-baloo text-[11px] text-[#b1acac]",
                                    children: [
                                        "+",
                                        post.tags.length - 3
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-[20px] pb-[16px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "flex flex-col gap-[12px]",
                            initial: false,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-baloo font-bold leading-[1.3] text-[#c73b3b] text-[22px]",
                                    children: post.title
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-baloo font-normal leading-[1.6] text-[14px] text-[#5b5858] text-justify transition-all ".concat(isExpanded ? "" : "line-clamp-3"),
                                    children: post.content
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                post.content.length > 150 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: ()=>setIsExpanded(!isExpanded),
                                    className: "font-baloo text-[13px] text-[#f66868] hover:text-[#e14640] text-left transition-colors",
                                    whileHover: {
                                        x: 5
                                    },
                                    children: isExpanded ? "Thu gọn" : "Xem thêm"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    post.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "px-[20px] pb-[16px]",
                        whileHover: {
                            scale: 0.98
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full h-[280px] rounded-[16px] overflow-hidden border-2 border-[#ff978e]/20 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    alt: post.title,
                                    className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full hover:scale-105 transition-transform duration-500",
                                    src: post.image
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    (post.quiz || post.syllabus) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-[20px] pb-[16px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "w-full bg-gradient-to-br from-[#fff0f0] to-[#ffe4e4] border-2 border-[#ff978e]/40 rounded-[16px] p-[20px] hover:shadow-xl transition-all cursor-pointer group/card overflow-hidden relative",
                            whileHover: {
                                scale: 1.02,
                                y: -2
                            },
                            transition: {
                                duration: 0.2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-br from-[#f66868]/0 to-[#e14640]/0 group-hover/card:from-[#f66868]/10 group-hover/card:to-[#e14640]/10 transition-all duration-300"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-[16px] relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "bg-gradient-to-br from-[#f66868] to-[#e14640] p-[14px] rounded-[14px] shadow-lg",
                                            whileHover: {
                                                rotate: 360
                                            },
                                            transition: {
                                                duration: 0.5
                                            },
                                            children: post.quiz ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "size-[28px] text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 225,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                className: "size-[28px] text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 227,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-baloo font-bold text-[17px] text-[#c73b3b] mb-[4px]",
                                                    children: ((_post_quiz = post.quiz) === null || _post_quiz === void 0 ? void 0 : _post_quiz.title) || ((_post_syllabus = post.syllabus) === null || _post_syllabus === void 0 ? void 0 : _post_syllabus.title)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-baloo text-[12px] text-[#5b5858]",
                                                    children: [
                                                        post.quiz && "".concat(post.quiz.questionCount, " câu hỏi • ").concat(post.quiz.difficulty),
                                                        post.syllabus && "".concat(post.syllabus.lessonCount, " bài học • ").concat(post.syllabus.duration)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            className: "bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] text-white px-[20px] py-[10px] rounded-[12px] font-baloo font-semibold shadow-lg whitespace-nowrap",
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: 0.95
                                            },
                                            children: post.quiz ? "Làm quiz" : "Xem chi tiết"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-[20px] h-[1px] bg-gradient-to-r from-transparent via-[#ff978e]/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-[20px] py-[14px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>onToggleLike(post.id),
                                        className: "flex items-center gap-[6px] px-[16px] py-[8px] rounded-[12px] transition-all ".concat(post.isLiked ? "bg-gradient-to-r from-[#f66868]/20 to-[#e14640]/20 text-[#f66868]" : "bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]"),
                                        whileHover: {
                                            scale: 1.05,
                                            y: -2
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                className: "size-[18px] ".concat(post.isLiked ? "fill-[#f66868]" : "")
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 269,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-baloo text-[14px]",
                                                children: post.likes
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 274,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>setShowComments(!showComments),
                                        className: "flex items-center gap-[6px] px-[16px] py-[8px] rounded-[12px] transition-all bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]",
                                        whileHover: {
                                            scale: 1.05,
                                            y: -2
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                className: "size-[18px]"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-baloo text-[14px]",
                                                children: post.comments
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        className: "flex items-center gap-[6px] px-[16px] py-[8px] rounded-[12px] transition-all bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]",
                                        whileHover: {
                                            scale: 1.05,
                                            y: -2
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                className: "size-[18px]"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-baloo text-[14px]",
                                                children: post.shares
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>onToggleBookmark(post.id),
                                className: "flex items-center gap-[6px] px-[14px] py-[8px] rounded-[12px] transition-all ".concat(post.bookmarked ? "bg-gradient-to-r from-[#f66868]/20 to-[#e14640]/20 text-[#f66868]" : "bg-white/40 backdrop-blur-sm text-[#5b5858] hover:bg-[#fff0f0]"),
                                whileHover: {
                                    scale: 1.05,
                                    y: -2
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                    className: "size-[18px] ".concat(post.bookmarked ? "fill-[#f66868]" : "")
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                height: 0,
                                opacity: 0
                            },
                            animate: {
                                height: "auto",
                                opacity: 1
                            },
                            exit: {
                                height: 0,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.3
                            },
                            className: "overflow-hidden border-t-2 border-[#ff978e]/20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-[20px] py-[16px] bg-[#fff8f8]/50 backdrop-blur-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-[12px] mb-[16px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-[36px] rounded-full overflow-hidden ring-2 ring-[#ff978e]/20 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
                                                    alt: "User",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 327,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Viết bình luận...",
                                                    className: "w-full bg-white/80 backdrop-blur-sm border border-[#ff978e]/30 rounded-[12px] px-[16px] py-[10px] text-[13px] font-baloo focus:outline-none focus:border-[#f66868] focus:ring-2 focus:ring-[#f66868]/20 transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 326,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-baloo text-[12px] text-[#b1acac] text-center",
                                        children: "Chưa có bình luận nào"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                        lineNumber: 342,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                                lineNumber: 325,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(PostCard, "B2W/pWCESzJfwieeycXI+LEIYlU=");
_c = PostCard;
var _c;
__turbopack_context__.k.register(_c, "PostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/PostCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
;
;
;
const categories = [
    {
        name: "Tất cả",
        icon: "🌟"
    },
    {
        name: "Tâm sự",
        icon: "💭"
    },
    {
        name: "Chia sẻ",
        icon: "📢"
    },
    {
        name: "Thủ thuật",
        icon: "💡"
    },
    {
        name: "Quiz",
        icon: "📝"
    },
    {
        name: "Syllabus",
        icon: "📚"
    },
    {
        name: "Blog",
        icon: "✍️"
    }
];
function CommunityFeed(param) {
    let { posts, selectedCategory, onCategoryChange, onToggleBookmark, onToggleLike, onFollowUser, sortBy, onSortChange, selectedTags, onTagClick } = param;
    // Get all unique tags from posts
    const allTags = Array.from(new Set(posts.flatMap((post)=>post.tags))).slice(0, 10);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-[24px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "content-stretch flex items-center justify-between relative shrink-0 w-full",
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-[12px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-[#f66868] to-[#e14640] box-border content-stretch flex gap-[10px] items-center px-[20px] py-[8px] relative rounded-[16px] shrink-0 shadow-lg shadow-[#f66868]/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-baloo font-semibold leading-[normal] relative shrink-0 text-white text-[24px] text-nowrap whitespace-pre",
                                    children: "Cộng đồng"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/80 backdrop-blur-sm px-[16px] py-[6px] rounded-[12px] border border-[#ff978e]/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-baloo font-normal leading-[normal] relative shrink-0 text-[14px] text-[#5b5858] text-nowrap whitespace-pre",
                                    children: [
                                        posts.length,
                                        " bài đăng"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-[8px] items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>onSortChange("recent"),
                                className: "flex items-center gap-[6px] px-[14px] py-[6px] rounded-[10px] transition-all ".concat(sortBy === "recent" ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-[#5b5858] border border-[#e2e2e2] hover:border-[#f66868]"),
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "size-[14px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-baloo text-[13px]",
                                        children: "Mới nhất"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>onSortChange("popular"),
                                className: "flex items-center gap-[6px] px-[14px] py-[6px] rounded-[10px] transition-all ".concat(sortBy === "popular" ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-[#5b5858] border border-[#e2e2e2] hover:border-[#f66868]"),
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "size-[14px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-baloo text-[13px]",
                                        children: "Phổ biến"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>onSortChange("trending"),
                                className: "flex items-center gap-[6px] px-[14px] py-[6px] rounded-[10px] transition-all ".concat(sortBy === "trending" ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-[#5b5858] border border-[#e2e2e2] hover:border-[#f66868]"),
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                        className: "size-[14px]"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-baloo text-[13px]",
                                        children: "Thịnh hành"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex flex-wrap gap-[10px]",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.1
                },
                children: categories.map((category, index)=>{
                    const isActive = category.name === "Tất cả" ? selectedCategory === null : selectedCategory === category.name;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: ()=>onCategoryChange(category.name === "Tất cả" ? null : category.name),
                        className: "box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[12px] shrink-0 transition-all ".concat(isActive ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-lg shadow-[#f66868]/30" : "bg-white/80 backdrop-blur-sm border border-[#e2e2e2] hover:border-[#f66868] hover:shadow-md"),
                        whileHover: {
                            scale: 1.05,
                            y: -2
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: index * 0.05
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[16px]",
                                children: category.icon
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-baloo font-medium leading-[normal] relative shrink-0 text-[14px] text-nowrap whitespace-pre",
                                children: category.name
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        ]
                    }, category.name, true, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            allTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex flex-wrap gap-[8px] items-center",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-baloo text-[13px] text-[#b1acac]",
                        children: "Tags phổ biến:"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    allTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            onClick: ()=>onTagClick(tag),
                            className: "px-[12px] py-[4px] rounded-[8px] text-[12px] font-baloo transition-all ".concat(selectedTags.includes(tag) ? "bg-gradient-to-r from-[#f66868] to-[#e14640] text-white shadow-md" : "bg-white/60 backdrop-blur-sm text-[#e14640] border border-[#ff978e]/30 hover:border-[#f66868]"),
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            children: [
                                "#",
                                tag
                            ]
                        }, tag, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[2px] bg-gradient-to-r from-transparent via-[#ff978e]/30 to-transparent w-full"
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[24px]",
                children: posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "bg-white/60 backdrop-blur-sm rounded-[20px] p-[60px] text-center border border-[#e2e2e2]",
                    initial: {
                        opacity: 0,
                        scale: 0.9
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-baloo text-[18px] text-[#b1acac]",
                        children: "Không tìm thấy bài viết nào 😔"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                        lineNumber: 197,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this) : posts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: index * 0.1,
                            duration: 0.4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            post: post,
                            onToggleBookmark: onToggleBookmark,
                            onToggleLike: onToggleLike,
                            onFollowUser: onFollowUser
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                            lineNumber: 209,
                            columnNumber: 15
                        }, this)
                    }, post.id, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = CommunityFeed;
var _c;
__turbopack_context__.k.register(_c, "CommunityFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunitySidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
;
;
function CommunitySidebar(param) {
    let { user } = param;
    const topTopics = [
        {
            name: "Gia đình",
            count: 234,
            trend: "+12%"
        },
        {
            name: "Mua sắm",
            count: 189,
            trend: "+8%"
        },
        {
            name: "Ăn uống",
            count: 156,
            trend: "+15%"
        },
        {
            name: "Nghề nghiệp",
            count: 142,
            trend: "+5%"
        },
        {
            name: "Giải trí",
            count: 128,
            trend: "+10%"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-[20px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "bg-white/80 backdrop-blur-xl rounded-[24px] p-[24px] border-2 border-[#ff978e]/30 shadow-xl overflow-hidden relative",
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                whileHover: {
                    y: -4
                },
                transition: {
                    duration: 0.3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-br from-[#f66868]/10 to-[#e14640]/10 rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-[16px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "relative",
                                    whileHover: {
                                        scale: 1.1,
                                        rotate: 5
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 300
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative size-[90px] rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            alt: user.name,
                                            className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full cursor-pointer",
                                            src: user.avatar
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 39,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-[4px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-baloo font-bold text-[20px] text-black",
                                            children: user.name
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-baloo text-[13px] text-[#b1acac]",
                                            children: [
                                                "@",
                                                user.username
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-[32px] w-full justify-center pt-[16px] border-t-2 border-[#ffc4c4]/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "flex flex-col items-center",
                                            whileHover: {
                                                scale: 1.1,
                                                y: -2
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-[6px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-baloo font-bold text-[18px] text-[#c73b3b]",
                                                        children: user.posts
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-baloo text-[11px] text-[#5b5858]",
                                                    children: "Bài viết"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "flex flex-col items-center",
                                            whileHover: {
                                                scale: 1.1,
                                                y: -2
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-[6px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-baloo font-bold text-[18px] text-[#c73b3b]",
                                                        children: user.followers
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-baloo text-[11px] text-[#5b5858]",
                                                    children: "Người theo dõi"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "flex flex-col items-center",
                                            whileHover: {
                                                scale: 1.1,
                                                y: -2
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-[6px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-baloo font-bold text-[18px] text-[#c73b3b]",
                                                        children: user.following
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-baloo text-[11px] text-[#5b5858]",
                                                    children: "Đang theo dõi"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "bg-white/80 backdrop-blur-xl rounded-[24px] p-[20px] border-2 border-[#ff978e]/30 shadow-xl",
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.2
                },
                whileHover: {
                    y: -4
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-[16px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-[8px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-[#f66868] to-[#e14640] p-[8px] rounded-[10px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                        className: "size-[16px] text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-baloo font-bold text-[18px] text-[#c73b3b]",
                                    children: "Gợi ý theo dõi"
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-[12px]",
                            children: [
                                {
                                    name: "Lan Anh",
                                    username: "lananh_learning",
                                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                                    followers: "1.2k"
                                },
                                {
                                    name: "Minh Tuấn",
                                    username: "minhtuan_sign",
                                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                                    followers: "890"
                                },
                                {
                                    name: "Thu Hà",
                                    username: "thuha_teach",
                                    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
                                    followers: "2.3k"
                                }
                            ].map((suggestedUser, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "flex items-center justify-between p-[12px] rounded-[12px] bg-gradient-to-r from-[#fff8f8] to-white hover:from-[#fff0f0] hover:to-[#ffe4e4] transition-all border border-transparent hover:border-[#ff978e]/30",
                                    initial: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    transition: {
                                        delay: index * 0.05
                                    },
                                    whileHover: {
                                        scale: 1.02
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-[10px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative size-[40px] rounded-full overflow-hidden ring-2 ring-[#ff978e]/20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        alt: suggestedUser.name,
                                                        className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full",
                                                        src: suggestedUser.avatar
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-baloo font-semibold text-[13px] text-black",
                                                            children: suggestedUser.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-baloo text-[10px] text-[#b1acac]",
                                                            children: [
                                                                suggestedUser.followers,
                                                                " người theo dõi"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                            lineNumber: 166,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            className: "bg-gradient-to-r from-[#f66868] to-[#e14640] hover:from-[#e14640] hover:to-[#c73b3b] text-white px-[14px] py-[6px] rounded-[10px] font-baloo font-semibold text-[12px] shadow-md",
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: 0.95
                                            },
                                            children: "Theo dõi"
                                        }, void 0, false, {
                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, suggestedUser.username, true, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = CommunitySidebar;
var _c;
__turbopack_context__.k.register(_c, "CommunitySidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrendingSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
;
;
function TrendingSection(param) {
    let { posts } = param;
    // Get top 3 trending posts based on engagement
    const trendingPosts = [
        ...posts
    ].sort((a, b)=>{
        const aScore = a.likes + a.comments * 2 + a.shares * 3;
        const bScore = b.likes + b.comments * 2 + b.shares * 3;
        return bScore - aScore;
    }).slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "bg-white/80 backdrop-blur-xl rounded-[24px] p-[20px] border-2 border-[#ff978e]/30 shadow-xl",
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.3
        },
        whileHover: {
            y: -4
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-[16px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-[8px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-r from-orange-400 to-red-500 p-[8px] rounded-[10px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                className: "size-[16px] text-white"
                            }, void 0, false, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-baloo font-bold text-[18px] text-[#c73b3b]",
                            children: "Bài viết hot"
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-[12px]",
                    children: trendingPosts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "p-[14px] rounded-[14px] bg-gradient-to-r from-[#fff8f8] to-white hover:from-[#fff0f0] hover:to-[#ffe4e4] transition-all cursor-pointer border border-transparent hover:border-[#ff978e]/30 group",
                            initial: {
                                opacity: 0,
                                x: -20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            transition: {
                                delay: index * 0.05
                            },
                            whileHover: {
                                scale: 1.02,
                                x: 4
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[10px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gradient-to-r from-orange-400 to-red-500 rounded-[10px] size-[36px] flex items-center justify-center shadow-md",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-baloo font-bold text-[14px] text-white",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                lineNumber: 49,
                                                columnNumber: 19
                                            }, this),
                                            index === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: "absolute -top-1 -right-1",
                                                animate: {
                                                    rotate: [
                                                        0,
                                                        10,
                                                        -10,
                                                        0
                                                    ]
                                                },
                                                transition: {
                                                    repeat: Infinity,
                                                    duration: 2
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[16px]",
                                                    children: "🔥"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                lineNumber: 55,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-baloo font-semibold text-[13px] text-[#c73b3b] line-clamp-2 mb-[6px] group-hover:text-[#f66868] transition-colors",
                                                children: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                lineNumber: 66,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-[8px] text-[11px] text-[#b1acac]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[4px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "❤️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                                lineNumber: 72,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-baloo",
                                                                children: post.likes
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                                lineNumber: 73,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[4px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "💬"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                                lineNumber: 77,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-baloo",
                                                                children: post.comments
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                                lineNumber: 78,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[4px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "👁️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-baloo",
                                                                children: post.views
                                                            }, void 0, false, {
                                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-[6px] mt-[6px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-[20px] rounded-full overflow-hidden ring-1 ring-[#ff978e]/30",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: post.author.avatar,
                                                            alt: post.author.name,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                            lineNumber: 89,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-baloo text-[10px] text-[#b1acac]",
                                                        children: [
                                                            "@",
                                                            post.author.username
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = TrendingSection;
var _c;
__turbopack_context__.k.register(_c, "TrendingSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$CommunityFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$CommunitySidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunitySidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$TrendingSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/TrendingSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
// Mock current user
const currentUser = {
    id: "user-1",
    name: "Công Tước Hắc Ám",
    username: "congtuochacam",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    followers: 1234,
    following: 567,
    posts: 89,
    bio: "Đam mê học ngôn ngữ ký hiệu và chia sẻ kiến thức 🤟",
    isFollowing: false
};
// Mock posts data
const initialPosts = [
    {
        id: "post-1",
        author: currentUser,
        title: "Vì sao tôi chọn học ngôn ngữ ký hiệu",
        content: "Tôi vẫn nhớ rất rõ lần đầu tiên tôi nhìn thấy hai người giao tiếp bằng ngôn ngữ ký hiệu — không có âm thanh, chỉ có ánh mắt, bàn tay và những nụ cười. Dù không hiểu họ nói gì, tôi vẫn cảm nhận được sự kết nối mạnh mẽ trong từng cử chỉ. Và có lẽ, chính khoảnh khắc ấy đã gieo trong tôi ý định học ngôn ngữ ký hiệu.",
        category: "Tâm sự",
        tags: [
            "Động lực",
            "Ngôn ngữ",
            "Hoà nhập",
            "Chia sẻ"
        ],
        likes: 245,
        comments: 32,
        shares: 18,
        views: 1250,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        bookmarked: false,
        isLiked: false,
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=400&fit=crop"
    },
    {
        id: "post-2",
        author: {
            id: "user-2",
            name: "Minh Anh",
            username: "minhanh_signlang",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            followers: 890,
            following: 234,
            posts: 45,
            bio: "Giáo viên ngôn ngữ ký hiệu | Sharing daily tips 📚",
            isFollowing: false
        },
        title: "10 ký hiệu thông dụng nhất trong giao tiếp hàng ngày",
        content: "Hôm nay mình muốn chia sẻ với các bạn 10 ký hiệu mà mình thấy được sử dụng nhiều nhất trong cuộc sống hàng ngày. Đây là những ký hiệu cơ bản mà ai học ngôn ngữ ký hiệu cũng nên biết!",
        category: "Chia sẻ",
        tags: [
            "Học tập",
            "Cơ bản",
            "Hướng dẫn"
        ],
        likes: 512,
        comments: 67,
        shares: 89,
        views: 3420,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        bookmarked: true,
        isLiked: true,
        image: "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?w=800&h=400&fit=crop"
    },
    {
        id: "post-3",
        author: {
            id: "user-3",
            name: "Tuấn Kiệt",
            username: "tuankiet_learning",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
            followers: 456,
            following: 189,
            posts: 23,
            bio: "Learning journey 🎯",
            isFollowing: true
        },
        title: "Bài Quiz: Các ký hiệu về gia đình",
        content: "Mình vừa tạo một bài quiz về các ký hiệu liên quan đến gia đình. Các bạn thử làm xem mình được bao nhiêu điểm nhé!",
        category: "Quiz",
        tags: [
            "Quiz",
            "Gia đình",
            "Thực hành"
        ],
        quiz: {
            id: "quiz-1",
            title: "Bài Quiz: Các ký hiệu về gia đình",
            questionCount: 15,
            difficulty: "Trung bình"
        },
        likes: 189,
        comments: 45,
        shares: 23,
        views: 890,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        bookmarked: false,
        isLiked: false
    },
    {
        id: "post-4",
        author: {
            id: "user-4",
            name: "Hương Lan",
            username: "huonglan_teach",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            followers: 2341,
            following: 345,
            posts: 156,
            bio: "Educator | Sign Language Expert 👐",
            isFollowing: false
        },
        title: "Lộ trình học ngôn ngữ ký hiệu từ A-Z",
        content: "Sau nhiều yêu cầu từ các bạn, hôm nay mình chia sẻ toàn bộ lộ trình học của mình từ lúc mới bắt đầu cho đến khi có thể giao tiếp thành thạo. Hy vọng sẽ giúp ích cho những bạn mới!",
        category: "Syllabus",
        tags: [
            "Lộ trình",
            "Học tập",
            "Hướng dẫn"
        ],
        syllabus: {
            id: "syllabus-1",
            title: "Lộ trình học ngôn ngữ ký hiệu từ A-Z",
            lessonCount: 24,
            duration: "3 tháng"
        },
        likes: 891,
        comments: 134,
        shares: 267,
        views: 5670,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
        bookmarked: true,
        isLiked: false,
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=400&fit=crop"
    },
    {
        id: "post-5",
        author: {
            id: "user-5",
            name: "Phương Thảo",
            username: "phuongthao_tips",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
            followers: 678,
            following: 423,
            posts: 67,
            bio: "Tips & Tricks enthusiast 💡",
            isFollowing: false
        },
        title: "Mẹo nhớ nhanh các ký hiệu phức tạp",
        content: "Nhiều bạn hỏi mình làm sao để nhớ được những ký hiệu phức tạp. Hôm nay mình sẽ chia sẻ một số mẹo giúp các bạn nhớ lâu hơn và học hiệu quả hơn!",
        category: "Thủ thuật",
        tags: [
            "Mẹo học",
            "Ghi nhớ",
            "Hiệu quả"
        ],
        likes: 423,
        comments: 56,
        shares: 78,
        views: 2340,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
        bookmarked: false,
        isLiked: false
    }
];
function CommunityPage() {
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPosts);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [createPostOpen, setCreatePostOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("recent");
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const handleCreatePost = async (newPostData)=>{
        if (!user || !user.id) {
            console.log("Chờ currentUser, chưa tải bài viết...");
            setIsLoading(false); // Dừng tải nếu không có user
            return;
        }
        try {
            const response = await fetch("".concat(("TURBOPACK compile-time value", "http://127.0.0.1:8000"), "/api/posts"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "x-user-id": user.id.toString()
                },
                // Gửi dữ liệu từ form (CreatePostDialog) làm body
                body: JSON.stringify(newPostData)
            });
            if (!response.ok) throw new Error("Failed to create post");
            // API trả về bài viết đầy đủ (với author, ID, v.v.)
            const createdPost = await response.json();
            // Thêm bài viết mới vào đầu danh sách
            setPosts([
                createdPost,
                ...posts
            ]);
            setCreatePostOpen(false); // Đóng dialog
        } catch (error) {
            console.error("Error creating post:", error);
        // Tùy chọn: hiển thị thông báo lỗi cho người dùng
        }
    };
    const handleToggleBookmark = (postId)=>{
        setPosts(posts.map((post)=>post.id === postId ? {
                ...post,
                bookmarked: !post.bookmarked
            } : post));
    };
    const handleToggleLike = (postId)=>{
        setPosts(posts.map((post)=>post.id === postId ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1
            } : post));
    };
    const handleFollowUser = (userId)=>{
        setPosts(posts.map((post)=>post.author.id === userId ? {
                ...post,
                author: {
                    ...post.author,
                    isFollowing: !post.author.isFollowing,
                    followers: post.author.isFollowing ? post.author.followers - 1 : post.author.followers + 1
                }
            } : post));
    };
    const handleTagClick = (tag)=>{
        setSelectedTags((prev)=>prev.includes(tag) ? prev.filter((t)=>t !== tag) : [
                ...prev,
                tag
            ]);
    };
    let filteredPosts = posts;
    // Filter by category
    if (selectedCategory) {
        filteredPosts = filteredPosts.filter((post)=>post.category === selectedCategory);
    }
    // Filter by search query
    if (searchQuery) {
        filteredPosts = filteredPosts.filter((post)=>post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()) || post.author.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Filter by tags
    if (selectedTags.length > 0) {
        filteredPosts = filteredPosts.filter((post)=>post.tags.some((tag)=>selectedTags.includes(tag)));
    }
    // Sort posts
    filteredPosts = [
        ...filteredPosts
    ].sort((a, b)=>{
        if (sortBy === "recent") {
            return b.timestamp.getTime() - a.timestamp.getTime();
        } else if (sortBy === "popular") {
            return b.likes - a.likes;
        } else if (sortBy === "trending") {
            const aScore = a.likes + a.comments * 2 + a.shares * 3;
            const bScore = b.likes + b.comments * 2 + b.shares * 3;
            return bScore - aScore;
        }
        return 0;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1400px] mx-auto px-[28px] mt-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-[32px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "flex-1 min-w-0",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$CommunityFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            posts: filteredPosts,
                            selectedCategory: selectedCategory,
                            onCategoryChange: setSelectedCategory,
                            onToggleBookmark: handleToggleBookmark,
                            onToggleLike: handleToggleLike,
                            onFollowUser: handleFollowUser,
                            sortBy: sortBy,
                            onSortChange: setSortBy,
                            selectedTags: selectedTags,
                            onTagClick: handleTagClick
                        }, void 0, false, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                        lineNumber: 320,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "w-[360px] shrink-0",
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            duration: 0.4,
                            delay: 0.2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-[20px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$CommunitySidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    user: currentUser
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$TrendingSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    posts: posts
                                }, void 0, false, {
                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
                lineNumber: 318,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
            lineNumber: 317,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx",
        lineNumber: 316,
        columnNumber: 5
    }, this);
}
_s(CommunityPage, "4iYsoaibCClGBlKyi4OU5pZih2U=");
_c = CommunityPage;
var _c;
__turbopack_context__.k.register(_c, "CommunityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPageHome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$create$2d$post$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/create-post-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/toast-notification.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$CommunityPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project_Sudo/wave-wave/frontend/src/app/community/components/CommunityPage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CommunityPageHome() {
    _s();
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            author: "Nguyễn Minh Anh",
            avatar: "/professional-woman-diverse.png",
            timestamp: "2 giờ trước",
            title: "Tips học tập hiệu quả cho sinh viên",
            content: "Sau 4 năm đại học với GPA 3.8, mình muốn chia sẻ những phương pháp học tập đã giúp mình thành công. Từ việc tạo lịch trình hợp lý đến kỹ thuật ghi chú Cornell, tất cả đều có trong bài viết này...",
            category: "Tips học tập",
            upvotes: 234,
            downvotes: 12,
            comments: 45,
            shares: 28,
            saved: false,
            userVote: null,
            attachedQuiz: {
                id: "quiz_001",
                title: "Kiểm tra kiến thức Toán học lớp 10",
                createdDate: "2024-01-15"
            }
        },
        {
            id: 2,
            author: "Trần Văn Hùng",
            avatar: "/professional-man.jpg",
            timestamp: "4 giờ trước",
            title: "Hành trình từ zero đến hero trong lập trình",
            content: "Một năm trước mình chưa biết code là gì, giờ đây mình đã có việc làm với mức lương khá. Trong bài này, mình sẽ chia sẻ lộ trình học từng bước và những nguồn tài nguyên miễn phí mà mình đã sử dụng...",
            category: "Blog",
            upvotes: 512,
            downvotes: 8,
            comments: 89,
            shares: 156,
            saved: false,
            userVote: null,
            attachedSyllabus: {
                id: "syl_001",
                title: "Lộ trình học lập trình Full-stack từ cơ bản",
                createdDate: "2024-01-18"
            }
        },
        {
            id: 3,
            author: "Lê Thị Hương",
            avatar: "/professional-woman-glasses.png",
            timestamp: "6 giờ trước",
            title: "Vượt qua khó khăn trong kỳ thi THPT",
            content: "Năm ngoái mình đã trải qua kỳ thi THPT với rất nhiều áp lực. Nhưng nhờ có sự chuẩn bị kỹ lưỡng và mindset đúng đắn, mình đã đạt được kết quả mong muốn. Đây là những điều mình học được...",
            category: "Tâm sự",
            upvotes: 189,
            downvotes: 5,
            comments: 32,
            shares: 67,
            saved: false,
            userVote: null
        },
        {
            id: 4,
            author: "Phạm Quốc Việt",
            avatar: "/professional-man.jpg",
            timestamp: "8 giờ trước",
            title: "Bí quyết học Tiếng Anh giao tiếp hiệu quả",
            content: "Từng mất 2 năm học Tiếng Anh nhưng vẫn không nói được, mình đã thay đổi phương pháp và chỉ sau 6 tháng đã có thể giao tiếp tự tin. Phương pháp shadowing và immersion đã thay đổi cuộc chơi...",
            category: "Tips học tập",
            upvotes: 421,
            downvotes: 15,
            comments: 67,
            shares: 93,
            saved: true,
            userVote: "up",
            attachedQuiz: {
                id: "quiz_002",
                title: "Test trình độ Tiếng Anh giao tiếp",
                createdDate: "2024-01-20"
            },
            attachedSyllabus: {
                id: "syl_002",
                title: "Lộ trình 6 tháng chinh phục Tiếng Anh giao tiếp",
                createdDate: "2024-01-22"
            }
        },
        {
            id: 5,
            author: "Đặng Thu Hà",
            avatar: "/professional-woman-diverse.png",
            timestamp: "1 ngày trước",
            title: "Câu chuyện về việc chuyển ngành sang IT",
            content: "Từ một cử nhân Kinh tế, mình đã quyết định chuyển sang học IT ở tuổi 25. Nhiều người nói mình điên, nhưng giờ đây mình không hối hận về quyết định đó. Đây là hành trình đầy thử thách nhưng đáng giá...",
            category: "Câu chuyện",
            upvotes: 678,
            downvotes: 23,
            comments: 124,
            shares: 201,
            saved: false,
            userVote: null
        },
        {
            id: 6,
            author: "Hoàng Minh Tuấn",
            avatar: "/professional-man.jpg",
            timestamp: "1 ngày trước",
            title: "Ôn thi Đại học môn Vật Lý: Phương pháp và tài liệu",
            content: "Vật Lý là môn khiến nhiều bạn đau đầu trong kỳ thi THPT. Mình đã từng gặp khó khăn tương tự, nhưng sau khi áp dụng phương pháp học có hệ thống và luyện đề đúng cách, điểm số đã cải thiện đáng kể...",
            category: "Tips học tập",
            upvotes: 345,
            downvotes: 18,
            comments: 56,
            shares: 78,
            saved: false,
            userVote: "up",
            attachedQuiz: {
                id: "quiz_003",
                title: "Đề thi thử Vật Lý THPT 2024",
                createdDate: "2024-01-25"
            }
        },
        {
            id: 7,
            author: "Vũ Khánh Linh",
            avatar: "/professional-woman-glasses.png",
            timestamp: "2 ngày trước",
            title: "Làm thế nào để cân bằng học tập và sức khỏe tinh thần",
            content: "Trong quá trình chuẩn bị thi cử, nhiều bạn quên mất việc chăm sóc sức khỏe tinh thần của mình. Mình đã từng burnout và phải nghỉ học một thời gian. Đây là những bài học mình rút ra được về việc tìm sự cân bằng...",
            category: "Tâm sự",
            upvotes: 289,
            downvotes: 7,
            comments: 41,
            shares: 52,
            saved: true,
            userVote: null
        },
        {
            id: 8,
            author: "Bùi Đức Anh",
            avatar: "/professional-man.jpg",
            timestamp: "3 ngày trước",
            title: "Review khóa học lập trình Python cho người mới",
            content: "Vừa hoàn thành khóa học Python 6 tháng, mình muốn chia sẻ trải nghiệm cũng như đánh giá về chất lượng giảng dạy, nội dung bài học và độ thực tế của các dự án. Hy vọng sẽ giúp các bạn đưa ra quyết định đúng đắn...",
            category: "Blog",
            upvotes: 156,
            downvotes: 12,
            comments: 28,
            shares: 34,
            saved: false,
            userVote: "down",
            attachedSyllabus: {
                id: "syl_003",
                title: "Giáo trình Python từ cơ bản đến nâng cao",
                createdDate: "2024-01-10"
            }
        },
        {
            id: 9,
            author: "Ngô Mai Phương",
            avatar: "/professional-woman-diverse.png",
            timestamp: "4 ngày trước",
            title: "Những điều ước gì biết trước khi vào đại học",
            content: "Năm cuối đại học nhìn lại, mình nhận ra có rất nhiều điều mà nếu biết từ năm nhất thì con đường sẽ thuận lợi hơn nhiều. Từ việc chọn môn tự chọn đến networking và thực tập, đây là những lời khuyên chân thành nhất...",
            category: "Khác",
            upvotes: 412,
            downvotes: 9,
            comments: 73,
            shares: 98,
            saved: false,
            userVote: null
        },
        {
            id: 10,
            author: "Đinh Công Minh",
            avatar: "/professional-man.jpg",
            timestamp: "5 ngày trước",
            title: "Chinh phục kỳ thi IELTS 7.5 trong 3 tháng",
            content: "Nhiều người nghĩ 3 tháng là không đủ để đạt IELTS 7.5, nhưng với kế hoạch học chi tiết và phương pháp đúng đắn, điều này hoàn toàn khả thi. Mình đã làm được và bây giờ sẽ chia sẻ toàn bộ lộ trình...",
            category: "Tips học tập",
            upvotes: 892,
            downvotes: 31,
            comments: 156,
            shares: 243,
            saved: true,
            userVote: "up",
            attachedQuiz: {
                id: "quiz_004",
                title: "IELTS Practice Test - Reading & Listening",
                createdDate: "2024-01-12"
            },
            attachedSyllabus: {
                id: "syl_004",
                title: "Lộ trình 3 tháng chinh phục IELTS 7.5+",
                createdDate: "2024-01-14"
            }
        }
    ]);
    const handleVote = (postId, voteType)=>{
        setPosts(posts.map((post)=>{
            if (post.id === postId) {
                const newPost = {
                    ...post
                };
                if (post.userVote === voteType) {
                    newPost.userVote = null;
                    if (voteType === "up") newPost.upvotes--;
                    else newPost.downvotes--;
                } else {
                    if (post.userVote === "up") newPost.upvotes--;
                    if (post.userVote === "down") newPost.downvotes--;
                    newPost.userVote = voteType;
                    if (voteType === "up") newPost.upvotes++;
                    else newPost.downvotes++;
                }
                return newPost;
            }
            return post;
        }));
    };
    const handleSave = (postId)=>{
        setPosts(posts.map((post)=>post.id === postId ? {
                ...post,
                saved: !post.saved
            } : post));
    };
    const handleCreatePost = (newPost)=>{
        const post = {
            id: posts.length + 1,
            author: "You",
            avatar: "/diverse-user-avatars.png",
            timestamp: "now",
            title: newPost.title,
            content: newPost.content,
            category: newPost.category,
            upvotes: 0,
            downvotes: 0,
            comments: 0,
            shares: 0,
            saved: false,
            userVote: null
        };
        setPosts([
            post,
            ...posts
        ]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$create$2d$post$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreatePostModal"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                onSubmit: handleCreatePost
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {}, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 mt-16 2xl:mt-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 bg-gradient-to-br from-[#F66868] to-[#ff8a80] rounded-xl shadow-lg shadow-[#F66868]/30",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-6 h-6 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F66868] via-[#ff7a7a] to-[#ff9a8f] bg-clip-text text-transparent",
                                                children: "Cộng đồng Wave Wave"
                                            }, void 0, false, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl",
                                        children: "Kết nối, chia sẻ kiến thức và cùng nhau phát triển. Tham gia thảo luận với hàng nghìn thành viên đam mê học tập."
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-6 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-700 dark:text-gray-300 font-medium",
                                                        children: "1.2k"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500 dark:text-gray-400",
                                                        children: "đang online"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                        className: "w-4 h-4 text-blue-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-700 dark:text-gray-300 font-medium",
                                                        children: "342"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500 dark:text-gray-400",
                                                        children: "bài viết hôm nay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsModalOpen(true),
                                className: "flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#F66868] to-[#ff8a80] hover:scale-110 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-[#F66868]/40 hover:shadow-[#F66868]/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                        className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tạo bài viết"
                                    }, void 0, false, {
                                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$src$2f$app$2f$community$2f$components$2f$CommunityPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsModalOpen(true),
                className: "lg:hidden fixed bottom-6 right-6 p-4 bg-gradient-to-r from-[#F66868] to-[#ff8a80] text-white rounded-full shadow-2xl shadow-[#F66868]/40 hover:shadow-[#F66868]/60 hover:scale-110 active:scale-95 transition-all duration-300 z-40 group",
                "aria-label": "Create post",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project_Sudo$2f$wave$2d$wave$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                    className: "w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                }, void 0, false, {
                    fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                    lineNumber: 343,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project_Sudo/wave-wave/frontend/src/app/community/page.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s(CommunityPageHome, "W2DRpeJshFldlkkP36+gAXm97XQ=");
_c = CommunityPageHome;
var _c;
__turbopack_context__.k.register(_c, "CommunityPageHome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Project_Sudo_wave-wave_frontend_src_d061bd89._.js.map