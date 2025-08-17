export const hasRole = (user, roleName) => {
  if (!user?.roles) return false
  return user.roles.some(r => typeof r === "string" ? r === roleName : r.name === roleName)
}
