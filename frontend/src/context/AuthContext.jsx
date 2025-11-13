import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/login/me', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    setUser(data.user);
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                setUser(data.user);
                return { success: true };
            } else {
                // Allow login with any credentials - create mock user
                const emailParts = email.split('@');
                const firstName = emailParts[0] || 'User';
                setUser({
                    email: email,
                    firstName: firstName,
                    lastName: '',
                });
                return { success: true };
            }
        } catch (error) {
            // Allow login with any credentials even if backend fails - create mock user
            const emailParts = email.split('@');
            const firstName = emailParts[0] || 'User';
            setUser({
                email: email,
                firstName: firstName,
                lastName: '',
            });
            return { success: true };
        }
    };

    const signup = async (firstName, lastName, email, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Signup failed. Please try again.' };
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/login/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

