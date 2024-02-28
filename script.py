import json
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

# Function to generate random video data
def generate_video_data(creator_id):
    video_id = random.randint(10000000000000, 99999999999999)
    thumbnail = f"http://thumbnail/{video_id}.png"
    name = fake.text(max_nb_chars=50)
    duration = random.randint(1, 600)
    creation_date = fake.date_time_between(start_date="-5y", end_date="now")
    views = random.randint(0, 1000000)
    url = f"http://video/{video_id}"
    tags = fake.words(nb=3)
    comments = []
    for _ in range(random.randint(0, 10)):
        comment = {
            "comment_id": random.randint(100000000, 999999999),
            "user": fake.user_name(),
            "date": (creation_date - timedelta(days=random.randint(0, 365))).isoformat(),
            "comment_text": fake.text(max_nb_chars=100)
        }
        comments.append(comment)
    return {
        "video_id": video_id,
        "thumbnail": thumbnail,
        "name": name,
        "duration": duration,
        "creation_date": creation_date.isoformat(),
        "views": views,
        "url": url,
        "tags": tags,
        "comments": comments,
        "creator_id": creator_id
    }

# Function to generate random user data
def generate_user_data():
    user_id = random.randint(1000000000000, 9999999999999)
    name = fake.name()
    username = fake.user_name()
    password = fake.password(length=6)
    profile_picture = f"http://profile/{user_id}.jpg"
    age = random.randint(18, 80)
    favorite_genres = fake.words(nb=3)
    is_creator = random.choice([True, False])
    if is_creator:
        videos = [generate_video_data(user_id)["video_id"] for _ in range(random.randint(0, 20))]
        rated = fake.word(ext_word_list=["Child", "Teen", "Adult"])
        biography = fake.text(max_nb_chars=200)
        followers = random.randint(0, 10000)
    else:
        videos = []
        rated = ""
        biography = ""
        followers = 0
    return {
        "user_id": user_id,
        "name": name,
        "username": username,
        "password": password,
        "profile_picture": profile_picture,
        "age": age,
        "favorite_genres": favorite_genres,
        "is_creator": is_creator,
        "videos": videos,
        "rated": rated,
        "biography": biography,
        "followers": followers
    }

# Function to generate playlist data
def generate_playlist_data(users, videos):
    playlists = []
    for _ in range(random.randint(0, 5)):  # Limitar el número de listas de reproducción por usuario entre 0 y 5
        playlist_videos = random.sample([video["video_id"] for video in videos], random.randint(0, 10))  # Limitar el número de videos por lista de reproducción entre 0 y 10
        playlist_name = fake.word()
        playlists.append({
            "name": playlist_name,
            "videos": playlist_videos
        })
    user_id = random.choice([user["user_id"] for user in users])
    return {
        "user_id": user_id,
        "playlists": playlists
    }

# Generate user data
users = [generate_user_data() for _ in range(1000)]

# Generate video data with creator_id
videos = []
for user in users:
    if user["is_creator"]:
        for _ in range(random.randint(0, 20)):
            video = generate_video_data(user["user_id"])
            videos.append(video)

# Generate playlist data with video ids
playlist_data = [generate_playlist_data(users, videos) for _ in range(1000)]

# Write user data to JSON file
with open('usuarios.json', 'w') as file:
    json.dump(users, file, indent=4)

# Write video data to JSON file
with open('videos.json', 'w') as file:
    json.dump(videos, file, indent=4)

# Write playlist data to JSON file
with open('playlist.json', 'w') as file:
    json.dump(playlist_data, file, indent=4)

print("Se creó la data :)")
