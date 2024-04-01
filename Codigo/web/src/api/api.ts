import Cookies from "universal-cookie";
import { toast } from "sonner";
const cookies = new Cookies();

export const api = async (endpoint: string, init?: RequestInit | undefined) => {
  const token = cookies.get("user");

  const response = await fetch(`https://localhost:7039/${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (response.status === 401 && cookies.get("user")) {
    toast.error("Não autorizado");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
  return response;
};
