from os import path

import json
from flask import Flask, jsonify, request

app = Flask(__name__)
directory_path = path.dirname(path.realpath(__file__))
icon_sets_path = directory_path + '/icon-sets/icon-sets.json'
views_path = directory_path + '/views.json'


# Create cache for total number of unique views per icon set
views_counts = {}
if path.exists(views_path):
    with open(views_path, 'r') as views_file:
        views = json.load(views_file)
        for icon_set_id, ip_addresses in views.items():
            views_counts[icon_set_id] = len(ip_addresses)


@app.route('/iconsets', methods=['GET'])
def get_icon_sets():
    """Get list of icon sets with basic information and number of views"""

    # Match icon sets from icon-sets.json with their number of unique views
    with open(icon_sets_path, 'r') as icon_sets_file:
        icon_sets = json.load(icon_sets_file)
        for icon_set in icon_sets:
            icon_set['views'] = views_counts[icon_set['id']]

    # Send resulting JSON object to client
    return jsonify(icon_sets)


@app.route('/views', methods=['PATCH'])
def register_view():
    """Add IP address of client to icon set entry in views.json unless it already exists"""

    icon_set_id = request.form['icon_set_id']
    ip_address = request.remote_addr

    with open(views_path, 'w+') as views_file:
        # Parse views.json or create new dictionary
        try:
            views = json.load(views_file)
        except ValueError:
            views = {}

        # Add IP address to corresponding icon set
        if icon_set_id not in views:
            views[icon_set_id] = [ip_address]
        elif ip_address not in views[icon_set_id]:
            views[icon_set_id].append(ip_address)
            views_counts[icon_set_id] += 1

        # Write updated object to file
        views_file.seek(0)
        json.dump(views, views_file)
        views_file.truncate()
    return ''
