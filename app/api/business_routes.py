from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

from ..models.business import Business


business_routes = Blueprint('business', __name__)