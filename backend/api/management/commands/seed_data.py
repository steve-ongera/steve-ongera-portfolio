from datetime import date, datetime
from django.core.management.base import BaseCommand
from api.models import (
    Profile, SkillCategory, Skill, Experience, Education,
    Project, BlogPost
)


class Command(BaseCommand):
    help = "Seed the database with Steve Ongera's resume/portfolio content."

    def handle(self, *args, **options):
        profile, _ = Profile.objects.update_or_create(
            id=1,
            defaults=dict(
                full_name="Steve Ongera",
                tagline="Backend Developer — Django REST Framework & React/Vite",
                bio="I'm a backend-focused full-stack developer based in Nairobi, Kenya, "
                    "building scalable Django REST Framework APIs paired with fast, modern "
                    "React/Vite frontends for healthcare, fintech, education, and hospitality "
                    "platforms across East Africa.",
                email="steve.ongera@example.com",
                phone="+254 700 000000",
                location="Nairobi, Kenya",
                avatar="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
                github_url="https://github.com/steveongera",
                linkedin_url="https://linkedin.com/in/steveongera",
                twitter_url="https://twitter.com/steveongera",
                instagram_url="https://instagram.com/steveongera",
                meta_description="Steve Ongera — Backend Developer specializing in Django REST "
                                  "Framework and React/Vite, building web apps for East African markets.",
                meta_keywords="Steve Ongera, Django developer Kenya, React Vite developer, "
                              "backend developer Nairobi, Django REST Framework, full stack developer Kenya",
            )
        )

        cat_data = [
            ("Backend", "server", [("Python", 95), ("Django", 95), ("Django REST Framework", 92), ("PostgreSQL", 85), ("Celery & Redis", 75)]),
            ("Frontend", "code", [("React", 90), ("Vite", 90), ("JavaScript (ES6+)", 88), ("Tailwind CSS", 85), ("Redux Toolkit", 78)]),
            ("Tools & DevOps", "terminal", [("Git & GitHub", 90), ("Docker", 75), ("Nginx", 70), ("Linux", 80), ("CI/CD", 68)]),
            ("Integrations", "layers", [("M-Pesa Daraja API", 88), ("REST API Design", 92), ("JWT Auth", 88), ("WebSockets", 72)]),
        ]
        for order, (cat_name, icon, skills) in enumerate(cat_data):
            cat, _ = SkillCategory.objects.update_or_create(name=cat_name, defaults={"icon": icon, "order": order})
            for s_order, (s_name, prof) in enumerate(skills):
                Skill.objects.update_or_create(
                    category=cat, name=s_name, defaults={"proficiency": prof, "order": s_order}
                )

        Experience.objects.all().delete()
        Experience.objects.bulk_create([
            Experience(
                role="Freelance Full-Stack Developer", company="Self-Employed",
                location="Nairobi, Kenya", start_date=date(2022, 1, 1), is_current=True,
                description="Design and build complete Django REST Framework backends and "
                             "React/Vite frontends for clients in healthcare (HMIS platforms), "
                             "fintech (SACCO & POS systems), aviation charter booking, and "
                             "school management SaaS across Kenya and East Africa.",
                order=0,
            ),
            Experience(
                role="Backend Developer", company="Independent Contract Projects",
                location="Remote", start_date=date(2020, 3, 1), end_date=date(2021, 12, 31),
                description="Built REST APIs with Django and Django REST Framework, integrated "
                             "M-Pesa payments, and shipped production systems for small and "
                             "medium businesses.",
                order=1,
            ),
        ])

        Education.objects.all().delete()
        Education.objects.bulk_create([
            Education(
                institution="Murang'a University of Technology", qualification="BSc. Computer Science",
                start_year=2016, end_year=2020,
                description="Focused on software engineering, databases, and web systems.",
                order=0,
            ),
        ])

        projects = [
            dict(title="MediCore HMIS", category="healthcare",
                 summary="Full-stack Hospital Management Information System for patient records, billing, and pharmacy.",
                 description="A comprehensive HMIS built with Django REST Framework and React, "
                              "covering patient registration, appointments, billing, pharmacy "
                              "inventory, and lab results — used by hospitals across Kenya.",
                 tech_stack="Django, DRF, React, Vite, PostgreSQL, Celery",
                 image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                 is_featured=True, date_completed=date(2026, 6, 1)),
            dict(title="Beba Ride-Hailing Platform", category="fullstack",
                 summary="Uber/Bolt-style ride-hailing platform with live tracking and M-Pesa payments.",
                 description="A ride-hailing platform with rider and driver apps, real-time "
                              "trip tracking, fare calculation, and M-Pesa Daraja API integration "
                              "for seamless in-app payments.",
                 tech_stack="Django, DRF, React, Vite, WebSockets, M-Pesa API",
                 image="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
                 is_featured=True, date_completed=date(2026, 9, 1)),
            dict(title="Kenyan School Management SaaS", category="api",
                 summary="Multi-tenant school management system covering CBC & 8-4-4, fees, and exams.",
                 description="A SaaS platform for Kenyan schools handling CBC and 8-4-4 "
                              "curricula, fee collection via M-Pesa, exam results, timetabling, "
                              "and parent communication.",
                 tech_stack="Django, DRF, React, Vite, PostgreSQL",
                 image="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80",
                 is_featured=True, date_completed=date(2026, 9, 21)),
            dict(title="Kilele Ridge SACCO System", category="fintech",
                 summary="SACCO member management platform with loans, savings, and statements.",
                 description="A SACCO management system handling member registration, savings, "
                              "loan applications and repayments, and automated statement "
                              "generation.",
                 tech_stack="Django, DRF, React, PostgreSQL",
                 image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
                 is_featured=False, date_completed=date(2026, 5, 10)),
            dict(title="NairobiJetHouse Charter Platform", category="fullstack",
                 summary="Private aviation and yacht charter booking platform.",
                 description="A booking platform for private jet and yacht charters, featuring "
                              "fleet listings, availability calendars, and inquiry management.",
                 tech_stack="Django, DRF, React, Vite",
                 image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
                 is_featured=False, date_completed=date(2026, 3, 15)),
            dict(title="MoneyMaker Aviator Game", category="react",
                 summary="Crash-betting game frontend built for the Kenyan market, in KES.",
                 description="A fast-paced crash-betting game front end with live multiplier "
                              "animation, bet history, and KES currency support, connected to a "
                              "Django backend for game state and wallet management.",
                 tech_stack="React, Vite, Django, DRF, WebSockets",
                 image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                 is_featured=False, date_completed=date(2026, 9, 2)),
        ]
        for p in projects:
            Project.objects.update_or_create(title=p['title'], defaults=p)

        posts = [
            dict(title="Why Django REST Framework Is My Go-To for Backend APIs",
                 excerpt="A look at why DRF's serializers, viewsets, and permissions make it ideal for fast, secure API development.",
                 content="Full article content goes here...",
                 cover_image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
                 tags="Django, DRF, Backend", is_featured=True,
                 published_at=datetime(2026, 9, 20)),
            dict(title="Integrating M-Pesa Daraja API With Django",
                 excerpt="A practical guide to handling STK Push, callbacks, and transaction verification in Django.",
                 content="Full article content goes here...",
                 cover_image="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80",
                 tags="Django, M-Pesa, Fintech", is_featured=True,
                 published_at=datetime(2026, 9, 10)),
            dict(title="Why I Pair Django With React + Vite",
                 excerpt="Vite's dev server speed and Django's mature ecosystem make for a productive full-stack combo.",
                 content="Full article content goes here...",
                 cover_image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
                 tags="React, Vite, Django", is_featured=False,
                 published_at=datetime(2026, 8, 28)),
            dict(title="Structuring a Multi-Tenant SaaS in Django",
                 excerpt="Lessons from building a school management SaaS serving many Kenyan schools from one codebase.",
                 content="Full article content goes here...",
                 cover_image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                 tags="Django, SaaS, Architecture", is_featured=False,
                 published_at=datetime(2026, 8, 5)),
        ]
        for p in posts:
            BlogPost.objects.update_or_create(title=p['title'], defaults=p)

        self.stdout.write(self.style.SUCCESS("Seed data created for Steve Ongera's portfolio."))
