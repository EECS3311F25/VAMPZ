import { Link } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';
import { Logo } from './Logo';

const TopBar = ({ onToggleSidebar }) => {
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
       <div>
    );
};

export default TopBar;
