import json
from os import environ, path

from anonymizeip import anonymize_ip
from flask import Flask, jsonify, redirect, request, send_from_directory

app = Flask(__name__)
current_dir = path.dirname(path.realpath(__file__))
path_list = current_dir + "/icon-sets.json"
path_views = current_dir + "/views.json"
path_static = current_dir + "/public"


def load_list_file():
    """Load list of icon sets to memory"""

    with open(path_list, "r") as list_file:
        return json.load(list_file)


def load_views_file():
    """Load or create views file and load IP addresses into memory. Create cache for total number of
    unique views per icon set (view_counts)"""

    if not path.exists(path_views):
        with open(path_views, "w+") as view_file:
            addresses = {}
            counts = {}
            json.dump({}, view_file)
    else:
        with open(path_views, "r") as view_file:
            addresses = json.load(view_file)
            counts = {}
            for icon_set_id, ip_addresses in addresses.items():
                counts[icon_set_id] = len(ip_addresses)

    return addresses, counts


# Serve static files if in development mode (handled by nginx in production)
if "FLASK_ENV" in environ and environ["FLASK_ENV"] == "development":

    @app.route("/", methods=["GET"])
    def get_html():
        return send_from_directory(path_static, "index.html")

    @app.route("/bundle.js", methods=["GET"])
    def get_js():
        return send_from_directory(path_static, "bundle.js")

    @app.route("/sample-icons/<path:icon_path>", methods=["GET"])
    def get_sample_icon(icon_path):
        return send_from_directory(path_static + "/sample-icons/", icon_path)


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
    """Add IP address of client to icon set entry in views.json unless it already exists"""

    icon_set_id = request.args.get("iconSetId")
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

    with open(path_views, "w+") as view_file:
        # Write updated object to file
        json.dump(view_addresses, view_file)

    return ""


@app.route("/<path:invalid_path>")
def catch_all(invalid_path):
    """Catch-all route: Redirect to root path"""

    return redirect("/", code=302)


icon_sets = load_list_file()
view_addresses, view_counts = load_views_file()


if __name__ == "__main__":
    if "FLASK_ENV" in environ and environ["FLASK_ENV"] == "development":
        app.run(host="0.0.0.0", port=3000)
    else:
        app.run()
