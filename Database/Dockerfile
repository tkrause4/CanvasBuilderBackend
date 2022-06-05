FROM mongo:latest

COPY canvases.json /canvases.json
CMD mongoimport --host mongo_db --db CanvasBuilderDB --collection canvases --type json --file /canvases.json --jsonArray