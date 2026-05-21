import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        fetch(`${import.meta.env.VITE_API_URL}/profile/`, {
            headers: { "Authorization": `Token ${token}` }
        })
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.error("Failed to fetch profile:", err));
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/change-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            setMessage("Password changed successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            setError(data.error || "Failed to change password.");
        }
    };

    if (!profile) return (
        <div className="mt-24 text-center text-slate-500">Loading profile...</div>
    );

    return (
        <div className="mt-20 min-h-screen bg-green-50 px-6 md:px-20 py-12">
            <div className="max-w-3xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow p-8 mb-6 flex items-center gap-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-black">
                        {profile.username[0].toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{profile.username}</h1>
                        <p className="text-slate-500 text-sm">{profile.email}</p>
                    </div>
                </div>

                {/* Activity Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <p className="text-4xl font-black text-blue-600">{profile.irrigation_count}</p>
                        <p className="text-slate-500 text-sm mt-1">Irrigation Logs</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <p className="text-4xl font-black text-emerald-600">{profile.farm_count}</p>
                        <p className="text-slate-500 text-sm mt-1">Farm Activities</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <p className="text-4xl font-black text-slate-600">{profile.maintenance_count}</p>
                        <p className="text-slate-500 text-sm mt-1">Maintenance Records</p>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Change Password</h2>

                    {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter current password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition"
                        >
                            Update Password
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ProfilePage;