from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.core.security import verify_password, get_password_hash
from app.schemas.auth import UserCreate, User
from bson import ObjectId

class AuthService:
    client: AsyncIOMotorClient = None

    @classmethod
    async def get_client(cls):
        if not cls.client:
            cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
        return cls.client

    @classmethod
    async def get_user_by_email(cls, email: str):
        client = await cls.get_client()
        user = await client[settings.DATABASE_NAME]["users"].find_one({"email": email})
        if user:
            return User(**user)
        return None

    @classmethod
    async def create_user(cls, user: UserCreate):
        client = await cls.get_client()
        hashed_password = get_password_hash(user.password)
        db_user = {
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "hashed_password": hashed_password,
            "is_active": True
        }
        result = await client[settings.DATABASE_NAME]["users"].insert_one(db_user)
        db_user["id"] = str(result.inserted_id)
        return User(**db_user)

    @classmethod
    async def authenticate_user(cls, username: str, password: str):
        client = await cls.get_client()
        user = await client[settings.DATABASE_NAME]["users"].find_one({"username": username})
        if not user:
            return False
        if not verify_password(password, user["hashed_password"]):
            return False
        user["id"] = str(user["_id"])
        return User(**user)
