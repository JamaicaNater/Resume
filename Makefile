up-db:
	docker compose up mongo-db
up:
	docker compose up --build
clean:
	docker compose down
	docker volume rm resume_mongodb-data