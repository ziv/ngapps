ng build leveler --base-href=/ngapps/leveler/
rm -rf docs/leveler
cp -r dist/leveler/browser docs/leveler

ng build compass --base-href=/ngapps/compass/
rm -rf docs/compass
cp -r dist/compass/browser docs/compass

ng build barcoder --base-href=/ngapps/barcoder/
rm -rf docs/barcoder
cp -r dist/barcoder/browser docs/barcoder
