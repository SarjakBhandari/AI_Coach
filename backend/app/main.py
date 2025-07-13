import logging
from fastapi import FastAPI
from app.routers.auth_routes import auth_router
from app.routers.feedback_routes import feedback_router
from database.db import Base, engine

logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.on_event("startup")
def startup():
    logging.info("🔧 Creating MySQL tables...")
    Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(feedback_router)

@app.get("/")
def health():
    logging.info("✅ Root endpoint hit")
    return {"msg": "Basketball AI backend is running"}
