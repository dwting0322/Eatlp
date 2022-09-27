from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

from ..models.review import Review


review_routes = Blueprint('review', __name__)