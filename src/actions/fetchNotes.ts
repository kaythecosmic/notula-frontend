"use server";
import axios from "axios";

export const fetchNotes = async () => {
  try {
    const apiClient = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_BACKEND_DEV_BASE_URL
          : process.env.NEXT_BACKEND_PROD_BASE_URL,
      withCredentials: true,
    });
    const response = await apiClient.get("/notes");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error while posting a request:", error);
  }
};

export const deleteNote = async (noteID: number) => {
  try {
    const apiClient = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_BACKEND_DEV_BASE_URL
          : process.env.NEXT_BACKEND_PROD_BASE_URL,
      withCredentials: true,
    });
    const response = await apiClient.delete(`/delNote/${noteID}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error while posting a request:", error);
  }
};

export const updateNote = async (noteID: number, updates: TypeNote) => {
  try {
    const apiClient = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_BACKEND_DEV_BASE_URL
          : process.env.NEXT_BACKEND_PROD_BASE_URL,
      withCredentials: true,
    });
    const response = await apiClient.put(`/notes/${noteID}`, updates);
    const data = response.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error while posting a request:", error);
  }
};

export const createNote = async (note: any) => {
  try {
    const apiClient = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_BACKEND_DEV_BASE_URL
          : process.env.NEXT_BACKEND_PROD_BASE_URL,
      withCredentials: true,
    });
    const response = await apiClient.post(`/notes`, note);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error while posting a request:", error);
  }
};
