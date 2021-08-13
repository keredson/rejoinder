build:
	mkdir -p bin
	zip -j bin/rejoinder.zip chrome_ext/*

clean:
	rm -R bin
