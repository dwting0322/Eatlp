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

### Splash page

![splash page](https://user-images.githubusercontent.com/101853690/193935984-fabc5352-351a-43f5-8763-7478596e20f6.png)

### Create and Register a New User

<img width="1791" alt="Screen Shot 2022-09-24 at 5 20 17 PM" src="">

### Login Valid User or User Demo Login Page

<img width="1792" alt="Screen Shot 2022-09-24 at 5 20 06 PM" src="">

### Create a New Business

<img width="1792" alt="Screen Shot 2022-09-24 at 5 05 42 PM" src="">

### Edit a Business / Delete a Business

<img width="1790" alt="Screen Shot 2022-09-24 at 5 33 29 PM" src="">

### Leave and Remove Likes / Create New Review

<img width="474" alt="Screen Shot 2022-09-24 at 5 28 33 PM" src="">

### Edit a Review / Delete a Review 

<img width="771" alt="Screen Shot 2022-09-24 at 5 30 47 PM" src="">

