import { v4 as uuidv4 } from "uuid";
import type { User } from '../types/type';

const LOCAL_STORAGE_KEY = "skillSheetUsers";

export const loadUsers = (): User[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load users from local storage:", error);
    return [];
  }
};

export const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save users to local storage:", error);
  }
};

export const generateUniqueId = (): string => {
  return uuidv4();
};

export const addUser = (user: User): User[] => {
  const users = loadUsers();
  const newUser = { ...user, id: generateUniqueId() };
  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);
  return updatedUsers;
};

export const updateUser = (updatedUser: User): User[] => {
  const users = loadUsers();
  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  saveUsers(updatedUsers);
  return updatedUsers;
};

export const deleteUser = (id: string): User[] => {
  const users = loadUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  saveUsers(updatedUsers);
  return updatedUsers;
};
