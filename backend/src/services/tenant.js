// Helpers that keep every mess inside its own data. Always search with the
// messId of the logged-in user, never with one sent by the client.

import { notFound } from '../lib/errors.js'
import { isId } from '../lib/validate.js'

/** A record of this mess, or a 404. Another mess's record looks missing. */
export async function findOwned(Model, id, mess, message) {
  const record = isId(id) ? await Model.findOne({ _id: id, messId: mess._id }) : null
  if (!record) throw notFound(message)
  return record
}
