import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Using the Quotable API - a free, open-source quotes API
    const response = await fetch("https://api.quotable.io/random");
    
    if (!response.ok) {
      throw new Error(`Quote API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the response to match our app's expected format
    const quote = {
      content: data.content,
      author: data.author
    };
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    
    // Fallback quotes in case the API fails
    const fallbackQuotes = [
      { 
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs" 
      },
      { 
        content: "Life is what happens when you're busy making other plans.",
        author: "John Lennon" 
      },
      { 
        content: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt" 
      },
      { 
        content: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius" 
      },
      { 
        content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill" 
      }
    ];
    
    // Return a random fallback quote if the API fails
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    // Still return a 200 response with a fallback quote
    return NextResponse.json(randomQuote);
  }
}