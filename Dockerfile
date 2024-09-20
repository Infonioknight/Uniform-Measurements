FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV GUNICORN_CMD="gunicorn -b :8080 app:app"
CMD ["sh", "-c", "$GUNICORN_CMD"]