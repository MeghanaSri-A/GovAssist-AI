"""
make_admin.py
Flips is_admin = True for a given user in the GovAssist AI SQLite database.

USAGE:
  1. Place this file inside backend/database/  (same folder as govassist.db)
  2. Run:  python make_admin.py your_email@example.com
"""

import sqlite3
import sys
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "database", "govassist.db"))


def main():
    if len(sys.argv) < 2:
        print("Usage: python make_admin.py <your_email>")
        sys.exit(1)

    email = sys.argv[1]

    if not os.path.exists(DB_FILE):
        print(f"Could not find {DB_FILE}.")
        print("Make sure the backend database has been initialized.")
        sys.exit(1)

    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()

    # Show the users table columns first, in case your column names differ
    cur.execute("PRAGMA table_info(users)")
    columns = [row[1] for row in cur.fetchall()]
    print("Columns in 'users' table:", columns)

    if "is_admin" not in columns:
        print("\nNo 'is_admin' column found on the users table.")
        print("Your User model may use a different field name (e.g. 'role' or 'is_staff').")
        print("Check backend/app/models/user.py and adjust this script's SQL accordingly.")
        conn.close()
        sys.exit(1)

    # Check the user exists
    cur.execute("SELECT id, email, is_admin FROM users WHERE email = ?", (email,))
    user = cur.fetchone()

    if not user:
        print(f"No user found with email: {email}")
        print("Double check you registered with this exact email.")
        conn.close()
        sys.exit(1)

    print(f"Found user: id={user[0]}, email={user[1]}, is_admin={user[2]}")

    # Update to admin
    cur.execute("UPDATE users SET is_admin = 1 WHERE email = ?", (email,))
    conn.commit()

    # Confirm
    cur.execute("SELECT id, email, is_admin FROM users WHERE email = ?", (email,))
    updated = cur.fetchone()
    print(f"Updated: id={updated[0]}, email={updated[1]}, is_admin={updated[2]}")

    conn.close()
    print("\nDone. Log out and log back in on the frontend so a fresh token is issued, then try the upload again.")


if __name__ == "__main__":
    main()