import NotFound from "@/uiPub/warning/not_found.vue";
import WaitBuilding from "@/uiPub/warning/wait_building.vue";

const loadPage = (path) => {
    return () =>
        import(`@/guide/${path}`).catch(() => WaitBuilding);
};

export const guideRoutes = [
    {
        path: "/guide",
        component: loadPage("guide_wrap.vue"), // guide_wrap도 lazy-load
        name: "Guide_wrap",
        children: [
            { path: "", component: loadPage("index.vue") },
            { path: "WorkList", component: loadPage("WorkList.vue") },
            { path: "setInfo", component: loadPage("layout.vue") },
            { path: "elements", component: loadPage("elements.vue") },
            { path: "form", component: loadPage("form.vue") },
            { path: "list", component: loadPage("list.vue") },
            { path: "popup", component: loadPage("popup.vue") },
        ]
    },
    { path: "/:pathMatch(.*)*", name: 'NotFound', component: NotFound },
];