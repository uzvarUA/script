import {world, system} from "@minecraft/server";
import {ActionFormData, ActionFormResponse} from "@minecraft/server-ui";

const playerIntervals = new Map();
let intervalId;

function startTracking(player) {
    if (playerIntervals.has(player.name)) {
        return;
    }

    const intervalId = system.runInterval(() => {
        const currentPosition = player.location;

        if (player.previousPosition) {
            const previousPosition = player.previousPosition;

            if (
                currentPosition.x !== previousPosition.x ||
                currentPosition.y !== previousPosition.y ||
                currentPosition.z !== previousPosition.z
            ) {
                stopTracking(player);
            }
        }

        player.previousPosition = currentPosition;
    }, 1);

    playerIntervals.set(player.name, intervalId);
}

function stopTracking(player) {
    const intervalId = playerIntervals.get(player.name);

    if (intervalId !== undefined) {
        system.clearRun(intervalId);
        playerIntervals.delete(player.name);
        delete player.previousPosition;

        const welcomeMessage = `§fХочеш пограти на сервері з §bPVP§f?\n§fЗаходь на сервер §d§lZeqa\n§fIP: §bZeqa.net\n§fPORT: §b19132`;
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${welcomeMessage}"}]}`);

        let formMessage = "§fЗаходь на сервер з PVP §d§lZeqa§r\n";
        formMessage += "§fНайкращий сервер з PVP\n\n";
        formMessage += "§fIP: §bZeqa.net\n§fPORT: §b19132";

        const form = new ActionFormData()
            .title("§d§lZeqa")
            .body(formMessage)
            .button("Зачинити форму");
        form.show(player);
    }
}

world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    startTracking(player);
});