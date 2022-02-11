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

App en Vue (vuex, router, vuetify) con ethers.js para interactuar con el contrato.

## Setup

Clonar el repositorio y corrern `npm install` o `yarn` en la carpeta donde fue clonado. Para el frontend, correr los mismos comandos dentro de la carpeta `./frontend`

## Comandos de Hardhat

Desplegar contrato localmente:

1. Iniciar un nodo local. En una terminal, correr:

   ```shell
   npx hardhat node
   ```

   Esto nos entrega 10 cuentas con 10000 ETH para pruebas. Para agregar las cuentas a MetaMask, hay que abrir el Metamask, en el menu de selección de redes, seleccionar _Add Network_. En el nombre de la red, se puede colocar cualquier cosa, por ejemplo, `hardhat local`. En RPC URL, copiar la dirección del nodo de hardhat (normalmente es `http://127.0.0.1:8545/`). En Chain ID, colocar `31337`, si el id llega a ser incorrecto, aparece un mensaje con el id de la red, colocar el que aparece. Dar clic en aceptar.

   Ahora, dar click en el perfil (menu My Accounts) y seleccionar Import Account. En Select Type, poner Private key, y finalmente, pegar una de las claves privadas de las cuentas de hardhat. Click en Import.

2. Desplegar el contrato localmente. En otra terminal, correr:

   ```shell
   npx hardhat run --network localhost scripts/deploy.js
   ```

   Copiar la dirección local del contrato y ponerla en el archivo `./frontend/env.development`

### Desplegar contrato en la red Rinkeby

```shell
npx hardhat run --network rinkeby scripts/deploy.js
```

## Contribuciones

Siéntanse libres de someter issues o PRs.
