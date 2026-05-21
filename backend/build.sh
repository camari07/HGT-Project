#!/usr/bin/env bash
pip install -r requirements.txt
python manage.py collectstatic --no-input

# Force Django to create the tables directly, skipping migration tracking
python -c "import os, django; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings'); django.setup(); from django.core.management import call_command; call_command('migrate', run_syncdb=True)"