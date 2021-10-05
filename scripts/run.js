async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.

  // We get the contract to deploy
  const Consulta = await hre.ethers.getContractFactory("Consulta");
  const instance = await Consulta.deploy();

  await instance.deployed();

  console.log("Consulta deployed to:", instance.address);

  let txn = null;
  // Obtener opciones de voto
  txn = await instance.getOpciones();
  await txn;
  console.log("Result", txn);

  // votar
  txn = await instance.votar("VEHJ911121", 1);
  txn = await instance.votar("VEHJ911120", 2);
  txn = await instance.votar("VEHJ911119", 1);
  console.log(txn);

  // Clave existente
  try {
    txn = await instance.votar("VEHJ911121", 1);
    await txn;
  } catch (e) {
    console.error(e);
  }
  // Opcion incorrecta
  try {
    txn = await instance.votar("VEHJ911118", 4);
    await txn;
  } catch (e) {
    console.error(e);
  }

  // Contar votos
  txn = await instance.getOpciones();
  await txn;
  console.table(
    txn.map((o) => {
      return { descripcion: o.descripcion, votos: o.votos.toNumber() };
    })
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
