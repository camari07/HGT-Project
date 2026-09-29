import { getSupabase } from "./supabaseClient";

const configuredBackend = (
  import.meta.env.VITE_DATA_BACKEND || "supabase"
).toLowerCase();

export const activeBackend =
  configuredBackend === "django" ? "django" : "supabase";

const djangoBaseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const resources = {
  farmActivity: {
    table: "farm_activities",
    djangoPath: "/api/farm/",
  },
  irrigation: {
    table: "irrigation_logs",
    djangoPath: "/api/irrigation/",
    // The original Django serializer did not receive this field.
    djangoOmit: ["fertilizer_used"],
  },
  maintenance: {
    table: "maintenance_requests",
    djangoPath: "/api/maintenance/",
  },
  report: {
    table: "reports",
    djangoPath: "/api/report/",
  },
};

function messageFromPayload(payload, fallback) {
  if (!payload) return fallback;
  if (typeof payload === "string") return payload;
  return payload.detail || payload.error || payload.message || fallback;
}

async function readJson(response) {
  return response.json().catch(() => ({}));
}

async function djangoRequest(path, options = {}) {
  const response = await fetch(`${djangoBaseUrl}${path}`, options);
  const payload = await readJson(response);

  if (!response.ok) {
    throw new Error(messageFromPayload(payload, "The Django request failed."));
  }

  return payload;
}

export async function signIn({ email, password }) {
  if (activeBackend === "supabase") {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    localStorage.setItem("token", data.session.access_token);
    localStorage.setItem("auth_provider", "supabase");
    return data;
  }

  const data = await djangoRequest("/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!data.token) {
    throw new Error("Django did not return an authentication token.");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("auth_provider", "django");
  return data;
}

export async function signUp({
  firstName,
  lastName,
  username,
  email,
  password,
}) {
  if (activeBackend === "supabase") {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username,
        },
      },
    });

    if (error) throw error;

    if (data.session) {
      localStorage.setItem("token", data.session.access_token);
      localStorage.setItem("auth_provider", "supabase");
    }

    return {
      ...data,
      requiresEmailConfirmation: !data.session,
    };
  }

  const data = await djangoRequest("/signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    }),
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("auth_provider", "django");
  }

  return { ...data, requiresEmailConfirmation: false };
}

export async function createRecord(resourceName, values) {
  const resource = resources[resourceName];
  if (!resource) throw new Error(`Unknown resource: ${resourceName}`);

  if (activeBackend === "supabase") {
    const supabase = getSupabase();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    const { data, error } = await supabase
      .from(resource.table)
      .insert({ ...values, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Your session has expired. Please sign in again.");

  const djangoValues = { ...values };
  resource.djangoOmit?.forEach((key) => delete djangoValues[key]);

  return djangoRequest(resource.djangoPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(djangoValues),
  });
}

export async function signOut() {
  if (activeBackend === "supabase") {
    const { error } = await getSupabase().auth.signOut();
    if (error) throw error;
  }
  localStorage.removeItem("token");
  localStorage.removeItem("auth_provider");
}
