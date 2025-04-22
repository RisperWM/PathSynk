import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import backgroundimage from "../assets/backgroundImage.jpg";
import logo from "../assets/pathsynk_icon_plain.png";

const SignUpPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");
    const [profile, setProfile] = useState("");
    const [status] = useState("active");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = "Name is required.";
        else if (name.trim().length < 3)
            newErrors.name = "Name must be at least 3 characters.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!emailRegex.test(email))
            newErrors.email = "Enter a valid email address.";

        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";

        if (!confirmPassword)
            newErrors.confirmPassword = "Please confirm your password.";
        else if (confirmPassword !== password)
            newErrors.confirmPassword = "Passwords do not match.";

        if (!role) newErrors.role = "Role is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name,
                    email,
                    password,
                    role,
                    profile,
                    status,
                }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            return response.json();
        },
        onSuccess: () => {
            alert("Registration successful! You can now log in.");
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
            alert("Registration failed. Try again.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            registerMutation.mutate();
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="min-h-screen w-screen flex flex-col items-center justify-center px-4"
        >
            <div className="flex flex-col justify-center p-6 text-center">
                <div className="flex flex-row gap-2 items-center justify-center mb-2">
                    <img src={logo} alt="PathSynk Logo" className="w-16" />
                    <p
                        className="text-slate-200 text-5xl font-bold"
                        style={{ fontFamily: "Festive, cursive" }}
                    >
                        PathSynk
                    </p>
                </div>
                <p className="text-xl font-medium text-slate-300">
                    Where planning meets preparation
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <div>
                    <label className="text-white">Full Name:</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="text-white">Email Address:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div>
                    <label className="text-white">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label className="text-white">Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                    )}
                </div>

                <div>
                    <label className="text-white">Role:</label>
                    <select
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-red-400 text-sm">{errors.role}</p>}
                </div>

                <div>
                    <label className="text-white">Profile URL:</label>
                    <input
                        type="text"
                        placeholder="Profile URL"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                    />
                    {errors.profile && <p className="text-red-400 text-sm">{errors.profile}</p>}
                </div>

                {/* Hidden status field */}
                <input type="hidden" value={status} />

                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {registerMutation.isPending ? "Registering..." : "Register"}
                </button>

                <div className="text-white text-sm text-center mt-4">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-blue-300 hover:text-blue-500 underline"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
