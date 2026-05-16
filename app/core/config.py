import os

from dotenv import load_dotenv

load_dotenv()

BACKEND_HOST = os.getenv("BACKEND_HOST", "127.0.0.1")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", "8000"))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://127.0.0.1:5174")

SUMMARY_MODEL_NAME = os.getenv("SUMMARY_MODEL_NAME", "t5-small")
GEC_MODEL_NAME = os.getenv("GEC_MODEL_NAME", "vennify/t5-base-grammar-correction")
COMPLETION_MODEL_NAME = os.getenv("COMPLETION_MODEL_NAME", "distilgpt2")

LANGUAGE_TOOL_MODE = os.getenv("LANGUAGE_TOOL_MODE", "remote").lower()
