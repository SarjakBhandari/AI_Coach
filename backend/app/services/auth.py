from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET")
EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

def hash_password(p): return pwd_context.hash(p)
def verify_password(p, h): return pwd_context.verify(p, h)
def create_token(data):
    data.update({"exp": datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)})
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")
