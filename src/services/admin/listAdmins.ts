import api from "@/services/api";

export interface AdminItem {
    id: string;
    fullName: string;
    email: string;
    root: boolean;
}

export interface PaginatedAdmins {
    data: AdminItem[];
    page: number;
    lastPage: number;
    total: number;
}

export async function listAdmins(page = 1, pageSize = 50): Promise<PaginatedAdmins> {
    const { data } = await api.get<PaginatedAdmins>("/admin", {
        params: { page, pageSize },
    });
    return data;
}

export async function listAllAdmins(maxPages = 5, pageSize = 50): Promise<AdminItem[]> {
    const items: AdminItem[] = [];
    let page = 1;
    for (let i = 0; i < maxPages; i++) {
        const res = await listAdmins(page, pageSize);
        items.push(...res.data);
        if (page >= res.lastPage) break;
        page += 1;
    }
    return items;
}
