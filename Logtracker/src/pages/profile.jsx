import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "./backend";
import {
    FormActions,
    FormPage,
    FormSection,
    InlineError,
    inputClass,
    labelClass,
} from "./FormLayout";

const initialProfile = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
};

function ProfilePage() {
    const [profile, setProfile] = useState(initialProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let isCurrent = true;

        async function loadProfile() {
            try {
                const data = await getProfile();
                if (isCurrent) {
                    setProfile({
                        first_name: data.first_name || "",
                        last_name: data.last_name || "",
                        username: data.username || "",
                        email: data.email || "",
                    });
                }
            } catch (requestError) {
                if (isCurrent) {
                    setError(requestError?.message || "Unable to load your profile.");
                }
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        }

        loadProfile();
        return () => {
            isCurrent = false;
        };
    }, []);

    const updateField = (key) => (event) => {
        setProfile((current) => ({ ...current, [key]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            const data = await updateProfile({
                first_name: profile.first_name.trim(),
                last_name: profile.last_name.trim(),
                username: profile.username.trim(),
            });
            setProfile((current) => ({ ...current, ...data }));
            toast.success("Profile updated");
        } catch (requestError) {
            setError(requestError?.message || "Unable to update your profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <FormPage
            eyebrow="Account"
            title="Your profile"
            description="Keep your contact identity accurate across your farm records."
        >
            {isLoading ? (
                <div className="flex min-h-52 items-center justify-center" role="status">
                    <p className="text-sm font-semibold text-slate-500">Loading profile…</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <FormSection
                        title="Personal information"
                        description="Your name and username can be updated here."
                    >
                        <div>
                            <label className={labelClass} htmlFor="profileFirstName">First name</label>
                            <input
                                className={inputClass}
                                id="profileFirstName"
                                value={profile.first_name}
                                onChange={updateField("first_name")}
                                autoComplete="given-name"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="profileLastName">Last name</label>
                            <input
                                className={inputClass}
                                id="profileLastName"
                                value={profile.last_name}
                                onChange={updateField("last_name")}
                                autoComplete="family-name"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="profileUsername">Username</label>
                            <input
                                className={inputClass}
                                id="profileUsername"
                                value={profile.username}
                                onChange={updateField("username")}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="profileEmail">Email address</label>
                            <input
                                className={inputClass}
                                id="profileEmail"
                                value={profile.email}
                                type="email"
                                autoComplete="email"
                                disabled
                            />
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                Email changes are handled through your authentication account.
                            </p>
                        </div>
                    </FormSection>

                    <InlineError>{error}</InlineError>
                    <FormActions isSubmitting={isSaving} submitLabel="Save profile" />
                </form>
            )}
        </FormPage>
    );
}

export default ProfilePage;
