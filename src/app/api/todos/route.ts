import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

// MongoDB connection string
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)
const dbName = "dailyboost"
const collectionName = "todos"

async function connectToDatabase() {
  try {
    await client.connect()
    return client.db(dbName).collection(collectionName)
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Database connection failed")
  }
}

// GET all todos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const collection = await connectToDatabase()
    const todos = await collection.find({ userId }).toArray()

    return NextResponse.json(todos)
  } catch (error) {
    console.error("Error fetching todos:", error)
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
  } finally {
    await client.close()
  }
}

// POST a new todo
export async function POST(request: Request) {
  try {
    const { text, userId } = await request.json()

    if (!text || !userId) {
      return NextResponse.json({ error: "Text and userId are required" }, { status: 400 })
    }

    const collection = await connectToDatabase()

    const todo = {
      text,
      userId,
      completed: false,
      createdAt: new Date(),
    }

    const result = await collection.insertOne(todo)

    return NextResponse.json({
      id: result.insertedId,
      ...todo,
    })
  } catch (error) {
    console.error("Error creating todo:", error)
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
  } finally {
    await client.close()
  }
}

// PUT to update a todo
export async function PUT(request: Request) {
  try {
    const { id, completed, text, userId } = await request.json()

    if (!id || !userId) {
      return NextResponse.json({ error: "ID and userId are required" }, { status: 400 })
    }

    const collection = await connectToDatabase()

    const updateData: any = {}
    if (completed !== undefined) updateData.completed = completed
    if (text !== undefined) updateData.text = text

    const result = await collection.updateOne({ _id: new ObjectId(id), userId }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating todo:", error)
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 })
  } finally {
    await client.close()
  }
}

// DELETE a todo
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const userId = searchParams.get("userId")

    if (!id || !userId) {
      return NextResponse.json({ error: "ID and userId are required" }, { status: 400 })
    }

    const collection = await connectToDatabase()

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting todo:", error)
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 })
  } finally {
    await client.close()
  }
}
