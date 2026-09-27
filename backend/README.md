# Steve Ongera — Portfolio Backend (Django REST Framework)

## Setup

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data      # loads Steve Ongera's profile, skills, projects, posts
python manage.py runserver
```

API runs at **http://127.0.0.1:8000/api/**. Admin at **/admin/**.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/profile/` | Header/hero info, socials, SEO meta |
| GET | `/api/skills/` | Skill categories + skills |
| GET | `/api/experience/` | Work experience |
| GET | `/api/education/` | Education history |
| GET | `/api/projects/?featured=true` | Projects (filter by `category`) |
| GET | `/api/projects/{slug}/` | Single project |
| GET | `/api/posts/?featured=true` | Blog posts |
| GET | `/api/posts/{slug}/` | Single post |
| POST | `/api/contact/` | Contact form submission |
| POST | `/api/newsletter/` | Newsletter signup |
| GET | `/sitemap.xml` | SEO sitemap |

All images are placeholder Unsplash URLs stored directly on each model — replace
the `image` / `avatar` / `cover_image` fields in the Django admin with real photos later.
