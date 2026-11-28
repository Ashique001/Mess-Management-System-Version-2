// Creates the super admin, or resets its password, using the SUPERADMIN_*
// settings in backend/.env:  npm run create-superadmin

import { configProblems, getConfig } from '../src/config.js'
import { connectDb, disconnectDb } from '../src/db.js'
import { saveSuperAdmin } from '../src/services/accounts.js'

const config = getConfig()
const problems = configProblems(config)
if (!config.superAdmin) problems.push('SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD must be set.')

if (problems.length) {
  console.error('Please fix backend/.env:')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

try {
  await connectDb(config.mongodbUri)
  const user = await saveSuperAdmin(config.superAdmin)
  console.log(`Super admin is ready: ${user.email}`)
} catch (error) {
  console.error(`Failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await disconnectDb()
}
