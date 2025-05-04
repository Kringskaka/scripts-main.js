import { world, system, Player } from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const block = getBlockInView(player);
    if (block) {
      // Dá ao jogador o bloco que ele está olhando
      player.runCommandAsync(`give @s ${block.typeId}`);
    }
  }
}, 40); // Executa a cada 2 segundos (20 ticks = 1 segundo)

function getBlockInView(player) {
  const viewDirection = player.getViewDirection();
  const start = player.getHeadLocation();
  
  for (let i = 1; i < 5; i++) { // Checa até 5 blocos à frente
    const pos = {
      x: start.x + viewDirection.x * i,
      y: start.y + viewDirection.y * i,
      z: start.z + viewDirection.z * i
    };

    const block = player.dimension.getBlock(pos);
    if (block && block.typeId !== "minecraft:air") {
      return block;
    }
  }

  return null;
}
