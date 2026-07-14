// routers/index.js
import { createRouter, createWebHistory } from "vue-router";
import { guideRoutes } from "./guide";
import workListData from "@/assets/language/menu/workList.json";

// workList.json에서 path 있는 항목만 라우트로 생성
const workListRoutes = workListData
    .filter(item => item.path) // path가 있는 항목만
    .map(item => {
        // children 구조 필요 시, path가 '/'인 경우 main_wrap, 그 외는 sub_wrap 등으로 분기
        let parentComponent = item.path.includes('gsr') ? 'main_wrap' : 'sub_wrap';
        return {
            path: item.link || `/${item.path}`,
            component: () => import(`@/uiPub/${parentComponent}.vue`),
            children: [
                {
                    path: '', // 기본 child
                    component: () => import(`@/uiPub/${item.path}.vue`)
                }
            ]
        }
    });

const routes = [
    // guideRoutes 유지
    ...guideRoutes,
    // workList.json 기반 자동 라우트
    ...workListRoutes
];

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
