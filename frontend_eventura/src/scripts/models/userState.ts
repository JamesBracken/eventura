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

export function setIsAdminUser(isAdminUser: boolean): void {
    localStorage.setItem("isAdminUser", String(isAdminUser));
}

export function getIsAdminUser(): boolean | null {
    const val = localStorage.getItem("isAdminUser");
    if (val === null) return false; // nothing stored
    return val === "true"; // convert back to boolean
}

export function clearIsAdminUser(): void {
    localStorage.removeItem("isAdminUser");
}