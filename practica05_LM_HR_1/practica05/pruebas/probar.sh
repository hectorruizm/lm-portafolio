#!/bin/bash
# Lanza las pruebas de rechazo R1-R7 contra la DTD y el XSD
cd "$(dirname "$0")"
for n in 1 2 3 4 5 6 7; do
  echo "===== R$n ====="
  echo "--- DTD:"; xmllint --noout --valid R$n-dtd.xml 2>&1 && echo "(sin errores: la DTD NO lo detecta)"
  echo "--- XSD:"; xmllint --noout --schema ../catalogo.xsd R$n-xsd.xml 2>&1
done
