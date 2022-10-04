# Eatlp

## Welcome to Eatlp, our project clone of Yelp.

## About Our Web Application!

Eatlp is a full-stack web application inspired by Yelp, with a little twist!
Our application provides users the ability to post business of their meals, leave likes and add reviews to said business!

With Eatlp, upload images of your business, and show everyone what you like to do for your business. 

This project mimics Yelp's ability to share and post pictures on an online platform. 

[Eatlp Live Site - update later]()

## Project Wiki Links:

[API Routes](https://github.com/dwting0322/Eatlp/wiki/API-ROUTES)

[DB Schema](https://github.com/dwting0322/Eatlp/wiki/DB-SCHEMA)

[Features List](https://github.com/dwting0322/Eatlp/wiki/FEATURES)

[User Stories](https://github.com/dwting0322/Eatlp/wiki/USER-STORIES)

[Wire Frames](https://github.com/dwting0322/Eatlp/wiki/WIRE-FRAMES)

## Tech Stack:

### Languages, Frameworks, Platforms, and Libraries:

Frontend:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

Backend:

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-red?style=for-the-badge)

Hosted On:

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## How to Run Locally:

1. Clone the github repository to a file location of your choice, recommend using "Download ZIP" in the Code dropdown menu for this repository.

2. Run **pipenv install -r requirements.txt** in the app directory to install the appropriate dependencies:

```
pipenv install -r requirements.txt
```

While those dependencies are installing, you may also open up a seperate integrated terminal, and ** npm install ** the appropriate dependencies to the react-app folder.

```
npm install
```

3. Create a .env file in the root of the **app** folder and copy the contents below. Replace the **insert secret key here** with your **own** very secret key!

```
SECRET_KEY= <<INSERT_SECRET_KEY_HERE>>
DATABASE_URL=sqlite:///dev.db
```

4. While still in the **app** folder, get into your pipenv, migrate your database, seed your database, and run your Flask app:

```
pipenv shell
pipenv run flask db init
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask run
```

6. Run **npm start** in the Frontend folder:

```
npm start
```

7. You should now be able to see the web application in your browser when you navigate to localhost!

## Features Directory:

### Home / Splash Page

![splash page](https://user-images.githubusercontent.com/101853690/193935984-fabc5352-351a-43f5-8763-7478596e20f6.png)


### Create and Register a New User

![sign up page](https://user-images.githubusercontent.com/101853690/193937340-f54fc1e5-08f2-459c-9fc2-36bb9c776f8d.png)


### Login Valid User or User Demo Login Page

![login page](https://user-images.githubusercontent.com/101853690/193937352-ee0fa6fe-0566-4594-a556-8aeb522b3cb0.png)


### Get All Business and All Recent Review Page

![All restaurant page](https://user-images.githubusercontent.com/101853690/193938165-77e58ee8-bbe4-4788-94b1-0f99256dbbab.png)

![recent review](https://user-images.githubusercontent.com/101853690/193938177-3e44f978-7ca5-488b-b1f1-4367b816244d.png)


### Get One Business Detail Page

![business detail page](https://user-images.githubusercontent.com/101853690/193938319-cc79bed7-7a7d-4c35-9dc7-11c5b944d444.png)


### Create a New Business

![create business page](https://user-images.githubusercontent.com/101853690/193937419-516eb788-178d-4baa-b41d-3f0265956e3b.png)


### Edit a Business / Delete a Business

![edit or delete business](https://user-images.githubusercontent.com/101853690/193937635-90a14954-44ec-41d6-88c0-c354a76dae7b.png)


### Create New Review Modal / Edit a Review Modal

![create review modal](https://user-images.githubusercontent.com/101853690/193937726-17e1743d-6c00-4b81-aff4-ee392963f51e.png)


![edit review modal](https://user-images.githubusercontent.com/101853690/193937953-fcdf3483-12e2-45ad-acb2-0efd89aaa99f.png)


### Edit a Review / Delete a Review 

![edit or delete page](https://user-images.githubusercontent.com/101853690/193938014-00abec4a-01da-4942-aabf-8a81b4fe65a2.png)

