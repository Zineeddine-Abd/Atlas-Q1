import { pool } from './index.js'

async function test() {
  const result = await pool.query('SELECT NOW()')
  console.log('Database connected!', result.rows[0])
  process.exit(0)
}

test().catch((err) => {
  console.error('Connection failed:', err)
  process.exit(1)
})