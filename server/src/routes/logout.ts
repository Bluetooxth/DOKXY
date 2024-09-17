export function handleLogout(c: any) {
  const clearedCookie = "token=; Max-Age=0; Path=/; HttpOnly";

  c.header("Set-Cookie", clearedCookie);
  return c.json({ message: "Logout successful" }, 200);
}