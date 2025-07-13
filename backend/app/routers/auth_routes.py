from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.db import SessionLocal
from models.user import User
from app.services.auth import hash_password, verify_password, create_token

auth_router = APIRouter()

# ✅ Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🧾 Pydantic Models
class RegisterInput(BaseModel):
    username: str
    email: str
    password: str

class LoginInput(BaseModel):
    username: str
    password: str

class ChangePasswordInput(BaseModel):
    username: str
    old_password: str
    new_password: str

# 🚀 Register a user
@auth_router.post("/register")
def register(payload: RegisterInput, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == payload.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=payload.username,
        email=payload.email,
        hashed_password=hash_password(payload.password)
    )
    db.add(user)
    db.commit()
    return {"msg": "Registration successful"}

# 🔐 Login a user
@auth_router.post("/login")
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == payload.username).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

# 🔧 Change password
@auth_router.post("/change-password")
def change_password(payload: ChangePasswordInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == payload.username).first()
    if not user or not verify_password(payload.old_password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect current password")

    user.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"msg": "Password changed successfully"}
