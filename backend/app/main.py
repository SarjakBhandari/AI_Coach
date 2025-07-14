import logging
from fastapi import FastAPI
from app.routers.auth_routes import auth_router
from app.routers.feedback_routes import feedback_router
from database.db import Base, engine
from app.routers.auth_routes import auth_router
from app.routers.feedback_routes import feedback_router
from app.routers.user_routes import user_router



logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.on_event("startup")
def startup():
    logging.info("🔧 Creating MySQL tables...")
    Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(feedback_router)

app.include_router(auth_router)
app.include_router(feedback_router)
app.include_router(user_router)
@app.get("/")
def health():
    logging.info("✅ Root endpoint hit")
    return {"msg": "Basketball AI backend is running"}

if __name__ == "__main__":
    import uvicorn
    import os
    from dotenv import load_dotenv

    load_dotenv()
    host = os.getenv("SERVER_HOST", "127.0.0.1")
    port = int(os.getenv("SERVER_PORT", 8000))

    uvicorn.run("app.main:app", host=host, port=port, reload=True)
