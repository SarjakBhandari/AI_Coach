import logging
from fastapi import FastAPI
from models.user import User
from models.feedback import Feedback
from database.db import engine, Base
from app.routers.auth_routes import auth_router


logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.include_router(auth_router)


@app.on_event("startup")
def startup():
    logging.info("📦 Creating MySQL tables...")
    Base.metadata.create_all(bind=engine)

@app.get("/")
def health():
    logging.info("🔍 Root endpoint accessed")
    return {"msg": "Basketball AI backend is running"}
