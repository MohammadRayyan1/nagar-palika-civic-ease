export const BASE_URL = "https://dev272459.service-now.com/api/now/table/u_complaints";

// API for u_users table
export const USERS_URL = "https://dev272459.service-now.com/api/now/table/u_users";


// Replace with your PDI credentials
export const AUTH = "Basic " + btoa("admin:Kthz3-/DXV1z");

export async function fetchComplaints() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH,
    },
  });
  const data = await res.json();
  return data.result;
}

export async function createComplaint(complaint) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH,
    },
    body: JSON.stringify(complaint),
  });
  const data = await res.json();
  return data.result;
}

export async function updateComplaint(id, newStatus) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH,
    },
    body: JSON.stringify({ u_status: newStatus }),
  });
  const data = await res.json();
  return data.result;
}

// Fetch user by email and password
export async function authenticateUser(email, password) {
  const query = `?sysparm_query=u_email=${email}^u_password=${password}&sysparm_limit=1`;
  const res = await fetch(USERS_URL + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH,
    },
  });
  const data = await res.json();
  return data.result.length > 0 ? data.result[0] : null;
}

// Sign up new user
export async function signupUser(user) {
  const res = await fetch(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH,
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data.result;
}