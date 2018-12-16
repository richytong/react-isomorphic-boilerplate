build-and-push:
	clean
	build
	docker-build
	push

clean:
	rm -rf ./build ./dist

build-source:
	./node_modules/\@babel/cli/bin/babel.js ./src --out-dir ./dist
	mkdir -p build
	NODE_ENV=production ./node_modules/webpack-cli/bin/cli.js \
		--progress \
		--mode production \
		--devtool source-map \
		--output ./build/app.bundle.js

build-image:
	VERSION=$(git describe --tags $(git rev-list --tags --max-count=1))
	docker build . \
	  --tag ${DOCKER_REGISTRY_URL}:${DOCKER_IMAGE_NAME}:${VERSION} \
	  --file './Dockerfile'	

push:
	VERSION=$(git describe --tags $(git rev-list --tags --max-count=1))
	eval "$(aws ecr get-login --no-include-email --region us-west-2)"
	docker push ${DOCKER_REGISTRY_URL}:${DOCKER_IMAGE_NAME}:${VERSION
