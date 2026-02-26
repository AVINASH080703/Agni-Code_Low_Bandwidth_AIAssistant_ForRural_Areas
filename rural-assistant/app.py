from flask import Flask, render_template, jsonify, request
import sqlite3
from ai.offline_engine import get_offline_answer
from ai.ai_wrapper import ask_ai

app = Flask(__name__)

DB_PATH = "database.db"


# ---------------- DATABASE CONNECTION ----------------
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ---------------- HOME ----------------
@app.route('/')
def index():
    return render_template('index.html')


# ---------------- SEARCH API ----------------
@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '').strip().lower()

    print("User Query:", query)   # DEBUG

    if not query:
        return jsonify({
            "reply": "कृपया प्रश्न लिखें",
            "mode": "none"
        })

    # ---------- DATABASE SEARCH ----------
    try:
        conn = get_db_connection()

        search_pattern = f"%{query}%"

        result = conn.execute("""
            SELECT title, content, category
            FROM information
            WHERE LOWER(title) LIKE LOWER(?)
            OR LOWER(keywords) LIKE LOWER(?)
        """, (search_pattern, search_pattern)).fetchone()

        conn.close()

        if result:
            print("✅ Found in Database")
            return jsonify({
                "reply": f"{result['title']}:\n{result['content']}",
                "mode": "offline-db"
            })

    except Exception as e:
        print("Database Error:", e)


    # ---------- OFFLINE RULE ENGINE ----------
    rule_answer = get_offline_answer(query)

    if rule_answer:
        print("✅ Found in Offline Rules")
        return jsonify({
            "reply": rule_answer,
            "mode": "offline-rule"
        })


    # ---------- AI FALLBACK ----------
    try:
        ai_answer = ask_ai(query)

        if ai_answer:
            print("🌐 AI Response Used")
            return jsonify({
                "reply": ai_answer,
                "mode": "online-ai"
            })

    except Exception as e:
        print("AI Error:", e)


    # ---------- NOT FOUND ----------
    print("❌ No Answer Found")
    return jsonify({
        "reply": "माफ कीजिए, उत्तर उपलब्ध नहीं है।",
        "mode": "not-found"
    })


# ---------------- RUN SERVER ----------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)