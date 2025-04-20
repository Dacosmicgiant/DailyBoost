import { NextResponse } from "next/server";

// Define a large list of quotes
const quotes = [
  {
    content: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa"
  },
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
  },
  {
    content: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
  {
    content: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart"
  },
  {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    content: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  },
  {
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    content: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller"
  },
  {
    content: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison"
  },
  {
    content: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein"
  },
  {
    content: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth"
  },
  {
    content: "The purpose of our lives is to be happy.",
    author: "Dalai Lama"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    content: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
  // Add many more quotes here to make the list large
    {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
    {
    content: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison"
  },
    {
    content: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost"
  },
    {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
    {
    content: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey"
  },
    {
    content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron"
  },
    {
    content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
    author: "Steve Jobs"
  },
    {
    content: "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
    author: "Oprah Winfrey"
  },
    {
    content: "If you don't build your dream, someone else will hire you to help them build theirs.",
    author: "Tony Gaskins"
  },
    {
    content: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (from Alice in Wonderland)"
  },
    {
    content: "The function of leadership is to produce more leaders, not more followers.",
    author: "Ralph Nader"
  },
    {
    content: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
    {
    content: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    author: "Winston Churchill"
  },
    {
    content: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett"
  },
    {
    content: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
    {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
    {
    content: "The most common way people give up their power is by thinking they don't have any.",
    author: "Alice Walker"
  },
    {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
    {
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
    {
    content: "An unexamined life is not worth living.",
    author: "Socrates"
  },
    {
    content: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
    {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
    {
    content: "Winning isn't everything, but wanting to win is.",
    author: "Vince Lombardi"
  },
    {
    content: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey"
  },
    {
    content: "Every child is an artist. The problem is how to remain an artist once he grows up.",
    author: "Pablo Picasso"
  },
    {
    content: "You can never cross the ocean until you have the courage to lose sight of the shore.",
    author: "Christopher Columbus"
  },
    {
    content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou"
  },
    {
    content: "Either you run the day, or the day runs you.",
    author: "Jim Rohn"
  },
    {
    content: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford"
  },
    {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
    {
    content: "Go confidently in the direction of your dreams! Live the life you've imagined.",
    author: "Henry David Thoreau"
  },
    {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
    {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
    {
    content: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart"
  },
    {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
    {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
    {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
    {
    content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
    {
    content: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
    {
    content: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
    {
    content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa"
  },
    {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
    {
    content: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  },
    {
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
    {
    content: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller"
  },
    {
    content: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison"
  },
    {
    content: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein"
  },
    {
    content: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth"
  },
    {
    content: "The purpose of our lives is to be happy.",
    author: "Dalai Lama"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
    {
    content: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
    {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
    {
    content: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison"
  },
    {
    content: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost"
  },
    {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
    {
    content: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey"
  },
    {
    content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron"
  },
    {
    content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to do what you love. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
    author: "Steve Jobs"
  },
    {
    content: "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
    author: "Oprah Winfrey"
  },
    {
    content: "If you don't build your dream, someone else will hire you to help them build theirs.",
    author: "Tony Gaskins"
  },
    {
    content: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (from Alice in Wonderland)"
  },
    {
    content: "The function of leadership is to produce more leaders, not more followers.",
    author: "Ralph Nader"
  },
    {
    content: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
    {
    content: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    author: "Winston Churchill"
  },
    {
    content: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett"
  },
    {
    content: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
    {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
    {
    content: "The most common way people give up their power is by thinking they don't have any.",
    author: "Alice Walker"
  },
    {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
    {
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
    {
    content: "An unexamined life is not worth living.",
    author: "Socrates"
  },
    {
    content: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
    {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
    {
    content: "Winning isn't everything, but wanting to win is.",
    author: "Vince Lombardi"
  },
    {
    content: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey"
  },
    {
    content: "Every child is an artist. The problem is how to remain an artist once he grows up.",
    author: "Pablo Picasso"
  },
    {
    content: "You can never cross the ocean until you have the courage to lose sight of the shore.",
    author: "Christopher Columbus"
  },
    {
    content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou"
  },
    {
    content: "Either you run the day, or the day runs you.",
    author: "Jim Rohn"
  },
    {
    content: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford"
  },
    {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
    {
    content: "Go confidently in the direction of your dreams! Live the life you've imagined.",
    author: "Henry David Thoreau"
  },
     { content: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { content: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
  { content: "The greatest wealth is to live content with little.", author: "Plato" },
  { content: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { content: "I think, therefore I am.", author: "René Descartes" },
  { content: "The unexamined life is not worth living.", author: "Socrates" },
  { content: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { content: "The mind is everything. What you think you become.", author: "Buddha" },
  { content: "Eighty percent of success is showing up.", author: "Woody Allen" },
  { content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { content: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", author: "Robert Frost" },
  { content: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey" },
  { content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron" },
  { content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.", author: "Steve Jobs" },
  { content: "The greatest discovery of all time is that a person can change his future by merely changing his attitude.", author: "Oprah Winfrey" },
  { content: "If you don't build your dream, someone else will hire you to help them build theirs.", author: "Tony Gaskins" },
  { content: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh (from Alice in Wonderland)" },
  { content: "The function of leadership is to produce more leaders, not more followers.", author: "Ralph Nader" },
  { content: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { content: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", author: "Winston Churchill" },
  { content: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
  { content: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { content: "The most common way people give up their power is by thinking they don't have any.", author: "Alice Walker" },
  { content: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { content: "Winning isn't everything, but wanting to win is.", author: "Vince Lombardi" },
  { content: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { content: "Every child is an artist. The problem is how to remain an artist once he grows up.", author: "Pablo Picasso" },
  { content: "You can never cross the ocean until you have the courage to lose sight of the shore.", author: "Christopher Columbus" },
  { content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou" },
  { content: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { content: "The quick brown fox jumps over the lazy dog.", author: "Anonymous" },
  { content: "Programming is fun.", author: "Someone who likes coding" },
  { content: "Hello, world!", author: "The first programmer" },
  { content: "Keep calm and code on.", author: "A developer" },
  { content: "Eat, sleep, code, repeat.", author: "A dedicated coder" },
  { content: "Debugging is like being a detective in a crime movie where you are also the murderer.", author: "Unknown" },
  { content: "Code is like humor. When it's explained, it's bad.", author: "Cory House" },
  { content: "Software is a great combination of artistry and engineering.", author: "Bill Gates" },
  { content: "There are only two kinds of languages: the ones people complain about and the ones nobody uses.", author: "Bjarne Stroustrup" },
  { content: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { content: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { content: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { content: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { content: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { content: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    content: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
    {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
    {
    content: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison"
  },
    {
    content: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost"
  },
    {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
    {
    content: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey"
  },
    {
    content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron"
  },
    {
    content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
    author: "Steve Jobs"
  },
    {
    content: "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
    author: "Oprah Winfrey"
  },
    {
    content: "If you don't build your dream, someone else will hire you to help them build theirs.",
    author: "Tony Gaskins"
  },
    {
    content: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh (from Alice in Wonderland)"
  },
    {
    content: "The function of leadership is to produce more leaders, not more followers.",
    author: "Ralph Nader"
  },
    {
    content: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
    {
    content: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    author: "Winston Churchill"
  },
    {
    content: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett"
  },
    {
    content: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
    {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
    {
    content: "The most common way people give up their power is by thinking they don't have any.",
    author: "Alice Walker"
  },
    {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
    {
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
    {
    content: "An unexamined life is not worth living.",
    author: "Socrates"
  },
    {
    content: "Eighty percent of success is showing up.",
    author: "Woody Allen"
  },
    {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
    {
    content: "Winning isn't everything, but wanting to win is.",
    author: "Vince Lombardi"
  },
    {
    content: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey"
  },
    {
    content: "Every child is an artist. The problem is how to remain an artist once he grows up.",
    author: "Pablo Picasso"
  },
    {
    content: "You can never cross the ocean until you have the courage to lose sight of the shore.",
    author: "Christopher Columbus"
  },
    {
    content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou"
  },
    {
    content: "Either you run the day, or the day runs you.",
    author: "Jim Rohn"
  },
    {
    content: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford"
  },
    {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
    {
    content: "Go confidently in the direction of your dreams! Live the life you've imagined.",
    author: "Henry David Thoreau"
  },
    {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
    {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
    {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
    {
    content: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart"
  },
    {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
    {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
    {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
    {
    content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
    {
    content: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
    {
    content: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
    {
    content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa"
  },
    {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
    {
    content: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  },
    {
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
    {
    content: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller"
  },
    {
    content: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison"
  },
    {
    content: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein"
  },
    {
    content: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth"
  },
    {
    content: "The purpose of our lives is to be happy.",
    author: "Dalai Lama"
  }
];

export async function GET() {
  // Select a random quote from the predefined list
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Return the random quote as a JSON response
  return NextResponse.json(randomQuote);
}