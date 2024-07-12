# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

# prevents creation of .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# avoids stdout and stderr buffering
ENV PYTHONUNBUFFERED=1

# sets the working directory
WORKDIR /app

# copy and install python dependencies
COPY /src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy project files
COPY ./src/* .

# add workding dir to python path
ENV PYTHONPATH="${PYTHONPATH}:/app"

# use bash as interactive entrypoint
ENTRYPOINT [ "/bin/bash" ]