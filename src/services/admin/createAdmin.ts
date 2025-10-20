import api from "../api";

export type CreateAdmin = {
  email: string;
  password: string;
  fullName: string;
  root: boolean;
};
export async function createAdmin(admin: CreateAdmin) {
  const response = await api.post("/admin", {
    email: admin.email,
    password: admin.password,
    fullName: admin.fullName,
    root: admin.root,
  });

  return {
    status: response.status,
    message: response.data.message,
  };
}
