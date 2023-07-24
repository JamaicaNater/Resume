up-db:
	docker compose up mongodb
up:
	docker compose up --build
clean:
	docker compose down
	docker volume rm resume_mongodb-data