
export const RouteConfig = {
    Page404: { name: "page404", route: "404", page: "" },

    Manage:{name:"manage",route:"manage",page:"./manage/pages/manage.client.tsx"},
}

export const PageNameList = {
    Manage:"Manage"
}

export type PageName = "Manage"


export interface Route {
    route: string
    name: string
    page: string
}