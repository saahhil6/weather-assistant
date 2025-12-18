from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Weather Assistant API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM with OpenRouter
llm = ChatOpenAI(
    model="meta-llama/llama-3.1-8b-instruct",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    temperature=0.3,
)

# Weather tool using wttr.in (free, no API key needed)
@tool
def get_weather(city: str) -> str:
    """Get current weather information for a city. Use this when users ask about weather conditions."""
    try:
        # Using wttr.in free weather API
        url = f"https://wttr.in/{city}?format=j1"
        response = httpx.get(url, timeout=10.0)
        
        if response.status_code == 200:
            data = response.json()
            current = data['current_condition'][0]
            
            temp_c = current['temp_C']
            temp_f = current['temp_F']
            feels_like_c = current['FeelsLikeC']
            humidity = current['humidity']
            description = current['weatherDesc'][0]['value']
            wind_speed = current['windspeedKmph']
            
            return f"""Weather in {city}:
🌡️ Temperature: {temp_c}°C ({temp_f}°F)
🤔 Feels like: {feels_like_c}°C
☁️ Conditions: {description}
💧 Humidity: {humidity}%
💨 Wind Speed: {wind_speed} km/h"""
        else:
            return f"Sorry, I couldn't find weather data for {city}. Please check the city name."
    except Exception as e:
        return f"Error fetching weather: {str(e)}"

# Create agent
tools = [get_weather]

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful weather assistant. When users ask about weather in any city, 
    use the get_weather tool to fetch real-time data. Be friendly and conversational.
    If the query is not about weather, politely inform that you specialize in weather information."""),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent, 
    tools=tools, 
    verbose=True, 
    handle_parsing_errors=True,
    max_iterations=3
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.get("/")
async def root():
    return {
        "message": "Weather Assistant API is running! 🌤️",
        "status": "active",
        "endpoints": {
            "/chat": "POST - Send weather queries",
            "/health": "GET - Health check"
        }
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        result = agent_executor.invoke({"input": request.message})
        return ChatResponse(response=result["output"])
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "Weather Assistant API"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Weather Assistant API...")
    print("📍 Backend running on: http://localhost:8000")
    print("📚 API Docs available at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")