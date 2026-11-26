# Práctica 05 · Borrador de respuestas para la memoria

## E1 · Tabla F1–F9 (errores de forma)

| N.º | Línea | Mensaje del analizador | Regla de XML incumplida | Corrección |
|---|---|---|---|---|
| F1 | 3 | AttValue: " or ' expected | Los valores de los atributos van entre comillas | `actualizado="2026-10-01"` |
| F2 | 8 | xmlParseEntityRef: no name | El carácter & no puede ir suelto en el texto | `&amp;` |
| F3 | 11 | Opening and ending tag mismatch: nombre line 11 and Nombre | Se distinguen mayúsculas y minúsculas | `</nombre>` |
| F4 | 14 | Opening and ending tag mismatch: b line 14 and descripcion | Los elementos no se pueden solapar | `<b>100 mm</b></descripcion>` |
| F5 | 20 | StartTag: invalid element name | El carácter < no puede ir suelto en el texto | `&lt;` o CDATA |
| F6 | 21 | Opening and ending tag mismatch: stock line 19 and producto | Toda etiqueta se cierra | `<stock>30</stock>` |
| F7 | 22 | StartTag: invalid element name | Los nombres no empiezan por un dígito | `<producto>` … `</producto>` |
| F8 | 24 | Attribute moneda redefined | Un atributo no se repite en el mismo elemento | Dejo solo `moneda="EUR"` |
| F9 | 28 | Extra content at the end of the document | Un único elemento raíz | Paso la Cámara 700x35 al primer `<catalogo>` y borro el segundo |

## C1 · Atributos y elementos

He puesto como atributos los datos que describen al producto y son valores simples y cortos: ref, categoria y proveedor, y también moneda (dice en qué está el precio) y unidad del peso. Como elementos he puesto los datos propios del producto: nombre, precio, stock y descripción, y caracteristicas, que tiene estructura dentro (talla y peso). Si un dato puede tener partes o repetirse, va como elemento, porque un atributo no puede.

## E3 · Tabla R1–R7 (pruebas de rechazo)

| N.º | Cambio en BR-0202 | DTD | XSD |
|---|---|---|---|
| R1 | Precio «gratis» | No lo detecta | Lo detecta (no es tipoImporte) |
| R2 | ref repetida (BR-0201) | Lo detecta (ID repetido) | Lo detecta (xs:unique) |
| R3 | Categoría «ropa» | Lo detecta (enumeración) | Lo detecta (enumeración) |
| R4 | Sin elemento stock | Lo detecta | Lo detecta |
| R5 | ref="X-2" | No lo detecta | Lo detecta (pattern) |
| R6 | Stock -3 | No lo detecta | Lo detecta (nonNegativeInteger) |
| R7 | precio antes que nombre | Lo detecta | Lo detecta |

Dos mensajes de error copiados:

- R5 (XSD): `Element 'producto', attribute 'ref': [facet 'pattern'] The value 'X-2' is not accepted by the pattern 'BR-[0-9]{4}'.`
- R2 (DTD): `validity error : ID BR-0201 already defined`

## C2 · XSD frente a DTD y URI de los espacios de nombres

El XSD detecta los siete cambios y la DTD solo cuatro. La DTD trata todo como texto, así que no sabe que «gratis» no es un precio ni que -3 no vale como stock, y tampoco puede exigir un formato como «BR-» y cuatro dígitos. El XSD tiene tipos de datos (decimal, entero, fecha) y restricciones como patrones o valores mínimos.

La URI de un espacio de nombres solo sirve como identificador único para que no se confundan dos vocabularios. El programa la compara como texto y no la abre, por eso no hace falta que exista como página web.

## E4 · Comparativa XML frente a JSON

| Aspecto | XML | JSON |
|---|---|---|
| Tamaño en bytes (formateado / minificado) | 2110 / 1795 | 1929 / 1346 |
| Tipos de datos | Todo es texto, los tipos los pone el XSD | Número, texto, booleano, null, lista y objeto |
| Validación de la estructura | DTD o XSD | JSON Schema, aparte |
| Atributos, comentarios y espacios de nombres | Tiene los tres | No tiene ninguno |
| Lectura desde JavaScript | Con DOMParser y recorriendo nodos | Directa con JSON.parse |
| Uso típico (dos ejemplos reales) | Facturas electrónicas (Facturae), ficheros de Office (.docx) | APIs REST, ficheros de configuración como package.json |

## C3 · El precio 389.00 en JSON

Sí puede ser un problema, porque en una tienda el precio siempre se enseña con dos decimales y además los decimales en coma flotante pueden dar errores al sumar. Lo resolvería guardando el precio en céntimos como número entero (38900) o formateándolo con dos decimales al mostrarlo (`toFixed(2)`).

Recomendaría XML para el catálogo que se envía al marketplace, porque exige un XML validado contra un esquema. Usaría JSON con el proveedor que ya trabaja con JSON.
