// What the API sends out. Listing the fields keeps private ones from leaking.

export const userView = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  active: user.active,
  lastLoginAt: user.lastLoginAt,
})

export const messView = (mess) =>
  mess && {
    id: String(mess._id),
    name: mess.name,
    address: mess.address,
    phone: mess.phone,
    status: mess.status,
    memberLimit: mess.memberLimit,
    createdAt: mess.createdAt,
  }

export const sessionView = (user, mess) => ({ user: userView(user), mess: messView(mess) })
