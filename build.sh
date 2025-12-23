rm -rf docs
mkdir docs

ng build leveler
cp -r dist/leveler/browser docs/leveler

ng build compass
cp -r dist/compass/browser docs/compass

ng build barcoder
cp -r dist/barcoder/browser docs/barcoder
