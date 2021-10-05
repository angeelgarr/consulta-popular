pragma solidity ^0.8.0;
// We have to specify what version of compiler this code will compile with

import "hardhat/console.sol";

contract Consulta {
    // almacenar dirección desde la que votaron y la clave de elector
    struct Votante {
        string clave;
        address addr;
        uint256 timestamp;
    }
    // Arreglo de votantes registrados, privada
    Votante[] private votantes;
    // Las opciones para votar se guardarán en una estructura con su descripción e identificador
    struct Opcion {
        string descripcion;
        uint256 id;
        uint256 votos;
    }
    // Las opciones de la consulta serán gaurdadas en un arreglo de Opcion
    Opcion[] private opciones;

    // Evento para cuando se emite un nuevo voto
    event NuevoVoto(string _clave, address _sender, uint256 _timestamp);

    constructor() {
        // inicializar las opciones de votos
        opciones.push(Opcion("si, que continue", 1, 0));
        opciones.push(Opcion("no, que renuncie", 2, 0));
        opciones.push(Opcion("anular voto", 3, 0));
    }

    /*
     * Obtiene las opciones de voto y el numero de votos
     */
    function getOpciones() public view returns (Opcion[] memory) {
        return opciones;
    }

    /*
     * Valida que solo exista un voto por cada clave de elector
     */
    function _validarVotoUnico(string memory _clave)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < votantes.length; i++) {
            if (
                keccak256(abi.encodePacked(votantes[i].clave)) ==
                keccak256(abi.encodePacked(_clave))
            ) {
                return false;
            }
        }
        return true;
    }

    function _validarOpcion(uint256 _opcion) private view returns (bool) {
        for (uint256 i = 0; i < opciones.length; i++) {
            if (opciones[i].id == _opcion) {
                return true;
            }
        }
        return false;
    }

    function votar(string memory _clave, uint256 _opcion) public {
        // Validar origen y sentido del voto
        require(_validarVotoUnico(_clave), "La clave de elector ya ha votado");
        require(
            _validarOpcion(_opcion),
            "La opcion elegida no corresponde a ninguna disponible"
        );

        // Si la opción de voto es válida y la clave no ha votado, registrar el voto
        for (uint256 i = 0; i < opciones.length; i++) {
            if (opciones[i].id == _opcion) {
                opciones[i].votos++;
                votantes.push(Votante(_clave, msg.sender, block.timestamp));
                emit NuevoVoto(_clave, msg.sender, block.timestamp);
            }
        }
    }
}
