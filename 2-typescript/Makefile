.PHONY: all clean

all: essential-typescript.pdf

OPTS=--toc -s -N -V date=`date +'%Y-%m-%d'` -V linkcolor=blue -V urlcolor=blue
PDFOPTS=--pdf-engine=xelatex -V documentclass=scrartcl -V papersize=a4 -V lang=en
FONTOPTS=-V mainfont="Crimson Pro" -V sansfont="Lato" -V monofont="Fantasque Sans Mono" -V fontsize=11pt

essential-typescript.pdf: *.md
	pandoc -t pdf $(OPTS) $(PDFOPTS) $(FONTOPTS) $^ -o $@

clean:
	rm -f *.pdf
