const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Funcionamiento del contrato Consulta", function () {
  let Consulta = null;
  let instance = null;
  let owner = null;
  let random1 = null;
  let random2 = null;
  let random3 = null;

  beforeEach(async function () {
    const [o, r1, r2, r3] = await ethers.getSigners(); // get the owner and a couple of random accounts for testing
    owner = o;
    random1 = r1;
    random2 = r2;
    random3 = r3;
    Consulta = await ethers.getContractFactory("Consulta");
    instance = await Consulta.deploy();
    await instance.deployed();
  });

  it("Debe obtener las opciones de la consulta", async function () {
    const txn = await instance.getOpciones();
    expect(
      txn.map((o) => {
        return { descripcion: o.descripcion, id: o.id.toNumber() };
      })
    ).to.deep.equal([
      { descripcion: "si, que continue", id: 1 },
      { descripcion: "no, que renuncie", id: 2 },
      { descripcion: "anular voto", id: 3 },
    ]);
  });

  it("Debe emitir el evento NuevoVoto cuando se registra un voto nuevo satisfactoriamente", async function () {
    expect(await instance.connect(random1).votar("VEHJ911121", 1))
      .to.emit(instance, "NuevoVoto")
      .withArgs("VEHJ911121", random1.address, Number);
    expect(await instance.connect(random2).votar("VEHJ911122", 2))
      .to.emit(instance, "NuevoVoto")
      .withArgs("VEHJ911122", random2.address, Number);
    expect(await instance.connect(random1).votar("VEHJ911123", 3))
      .to.emit(instance, "NuevoVoto")
      .withArgs("VEHJ911123", random1.address, Number);
  });

  it("Debe fallar cuando una clave intenta votar dos veces", async function () {
    await instance.connect(random1).votar("VEHJ911121", 1);
    expect(instance.connect(random1).votar("VEHJ911121", 1)).to.be.revertedWith(
      "La clave de elector ya ha votado"
    );
  });

  it("Debe fallar cuando se intenta votar por una opción que no existe", async function () {
    expect(instance.connect(random1).votar("VEHJ911121", 4)).to.be.revertedWith(
      "La opcion elegida no corresponde a ninguna disponible"
    );
  });

  it("Debe registrar correctamente los votos", async function () {
    expect(await instance.connect(random1).votar("VEHJ911121", 1));
    expect(await instance.connect(random2).votar("VEHJ911122", 1));
    expect(await instance.connect(random3).votar("VEHJ911123", 3));

    const txn = await instance.getOpciones();
    expect(
      txn.map((o) => {
        return {
          descripcion: o.descripcion,
          id: o.id.toNumber(),
          votos: o.votos.toNumber(),
        };
      })
    ).to.deep.equal([
      { descripcion: "si, que continue", id: 1, votos: 2 },
      { descripcion: "no, que renuncie", id: 2, votos: 0 },
      { descripcion: "anular voto", id: 3, votos: 1 },
    ]);
  });
});
