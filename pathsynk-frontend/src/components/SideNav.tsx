import { NavLink } from 'react-router-dom';
import logo from '../assets/pathsynk_icon_plain.png';
import { Home, Briefcase, Settings, StickyNote } from 'lucide-react';

const navItems = [
    { label: "Home", icon: <Home size={18} />, path: "/dashboard" },
    { label: "Applications", icon: <Briefcase size={18} />, path: "/dashboard/jobs" },
    { label: "Interviews", icon: <Settings size={18} />, path: "/dashboard/interviews" },
    { label: "Notes", icon: <StickyNote size={18} />, path: "/dashboard/notes" },
];


const SideNav = () => {
    return (
        <div className="h-full text-white flex flex-col p-5 z-10 relative gap-8">
            <div>
                <div className="flex items-center gap-2 justify-center">
                    <img src={logo} alt="PathSynk Logo" className="w-10" />
                    <p
                        className="text-white text-3xl font-bold"
                        style={{ fontFamily: "Festive, cursive" }}
                    >
                        PathSynk
                    </p>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive
                                ? 'bg-white/20 text-white font-semibold'
                                : 'text-gray-200 hover:bg-white/10'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default SideNav;
