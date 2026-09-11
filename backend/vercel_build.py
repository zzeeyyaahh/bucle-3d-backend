import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def run(command: str) -> None:
    print(f"$ {command}", flush=True)
    subprocess.run(command, shell=True, cwd=ROOT, check=True)


def main() -> None:
    py = f'"{sys.executable}"'

    run(" ".join([py, "manage.py collectstatic --noinput"]))
    run(" ".join([py, "manage.py migrate --noinput"]))

    username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
    email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
    password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
    if username and email and password:
        try:
            run(" ".join([py, "manage.py createsuperuser --noinput"]))
        except subprocess.CalledProcessError as exc:
            print(f"superuser already exists or could not be created: {exc}", flush=True)
    else:
        print("DJANGO_SUPERUSER_* not fully set — skipping superuser creation.", flush=True)


if __name__ == "__main__":
    main()