// api.jsx
export const checkLogin = async () => {
  const response = await fetch(`/api/auth/login`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return {
    isAuthenticated: data.isAuthenticated,
    userData: data.userData,
  };
};

export const logoutUser = async () => {
  const response = await fetch(`/api/auth/logout`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.ok;
};

export const loginUser = async (formData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error('Login failed');
    error.response = data;
    throw error;
  }

  return data;
};

export const signupUser = async (formData) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error('Signup failed');
    error.response = data;
    throw error;
  }

  return data;
};

export const fetchNotes = async () => {
  try {
    const response = await fetch("/api/note/notes", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.notes; // Assuming notes are returned as an array in the response
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const createNote = async (formState) => {
  const response = await fetch(`/api/note/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formState),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`/api/note/notes/${noteId}/delete`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateNote = async (noteId, formState) => {
  const response = await fetch(`/api/note/notes/${noteId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formState),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const toggleImportance = async (noteId) => {
  const response = await fetch(`/api/note/notes/${noteId}/toggle`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};