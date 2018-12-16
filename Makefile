build-and-push:
	clean
	build
	docker-build
	push

clean:
	rm -rf ./build/* ./dist

build:
	npm run build-source
	npm run build-bundle

push:
	docker-login
	docker push 520576626369.dkr.ecr.us-west-2.amazonaws.com/viewcharm-website:0.1.9

docker-build:
	docker build . \
	  --tag 520576626369.dkr.ecr.us-west-2.amazonaws.com/viewcharm-website:0.1.9 \
	  --file './Dockerfile'	

docker-login:
	eval "$(aws ecr get-login --no-include-email --region us-west-2)"
