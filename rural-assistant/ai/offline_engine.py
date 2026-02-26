# import json
# import os

# DATA_FILE = os.path.join(os.path.dirname(_file_), "..", "data.json")

# def load_data():
#     try:
#         with open(DATA_FILE, "r", encoding="utf-8") as f:
#             return json.load(f)
#     except Exception as e:
#         print("JSON Load Error:", e)
#         return {}

# LOCAL_DATA = load_data()

# def format_response(data):
#     """
#     Convert structured JSON into clean, readable output
#     """

#     output = []

#     for key, value in data.items():
#         # make heading readable
#         title = key.replace('_', ' ').title()

#         # Section heading
#         output.append(f"{title}:")

#         # If value is a list → bullet points
#         if isinstance(value, list):
#             for item in value:
#                 output.append(f"  • {item}")
#         else:
#             output.append(f"  {value}")

#         # add space between sections
#         output.append("")

#     return "\n".join(output).strip()

# def get_offline_answer(query):
#     query = query.lower()

#     for key, value in LOCAL_DATA.items():
#         if key in query:
#             return format_response(value)

#     return None












import json
import os

# Correct path to data.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "..", "data.json")


def load_data():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ data.json file not found:", DATA_FILE)
        return {}
    except json.JSONDecodeError:
        print("❌ JSON format is invalid")
        return {}
    except Exception as e:
        print("❌ JSON Load Error:", e)
        return {}


LOCAL_DATA = load_data()


def format_response(data):
    """
    Convert structured JSON into clean, readable output
    """
    output = []

    for key, value in data.items():
        title = key.replace("_", " ").title()
        output.append(f"{title}:")

        if isinstance(value, list):
            for item in value:
                output.append(f"  • {item}")
        else:
            output.append(f"  {value}")

        output.append("")

    return "\n".join(output).strip()


def get_offline_answer(query):
    query = query.lower()

    for key, value in LOCAL_DATA.items():
        if key.lower() in query:
            return format_response(value)

    return None