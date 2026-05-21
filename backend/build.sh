#!/usr/bin/env bash
pip install -r requirements.txt
python manage.py collectstatic --no-input

# 1. Clear out the migration history tracker specifically for your app
python manage.py migrate posts zero --fake

# 2. Re-apply everything with a hard sync to build the raw tables
python manage.py migrate --run-syncdb