FROM python:3.10-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg libsm6 libxext6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV GUNICORN_CMD="gunicorn -b :8080 app:app"

CMD ["sh", "-c", "$GUNICORN_CMD"]
