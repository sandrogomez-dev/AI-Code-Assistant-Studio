import pytest
from httpx import AsyncClient
from app.main import app

pytestmark = pytest.mark.asyncio

async def test_generate_code(test_client, test_code):
    response = test_client.post("/api/v1/code/generate", json=test_code)
    assert response.status_code == 200
    data = response.json()
    assert "generated_code" in data
    assert "suggestions" in data
    assert isinstance(data["suggestions"], list)

async def test_analyze_code(test_client):
    code_to_analyze = {
        "prompt": "for i in range(1000000): print(i)",
        "language": "python",
    }
    response = test_client.post("/api/v1/code/analyze", json=code_to_analyze)
    assert response.status_code == 200
    data = response.json()
    assert "generated_code" in data
    assert "suggestions" in data
    assert isinstance(data["suggestions"], list)

async def test_generate_code_invalid_language(test_client):
    invalid_code = {
        "prompt": "Create a hello world function",
        "language": "invalid_language",
    }
    response = test_client.post("/api/v1/code/generate", json=invalid_code)
    assert response.status_code == 500

async def test_analyze_empty_code(test_client):
    empty_code = {
        "prompt": "",
        "language": "python",
    }
    response = test_client.post("/api/v1/code/analyze", json=empty_code)
    assert response.status_code == 500
