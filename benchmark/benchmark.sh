chic gba-chimera.chiml
chic gb-chimera.chiml
chic g-chimera.chiml

echo "GBA NODE" 1>&2
time node gba.js
echo "GBA PYTHON3" 1>&2
time python3 gba.py
echo "GBA CHIMERA" 1>&2
time chie gba-chimera.chiml
echo "GBA CHIMERA-COMPILED" 1>&2
time node gba-chimera.js
echo ""

echo "GB NODE" 1>&2
time node gb.js
echo "GB PYTHON3" 1>&2
time python3 gb.py
echo "GB CHIMERA" 1>&2
time chie gb-chimera.chiml
echo "GB CHIMERA-COMPILED" 1>&2
time node gb-chimera.js
echo ""

echo "G NODE" 1>&2
time node g.js
echo "G PYTHON3" 1>&2
time python3 g.py
echo "G CHIMERA" 1>&2
time chie g-chimera.chiml
echo "G CHIMERA-COMPILED" 1>&2
time node g-chimera.js
