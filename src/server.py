import json
from os import environ, path

from anonymizeip import anonymize_ip
from flask import Flask, jsonify, redirect, request, send_from_directory

app = Flask(__name__)
path_dir = path.dirname(path.realpath(__file__))
path_icon_set_json = path_dir + "/../icon-sets.json"
path_view_json = path_dir + "/../views.json"
path_static = path_dir + "/../public"


# Load list of icon sets to memory
with open(path_icon_set_json, "r") as icon_sets_file:
    icon_sets = json.load(icon_sets_file)

# Load view IP addresses to memory (view_addresses) and create cache for total
# number of unique views per icon set (view_counts)
view_addresses = {}
view_counts = {}
if path.exists(path_view_json):
    with open(path_view_json, "r") as view_file:
        view_addresses = json.load(view_file)
        for icon_set_id, ip_addresses in view_addresses.items():
            view_counts[icon_set_id] = len(ip_addresses)


# Serve static files if in development mode (handled by nginx in production)
if "FLASK_ENV" in environ and environ["FLASK_ENV"] == "development":

    @app.route("/", methods=["GET"])
    def get_html():
        return send_from_directory(path_static, "index.html")

    @app.route("/bundle.js", methods=["GET"])
    def get_js():
        return send_from_directory(path_static, "bundle.js")


@app.route("/iconsets", methods=["GET"])
def get_icon_sets():
    """Get list of icon sets with basic information and number of views"""

    # Match icon sets with their number of unique views
    response = icon_sets
    for icon_set in response:
        if icon_set["id"] in view_counts:
            icon_set["views"] = view_counts[icon_set["id"]]
        else:
            icon_set["views"] = 0

    return jsonify(response)


@app.route("/views", methods=["PATCH"])
def register_view():
    """Add IP address of client to icon set entry in views.json unless it
    already exists"""

    icon_set_id = request.form["icon_set_id"]
    ip_address = request.remote_addr
    ip_address_anonymized = anonymize_ip(ip_address)

    # Add IP address to corresponding icon set
    if icon_set_id not in view_addresses:
        view_addresses[icon_set_id] = [ip_address_anonymized]
        view_counts[icon_set_id] = 1
    elif ip_address_anonymized not in view_addresses[icon_set_id]:
        view_addresses[icon_set_id].append(ip_address_anonymized)
        view_counts[icon_set_id] += 1
    else:
        return ""

    with open(path_view_json, "w+") as view_file:
        # Write updated object to file
        json.dump(view_addresses, view_file)

    return ""


@app.route("/<path:path>")
def catch_all(path):
    """Catch-all route: Redirect to root path"""

    return redirect("/", code=302)


if __name__ == "__main__":
    app.run()
