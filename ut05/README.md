# UT05 · Inventario de red del aula en XML y JSON

Inventario de seis equipos de red del aula (switch, router, punto de acceso, dos servidores e impresora) con su IP, MAC, ubicación y fecha de compra.

| Fichero | Qué es |
|---|---|
| `inventario.xml` | Los datos en XML. El id y el tipo van como atributos y el resto como elementos. |
| `inventario.xsd` | El esquema que lo valida. Tiene un patrón para la IP y otro para la MAC, la fecha es `xs:date`, se exigen al menos cinco equipos y no se pueden repetir el id, la IP ni la MAC. |
| `inventario.json` | Los mismos datos en JSON. |

## Validación

```
xmllint --noout --schema inventario.xsd inventario.xml
```

## Comparativa breve

| Aspecto | XML | JSON |
|---|---|---|
| Tamaño (formateado) | 1834 bytes | 1574 bytes |
| Validación | Con XSD: patrones para IP y MAC, fechas y valores únicos | Necesita JSON Schema aparte |
| Lectura | Más largo, cada dato se abre y se cierra | Más corto y fácil de leer |
| Uso | Intercambio con sistemas que exigen un esquema | APIs y herramientas web |

## Qué formato usaría para la monitorización

Usaría **JSON**. Las herramientas de monitorización como Zabbix o Grafana trabajan con APIs que reciben y devuelven JSON, ocupa menos y se lee directamente desde JavaScript o Python. El XML con XSD lo dejaría para guardar el inventario oficial, porque así se comprueba que todas las IP y MAC tienen un formato correcto.
