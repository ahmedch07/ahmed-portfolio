import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local')
}

// Extend NodeJS global to cache connection
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

let cached = global._mongooseConn

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null }
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).catch((err) => {
      cached.promise = null
      throw err
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
