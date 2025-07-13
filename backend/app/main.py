import logging
from fastapi import FastAPI
from app.routers import auth_routes
from models.user import create_tables

# Setup terminal logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[logging.StreamHandler()]
)

app = FastAPI()
logging.info("🚀 Basketball AI Backend booting up")

try:
    create_tables()
    logging.info("✅ Database tables initialized")
except Exception as e:
    logging.error(f"❌ DB initialization failed: {e}")

app.include_router(auth_routes.router)
logging.info("📦 Auth routes mounted")

@app.get("/")
def root():
    print("🔍 Root endpoint accessed")
    logging.info("🔍 Root endpoint accessed")
    return {"msg": "Basketball AI Backend is Live"}
