import { cookies } from "next/headers";

export const getSessionFromCookies = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  return sessionCookie ? JSON.parse(sessionCookie.value) : null;
};