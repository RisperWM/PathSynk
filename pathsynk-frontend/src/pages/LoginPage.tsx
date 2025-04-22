import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore"; // Updated import
import { useNavigate } from "react-router-dom";
import backgroundimage from "../assets/backgroundImage.jpg";
import logo from "../assets/pathsynk_icon_plain.png";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            return response.json();
        },
        onSuccess: (data) => {
            const { token, user } = data;
            setAuth(token, user); 
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error(error);
            alert("Invalid email or password");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate();
    };

    const goToRegister = () => {
        navigate("/signup");
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="h-screen w-screen flex flex-col items-center justify-center px-4"
        >
            <div className="flex flex-col justify-center p-10 text-center">
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
                className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg shadow-lg w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg space-y-4"
            >
                <div>
                    <label className="text-white font-semibold">Email Address:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="text-white font-semibold">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full p-2 my-8 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                </button>

                <div className="text-white text-sm text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={goToRegister}
                        className="text-blue-300 hover:text-blue-500 underline"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
