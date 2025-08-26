export const BASE_URL = "https://dev272459.service-now.com/api/now/table/u_complaints";

// API for u_users table
export const USERS_URL = "https://dev272459.service-now.com/api/now/table/u_users";


// Replace with your PDI credentials
export const AUTH = "Basic " + btoa("admin:Kthz3-/DXV1z");


// FETCH COMPLAINT
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


// CREATE COMPLAINT
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


// UPDATE COMPLAINT
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


// Delete a complaint by sys_id

export async function deleteComplaint(sys_id) {
  const res = await fetch(`${BASE_URL}/${sys_id}`, {
    method: "DELETE",
    headers: {
      "Authorization": AUTH,
    },
  });

  // Some APIs return empty response for DELETE
  if (res.status === 204 || res.status === 200) {
    return { success: true };
  }

  // Try parsing JSON if there is content
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : { success: true };
  } catch (err) {
    console.warn("Failed to parse JSON on delete", err);
    return { success: true };
  }
}


// Delete a user by sys_id
// export async function deleteUser(id) {
//   const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

//   if (!res.ok) {
//     throw new Error("Failed to delete user");
//   }

//   // Only parse JSON if the response has content
//   const text = await res.text();
//   return text ? JSON.parse(text) : {};
// }

// Delete a user by sys_id
export const deleteUser = async (id) => {
  const response = await fetch(`${USERS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": AUTH,
    },
  });

  if (response.status === 204 || response.status === 200) {
    return { success: true };
  }

  // If response contains text, try to parse it
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : { success: true };
  } catch (err) {
    console.warn("Failed to parse JSON on delete", err);
    return { success: true };
  }
};



// Fetch all users (citizens)
export async function fetchUsers() {
  const res = await fetch(USERS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH,
    },
  });
  const data = await res.json();
  return data.result;
}

// Add new User
export async function createUser(user) {
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