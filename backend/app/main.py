# app/main.py
import logging
from fastapi import FastAPI
from app.routers import auth_routes
from models.user import create_tables

# ✅ Set up logging
logging.basicConfig(
    level=logging.INFO,  # Options: DEBUG, INFO, WARNING, ERROR, CRITICAL
    format="%(asctime)s - %(levelname)s - %(message)s"
)

app = FastAPI()
logging.info("🚀 Starting Basketball AI Backend")

# Initialize DB tables
try:
    create_tables()
    logging.info("✅ Database tables initialized")
except Exception as e:
    logging.error(f"❌ Failed to initialize tables: {e}")

# Add routes
app.include_router(auth_routes.router)
logging.info("📦 Authentication routes loaded")

@app.get("/")
def root():
    print("🔍 Root endpoint accessed")  # This should show in terminal
    return {"msg": "Basketball AI Backend is Live"}
