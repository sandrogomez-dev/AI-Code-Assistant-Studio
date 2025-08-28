import pytest
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from app.main import app
from app.core.config import settings

@pytest.fixture
def test_client():
    return TestClient(app)

@pytest.fixture
async def mongodb_client():
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    yield client
    await client.drop_database(settings.DATABASE_NAME)
    client.close()

@pytest.fixture
def test_user():
    return {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword123",
    }

@pytest.fixture
def test_code():
    return {
        "prompt": "Create a simple hello world function",
        "language": "python",
    }
