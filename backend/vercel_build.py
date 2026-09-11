import os
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def run(command: str) -> None:
    print(f"$ {command}", flush=True)
    cp = subprocess.run(command, shell=True, cwd=ROOT)
    if cp.returncode != 0:
        print(f"!!! COMMAND FAILED (exit {cp.returncode}): {command}", flush=True)
        raise SystemExit(cp.returncode)


def run_migrate() -> None:
    py = f'"{sys.executable}"'
    command = " ".join([py, "manage.py migrate --noinput"])
    for attempt in range(1, 5):
        print(f"$ {command}  (attempt {attempt}/4)", flush=True)
        cp = subprocess.run(command, shell=True, cwd=ROOT)
        if cp.returncode == 0:
            return
        print(f"!!! migrate attempt {attempt} failed with exit {cp.returncode} — retrying.", flush=True)
        time.sleep(10)
    print("!!! migrate failed after 4 attempts.", flush=True)
    raise SystemExit(cp.returncode)


def main() -> None:
    py = f'"{sys.executable}"'
    print(f"DATABASE_URL is set: {bool(os.environ.get('DATABASE_URL'))}", flush=True)

    run(" ".join([py, "manage.py collectstatic --noinput"]))
    run_migrate()

    username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
    email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
    password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
    if username and email and password:
        try:
            run(" ".join([py, "manage.py createsuperuser --noinput"]))
        except SystemExit:
            print("superuser already exists or could not be created — continuing.", flush=True)
    else:
        print("DJANGO_SUPERUSER_* not fully set — skipping superuser creation.", flush=True)


if __name__ == "__main__":
    main()