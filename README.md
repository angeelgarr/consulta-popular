# DApp Consulta Popular

Ejemplo de aplicación descentralizada para votar en la consulta popular por la revocación de mandato presidencial.

La definición, según el artículo 5 de la Ley Federal de Revocación de Mandato dice:

> El proceso de revocación de mandato es el instrumento de participación solicitado por la ciudadanía para determinar la conclusión anticipada en el desempeño del cargo de la persona titular de la Presidencia de la República, a partir de la pérdida de la confianza

La idea de este proyecto es proporcionar un ejercicio académico donde se muestre cómo el blockchain puede ayudarnos con eventos de relevancia, como la consulta popular.

## Contrato

El contrato `Consulta.sol` se inicializa con 3 opciones con 0 votos, que son respuesta a la pregunta

> ¿Desea que el presidente continúe en el cargo o que renuncie?

1. Sí, que continúe.
2. No, que renuncie
3. Anular voto

Quise poner el voto nulo como una opción adicional para que sea siempre una intención de voto y no un error.

El contrato cuenta con dos métodos púbicos, `getOpciones` y `votar`.

### getOpciones()

Retorna un arreglo de estructuras, cada estructura contiene la descripción de la opción, su identificador y el número de votos que se han registrado

### votar(clave, opcion)

El método votar recibe dos argumentos, la clave de elector de la persona que está votando y la opción elegida por esa persona. Antes de registrar el voto se valida, mediante métodos internos, que la clave de elector no haya votado previamente y que la opción seleccionada es válida. En caso de que alguna de estas dos validaciones falle, se rechaza la transacción y no se registra el voto.

Obviamente no cuento con una base de datos de las claves de elector, por lo que no tengo forma de validar que sea una clave válida. Debido a las limitaciones actuales de Solidity, tampoco puedo validar la estructura de la clave de elector mediante expresiones regulares. El contrato dependerá del frontend para eso. Es claro que cualquiera con la dirección del contrato puede disparar el método `votar()` directamente con cualquier clave, sin validación alguna. Pero esto es un ejercicio académico, así que no importa mucho este tema.

## Frontend

En proceso.

## Setup

Clonar el repositorio y corrern `npm install` o `yarn` en la carpeta donde fue clonado.

## Comandos de Hardhat

Desplegar contrato localmente:
Iniciar un nodo local

```shell
npx hardhat node
```

```shell
npx hardhat run --network localhost scripts/deploy.js
```

Desplegar contrato en la red Rinkeby

```shell
npx hardhat run --network rinkeby scripts/deploy.js
```

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
```

## Contribuciones

Siéntanse libres de someter issues o PRs.
