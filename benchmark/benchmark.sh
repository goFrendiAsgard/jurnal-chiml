echo "GBA NODE" 1>&2
time node gba.js
echo "GBA PYTHON3" 1>&2
time python3 gba.py
echo "GBA CHIMERA" 1>&2
time chimera gba.chiml
echo ""

echo "GB NODE" 1>&2
time node gb.js
echo "GB PYTHON3" 1>&2
time python3 gb.py
echo "GB CHIMERA" 1>&2
time chimera gb.chiml
echo ""

echo "G NODE" 1>&2
time node g.js
echo "G PYTHON3" 1>&2
time python3 g.py
echo "G CHIMERA" 1>&2
time chimera g.chiml
