export function setUserId(id: number) {
    localStorage.setItem("userId", id.toString());
}

export function getUserId(): number | null {
    const val = localStorage.getItem("userId");
    return val ? Number(val) : null;
}

export function clearUserId() {
    localStorage.removeItem("userId");
}

export function setAdminUser(AdminUser: boolean): void {
    localStorage.setItem("AdminUser", String(AdminUser));
}

export function getAdminUser(): boolean | null {
    const val = localStorage.getItem("AdminUser");
    if (val === null) return false; // nothing stored
    return val === "true"; // convert back to boolean
}

export function clearAdminUser(): void {
    localStorage.removeItem("isAdminUser");
}