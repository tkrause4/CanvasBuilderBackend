FROM mongo:latest
WORKDIR /jsondata

COPY canvases.json /canvases.json
COPY templates.json /templates.json
COPY seed.sh .

CMD ["sh", "-c", "./seed.sh"]