from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
import dotenv
import os
import openai
from app.forms.open_ai_form import AIForm

open_ai_routes = Blueprint('ai', __name__)
dotenv.load_dotenv()

openai.api_key = os.environ.get('OPENAI_API_KEY')




@open_ai_routes.route('', methods=['POST'])
def call_ai():
    form = AIForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        response = openai.Completion.create(
            model="text-davinci-002",
            prompt=form.data['prompt'],
            temperature=0.7,
            max_tokens=500,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        if response.choices[0].text:
            content = response.choices[0].text.split('\n')
            content_list = content[1:]
            content_string = ''.join(content_list)
            return jsonify(content_string) 