"""
Draw a product's chemical structure in the site palette.

    python scripts/draw-structure.py <product-slug> <CAS-number> <category-slug>
    python scripts/draw-structure.py benzyl-acetate 140-11-4 aromatic-chemicals

Looks the CAS number up on PubChem, prints the formula / molecular weight / CID
to check against lib/products-data.ts, and writes
public/images/structures/<product-slug>.svg. Then add the entry it prints to
lib/product-images.ts.

Requires RDKit (`pip install rdkit`). On Windows, install it into a virtual
environment with a short path (e.g. C:\\rdk) — RDKit's DLLs fail to load from
very long paths.
"""

import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

from rdkit import Chem
from rdkit.Chem import rdDepictor
from rdkit.Chem.Draw import rdMolDraw2D

# Bond colour per category — matches `ink` in components/product-visual.tsx.
INK = {
    "aromatic-chemicals": "#12432F",
    "essential-oils": "#1B5A3F",
    "pharma-intermediates": "#14403E",
    "phase-transfer-catalysts": "#27325A",
    "metals": "#26363B",
    "ayurvedic-products": "#3F4A22",
}
# Muted heteroatom colours that sit well on the pale category backgrounds.
HETERO = {8: "#B23A2A", 7: "#2D5B9A", 16: "#9A6B12", 17: "#2E7A4C", 15: "#B0591F", 35: "#8A3324"}


def rgb(hex_colour):
    h = hex_colour.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def pubchem(cas):
    url = (
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/"
        + urllib.parse.quote(cas)
        + "/property/MolecularFormula,MolecularWeight,SMILES,Title/JSON"
    )
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "SheetalAromaticsSite/1.0"})) as r:
        return json.load(r)["PropertyTable"]["Properties"][0]


def draw(smiles, ink):
    rdDepictor.SetPreferCoordGen(True)
    mol = Chem.MolFromSmiles(smiles)
    rdDepictor.Compute2DCoords(mol)

    d = rdMolDraw2D.MolDraw2DSVG(800, 600)
    o = d.drawOptions()
    o.clearBackground = False
    o.bondLineWidth = 3.6
    o.scaleBondWidth = False
    o.fixedBondLength = 84
    o.padding = 0.12
    o.multipleBondOffset = 0.17
    o.additionalAtomLabelPadding = 0.12
    o.minFontSize = 30
    o.maxFontSize = 40
    o.addStereoAnnotation = False
    palette = {z: rgb(c) for z, c in HETERO.items()}
    palette.update({6: rgb(ink), 1: rgb(ink), -1: rgb(ink)})
    o.setAtomPalette(palette)
    d.DrawMolecule(mol)
    d.FinishDrawing()

    svg = d.GetDrawingText()
    svg = re.sub(r"<\?xml[^>]*>\s*", "", svg)
    svg = re.sub(r"<!--.*?-->", "", svg, flags=re.S)
    svg = re.sub(r"<rect[^>]*/>\s*", "", svg)
    svg = re.sub(r" class='[^']*'", "", svg)
    svg = re.sub(r" xmlns:(rdkit|xlink)='[^']*'| xml:space='preserve'", "", svg)
    svg = svg.replace("stroke-linecap:butt;stroke-linejoin:miter", "stroke-linecap:round;stroke-linejoin:round")
    return re.sub(r"\s+", " ", svg).replace("> <", "><").strip()


def main():
    if len(sys.argv) != 4 or sys.argv[3] not in INK:
        sys.exit(__doc__)
    slug, cas, category = sys.argv[1:]
    props = pubchem(cas)
    print(f"{props['Title']}: {props['MolecularFormula']}, {props['MolecularWeight']} g/mol, PubChem CID {props['CID']}")

    out = Path(__file__).resolve().parent.parent / "public" / "images" / "structures" / f"{slug}.svg"
    out.write_text(draw(props["SMILES"], INK[category]), encoding="utf-8")
    print(f"Wrote {out}")
    print(f'Add to lib/product-images.ts:\n  "{slug}": {{ kind: "structure", src: "/images/structures/{slug}.svg", pubchemCid: {props["CID"]} }},')


if __name__ == "__main__":
    main()
