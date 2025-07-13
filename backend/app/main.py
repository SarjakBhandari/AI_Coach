# app/main.py
from fastapi import FastAPI
from app.routers import auth_routes
from models.user import create_tables

app = FastAPI()

create_tables()  # Initialize tables if not exist
app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"msg": "Basketball AI Backend is Live"}
