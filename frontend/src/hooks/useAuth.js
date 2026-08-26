const parseRoleFromToken = (token) => {
    if (!token) {
        return null;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
        return null;
    }

    try {
        const base64Payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64Payload));
        let role = payload.role || payload.roles;

        if (!role) {
            return null;
        }

        if (Array.isArray(role)) {
            role = role[0];
        }

        role = String(role).trim().toUpperCase();

        if (role.startsWith("ROLE_")) {
            role = role.substring(5);
        }

        return role;
    } catch (error) {
        console.error("Unable to parse token role:", error);
        return null;
    }
};

export const getUserRole = () => {
    const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("accessToken");

    return parseRoleFromToken(token);
};

export const isAdminUser = () => {
    return getUserRole() === "ADMIN";
};

export const setAuthData = ({ token, user, role }) => {
    if (token) {
        localStorage.setItem("token", token);
    }

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    if (role) {
        localStorage.setItem("userRole", role);
    }
};

export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
};
