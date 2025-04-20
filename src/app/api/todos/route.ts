import { NextResponse } from "next/server";
import { MongoClient, ObjectId, Db, Collection } from "mongodb"; // Import types

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "dailyboost";
const collectionName = "todos";

if (!uri) {
  console.error("FATAL ERROR: MONGODB_URI environment variable is not defined.");
  // Consider throwing an error to prevent the app from potentially misbehaving
  // throw new Error("Please define the MONGODB_URI environment variable");
}

let client: MongoClient | null = null;
let db: Db | null = null;
let todosCollection: Collection | null = null;

// Function to establish connection (or return existing one)
async function getTodosCollection(): Promise<Collection> {
  // Reuse existing initialized collection object.
  // If the underlying connection was lost, the driver will attempt
  // to reconnect when the next operation is performed. If it fails,
  // the operation itself will throw an error caught by the handler's try/catch.
  if (todosCollection) {
    // console.log("Returning existing MongoDB collection instance.");
    return todosCollection;
  }

  // If not initialized (or connection was closed and state reset by 'close' listener), connect.
  try {
    console.log("Establishing new MongoDB connection...");
    // Ensure URI is defined before creating client
    if (!uri) {
        throw new Error("MONGODB_URI is not defined.");
    }
    client = new MongoClient(uri);

    // Add listeners *before* connecting
    client.on('close', () => {
      console.log('MongoDB connection explicitly closed.');
      // Reset state when closed to allow reconnection attempt on next request
      client = null; db = null; todosCollection = null;
    });
    client.on('error', (err) => {
      console.error('MongoDB client error event:', err);
      // Consider resetting state on critical errors too, depending on error type
      // client = null; db = null; todosCollection = null;
    });

    await client.connect(); // Connect the client
    db = client.db(dbName);
    todosCollection = db.collection(collectionName);
    console.log("Successfully connected to MongoDB!");

    return todosCollection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Attempt to close client if connection partially failed during setup
    if (client) {
        // Renamed closeErr to _closeErr
        try { await client.close(); } catch (_closeErr) { /* ignore */ }
    }
    // Reset state fully on connection failure
    client = null; db = null; todosCollection = null;
    throw new Error("Database connection failed"); // Re-throw for handlers
  }
}

// --- Request Handlers (GET, POST, PUT, DELETE) ---

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const collection = await getTodosCollection(); // Get collection (connects if needed)
    const todos = await collection.find({ userId }).toArray();
    return NextResponse.json(todos);

  } catch (error) {
    console.error("Error fetching todos:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch todos";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { text, userId } = await request.json();
        if (!text || !userId) return NextResponse.json({ error: "Text and userId are required" }, { status: 400 });

        const collection = await getTodosCollection(); // Get collection (connects if needed)
        const todo = { text, userId, completed: false, createdAt: new Date() };
        const result = await collection.insertOne(todo);

        return NextResponse.json({
            id: result.insertedId.toString(),
            text: todo.text, userId: todo.userId, completed: todo.completed, createdAt: todo.createdAt,
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to create todo";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, completed, text, userId } = await request.json();
        if (!id || !userId) return NextResponse.json({ error: "ID and userId are required" }, { status: 400 });
        if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid Todo ID format" }, { status: 400 });

        const collection = await getTodosCollection(); // Get collection (connects if needed)
        interface UpdateData { completed?: boolean; text?: string; }
        const updateData: UpdateData = {};
        if (completed !== undefined) updateData.completed = completed;
        if (text !== undefined) updateData.text = text;
        if (Object.keys(updateData).length === 0) return NextResponse.json({ error: "No update fields provided" }, { status: 400 });

        const result = await collection.updateOne({ _id: new ObjectId(id), userId }, { $set: updateData });
        if (result.matchedCount === 0) return NextResponse.json({ error: "Todo not found or user mismatch" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating todo:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to update todo";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const userId = searchParams.get("userId");
        if (!id || !userId) return NextResponse.json({ error: "ID and userId are required" }, { status: 400 });
        if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid Todo ID format" }, { status: 400 });

        const collection = await getTodosCollection(); // Get collection (connects if needed)
        const result = await collection.deleteOne({ _id: new ObjectId(id), userId });
        if (result.deletedCount === 0) return NextResponse.json({ error: "Todo not found or user mismatch" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting todo:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to delete todo";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}