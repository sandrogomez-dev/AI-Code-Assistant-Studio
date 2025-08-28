import pytest
from httpx import AsyncClient
from app.main import app

pytestmark = pytest.mark.asyncio

async def test_register_user(test_client, test_user):
    response = test_client.post("/api/v1/auth/register", json=test_user)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == test_user["email"]
    assert data["username"] == test_user["username"]
    assert "id" in data

async def test_login_user(test_client, test_user):
    # First register the user
    test_client.post("/api/v1/auth/register", json=test_user)
    
    # Then try to login
    response = test_client.post(
        "/api/v1/auth/login",
        data={
            "username": test_user["email"],
            "password": test_user["password"],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

async def test_login_wrong_password(test_client, test_user):
    # First register the user
    test_client.post("/api/v1/auth/register", json=test_user)
    
    # Then try to login with wrong password
    response = test_client.post(
        "/api/v1/auth/login",
        data={
            "username": test_user["email"],
            "password": "wrongpassword",
        },
    )
    assert response.status_code == 401

async def test_register_duplicate_email(test_client, test_user):
    # Register user first time
    test_client.post("/api/v1/auth/register", json=test_user)
    
    # Try to register again with same email
    response = test_client.post("/api/v1/auth/register", json=test_user)
    assert response.status_code == 400
