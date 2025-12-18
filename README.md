1)Weather AI Assistant 

A simple full-stack weather assistant that lets users ask about the weather in any city using a chat-based interface.

The project combines a modern React frontend with a FastAPI backend and uses LangChain with an LLM to understand user queries and trigger weather lookups when required.

2)What this project does
	•	Users can ask natural language questions like:
	•	“What’s the weather in Pune?”
	•	“Tell me today’s weather in Mumbai”
	•	The system understands the intent using an LLM
	•	A backend tool fetches the actual weather data
	•	The response is shown in a chat-style UI

This project was built to understand how LLMs can be integrated with real-world APIs in a clean and practical way.

3)Tech Stack

Frontend
	•	React (Vite)
	•	Tailwind CSS
	•	Deployed on Netlify

Backend
	•	FastAPI
	•	LangChain
	•	OpenAI / OpenRouter compatible LLM
	•	HTTPX for API calls
	•	Deployed on Render


4) How it works (high level)
	1.	The user enters a question in the frontend.
	2.	The request is sent to the FastAPI backend.
	3.	LangChain processes the input using an LLM.
	4.	If weather data is needed, a tool function (get_weather) is triggered.
	5.	The backend fetches real weather data.
	6.	The final response is sent back to the frontend.


5) Project Strucutre
frontend/
├── public/
├── src/
│   ├── App.jsx   
│   ├── main.jsx       
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md

Environment Variables

The backend requires the following environment variables:

OPENAI_API_KEY=your_api_key_here
WEATHER_API_KEY=your_weather_api_key_here

Running Locally

Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Frontend
cd frontend
npm install
npm run dev

Purpose of the project

This project was built to:
	•	Understand how LLMs interact with external tools
	•	Learn FastAPI backend development
	•	Practice frontend–backend integration
	•	Deploy a real full-stack application

It is intentionally kept simple and readable rather than over-engineered.

